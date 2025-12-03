"""Script to backtest forex predictions."""

import argparse
import sys
import pandas as pd

from src.utils import setup_logging, load_config
from src.predictor import ForexPredictor
from src.backtester import ForexBacktester
from src.data_fetcher import ForexDataFetcher
from src.feature_engineering import FeatureEngineer


def main():
    """Main backtesting function."""
    parser = argparse.ArgumentParser(description='Backtest forex predictions')
    parser.add_argument('--config', type=str, default='config.yaml',
                       help='Path to configuration file')
    parser.add_argument('--symbol', type=str, default='EUR/USD',
                       help='Currency pair to backtest')
    parser.add_argument('--model', type=str, default='ensemble',
                       choices=['random_forest', 'xgboost', 'lstm', 'ensemble'],
                       help='Model to use for backtesting')
    parser.add_argument('--model-dir', type=str, default='saved_models',
                       help='Directory containing trained models')
    parser.add_argument('--days', type=int, default=30,
                       help='Number of days to backtest')
    parser.add_argument('--output-dir', type=str, default='backtest_results',
                       help='Directory to save backtest results')
    parser.add_argument('--confidence-threshold', type=float, default=0.6,
                       help='Minimum confidence for trades')

    args = parser.parse_args()

    # Setup logging
    logger = setup_logging()
    logger.info("Starting backtest")

    # Load configuration
    config = load_config(args.config)

    # Initialize components
    predictor = ForexPredictor(config, args.model_dir)
    backtester = ForexBacktester(config)
    data_fetcher = ForexDataFetcher(
        api_keys=config.get('api_keys', {}),
        data_source=config['data'].get('data_source', 'yfinance')
    )
    feature_engineer = FeatureEngineer(config['features'])

    # Fetch historical data
    logger.info(f"Fetching historical data for {args.symbol}")
    data = data_fetcher.fetch_data(
        symbol=args.symbol,
        interval=config['data']['interval'],
        lookback_days=args.days + 100  # Extra for feature calculation
    )

    # Create features
    df_features = feature_engineer.create_features(data)
    df_features = df_features.dropna()

    # Use only the last 'days' worth of data
    samples_per_day = 24 if config['data']['interval'] == '1h' else 24 * 4
    test_samples = min(args.days * samples_per_day, len(df_features))
    df_test = df_features.iloc[-test_samples:]

    # Prepare features for prediction
    X = df_test.drop(columns=['target'], errors='ignore')

    # Ensure we have the right columns
    if predictor.preprocessor.feature_columns:
        missing_cols = set(predictor.preprocessor.feature_columns) - set(X.columns)
        if missing_cols:
            logger.warning(f"Missing columns: {missing_cols}")
            for col in missing_cols:
                X[col] = 0
        X = X[predictor.preprocessor.feature_columns]

    # Scale features
    X_scaled = predictor.preprocessor.scaler.transform(X)
    X_scaled = pd.DataFrame(X_scaled, columns=X.columns, index=X.index)

    # Make predictions
    logger.info("Making predictions for backtest")
    if args.model == 'lstm':
        sequence_length = config['models']['lstm']['sequence_length']
        predictions = []
        for i in range(sequence_length, len(X_scaled)):
            X_seq = X_scaled.iloc[i-sequence_length:i].values.reshape(1, sequence_length, -1)
            pred = predictor.models[args.model].predict(X_seq)[0]
            predictions.append(pred)

        # Align indices
        prediction_indices = X_scaled.index[sequence_length:]
        predictions_df = pd.DataFrame({
            'predicted_return': predictions,
            'confidence': 0.7  # Default confidence for LSTM
        }, index=prediction_indices)
    else:
        predictions = predictor.models[args.model].predict(X_scaled)
        predictions_df = pd.DataFrame({
            'predicted_return': predictions,
            'confidence': 0.7  # Default confidence
        }, index=X_scaled.index)

    # Get actual prices
    actual_prices = data.loc[predictions_df.index]

    # Run backtest
    logger.info("Running backtest")
    results = backtester.run_backtest(
        predictions_df,
        actual_prices,
        args.confidence_threshold
    )

    # Print summary
    print(backtester.get_summary())

    # Export results
    backtester.export_results(args.output_dir)
    backtester.plot_results(args.output_dir)

    logger.info(f"Backtest completed! Results saved to {args.output_dir}")


if __name__ == '__main__':
    main()
