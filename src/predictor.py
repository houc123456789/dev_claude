"""Real-time forex prediction bot."""

import logging
import numpy as np
import pandas as pd
from typing import Dict, List, Tuple
from datetime import datetime
import time

from src.data_fetcher import ForexDataFetcher
from src.feature_engineering import FeatureEngineer
from src.preprocessor import DataPreprocessor
from src.trainer import ModelTrainer


logger = logging.getLogger(__name__)


class ForexPredictor:
    """Real-time forex prediction bot."""

    def __init__(self, config: dict, model_dir: str = 'saved_models'):
        """Initialize the predictor.

        Args:
            config: Configuration dictionary
            model_dir: Directory containing trained models
        """
        self.config = config
        self.model_dir = model_dir

        # Initialize components
        self.data_fetcher = ForexDataFetcher(
            api_keys=config.get('api_keys', {}),
            data_source=config['data'].get('data_source', 'yfinance')
        )
        self.feature_engineer = FeatureEngineer(config['features'])
        self.preprocessor = DataPreprocessor(config['training'])

        # Load models
        self.trainer = ModelTrainer(config)
        self.trainer.load_models(model_dir)
        self.models = self.trainer.models

        logger.info("Initialized ForexPredictor")

    def predict_single(self, symbol: str, model_name: str = 'ensemble') -> Dict:
        """Make a single prediction for a currency pair.

        Args:
            symbol: Currency pair to predict
            model_name: Model to use for prediction

        Returns:
            Dictionary with prediction results
        """
        logger.info(f"Making prediction for {symbol} using {model_name}")

        # Fetch latest data
        data = self.data_fetcher.fetch_data(
            symbol=symbol,
            interval=self.config['data']['interval'],
            lookback_days=30  # Only need recent data for prediction
        )

        # Create features
        df_features = self.feature_engineer.create_features(data)
        df_features = df_features.dropna()

        # Prepare features (no target needed for prediction)
        X = df_features.drop(columns=['target'], errors='ignore')

        # Ensure we have the right columns
        if self.preprocessor.feature_columns:
            missing_cols = set(self.preprocessor.feature_columns) - set(X.columns)
            if missing_cols:
                logger.warning(f"Missing columns: {missing_cols}")
                for col in missing_cols:
                    X[col] = 0

            X = X[self.preprocessor.feature_columns]

        # Scale features
        X_scaled = self.preprocessor.scaler.transform(X)
        X_scaled = pd.DataFrame(X_scaled, columns=X.columns, index=X.index)

        # Make prediction
        if model_name not in self.models:
            raise ValueError(f"Model '{model_name}' not found")

        # Get latest data point
        X_latest = X_scaled.iloc[[-1]]

        # Predict
        if model_name == 'lstm':
            sequence_length = self.config['models']['lstm']['sequence_length']
            if len(X_scaled) < sequence_length:
                raise ValueError(f"Not enough data for LSTM prediction (need {sequence_length} points)")

            X_seq = X_scaled.iloc[-sequence_length:].values.reshape(1, sequence_length, -1)
            prediction = self.models[model_name].predict(X_seq)[0]
        else:
            prediction = self.models[model_name].predict(X_latest)[0]

        # Get current price
        current_price = data['close'].iloc[-1]

        # Calculate predicted price change
        predicted_return = prediction
        predicted_price = current_price * (1 + predicted_return)

        # Get prediction confidence (for ensemble)
        confidence = None
        if model_name == 'ensemble' and hasattr(self.models[model_name], 'predict_with_confidence'):
            _, std = self.models[model_name].predict_with_confidence(X_latest)
            confidence = 1 / (1 + std[0])  # Convert std to confidence score

        result = {
            'symbol': symbol,
            'timestamp': datetime.now().isoformat(),
            'current_price': float(current_price),
            'predicted_return': float(predicted_return),
            'predicted_price': float(predicted_price),
            'direction': 'UP' if predicted_return > 0 else 'DOWN',
            'model': model_name,
            'confidence': float(confidence) if confidence is not None else None
        }

        logger.info(f"Prediction: {symbol} - {result['direction']} - Return: {predicted_return:.4%}")

        return result

    def predict_multiple(self, symbols: List[str], model_name: str = 'ensemble') -> List[Dict]:
        """Make predictions for multiple currency pairs.

        Args:
            symbols: List of currency pairs
            model_name: Model to use for predictions

        Returns:
            List of prediction results
        """
        logger.info(f"Making predictions for {len(symbols)} symbols")

        predictions = []

        for symbol in symbols:
            try:
                result = self.predict_single(symbol, model_name)
                predictions.append(result)
            except Exception as e:
                logger.error(f"Error predicting {symbol}: {e}")

        return predictions

    def predict_all_models(self, symbol: str) -> Dict[str, Dict]:
        """Make predictions using all available models.

        Args:
            symbol: Currency pair to predict

        Returns:
            Dictionary mapping model names to predictions
        """
        logger.info(f"Making predictions with all models for {symbol}")

        results = {}

        for model_name in self.models.keys():
            try:
                result = self.predict_single(symbol, model_name)
                results[model_name] = result
            except Exception as e:
                logger.error(f"Error with {model_name}: {e}")

        return results

    def get_trading_signal(self, symbol: str, model_name: str = 'ensemble',
                           confidence_threshold: float = None) -> Dict:
        """Get trading signal with risk assessment.

        Args:
            symbol: Currency pair
            model_name: Model to use
            confidence_threshold: Minimum confidence for signal

        Returns:
            Trading signal with risk assessment
        """
        if confidence_threshold is None:
            confidence_threshold = self.config['prediction'].get('confidence_threshold', 0.6)

        prediction = self.predict_single(symbol, model_name)

        # Determine signal
        signal = 'HOLD'
        confidence = prediction.get('confidence', 0.5)

        if confidence >= confidence_threshold:
            if prediction['predicted_return'] > 0:
                signal = 'BUY'
            elif prediction['predicted_return'] < 0:
                signal = 'SELL'

        # Calculate position size based on confidence
        risk_per_trade = self.config['backtesting'].get('risk_per_trade', 0.02)
        position_size = confidence * risk_per_trade

        result = {
            **prediction,
            'signal': signal,
            'position_size': float(position_size),
            'stop_loss': self.config['backtesting'].get('stop_loss', 0.01),
            'take_profit': self.config['backtesting'].get('take_profit', 0.03)
        }

        logger.info(f"Trading signal for {symbol}: {signal} (confidence: {confidence:.2%})")

        return result

    def monitor_continuous(self, symbols: List[str], interval: int = 300,
                          model_name: str = 'ensemble'):
        """Continuously monitor and predict forex pairs.

        Args:
            symbols: List of currency pairs to monitor
            interval: Time between predictions in seconds
            model_name: Model to use for predictions
        """
        logger.info(f"Starting continuous monitoring for {symbols} (interval: {interval}s)")

        try:
            while True:
                logger.info(f"\n{'='*60}")
                logger.info(f"Monitoring at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
                logger.info(f"{'='*60}")

                for symbol in symbols:
                    try:
                        signal = self.get_trading_signal(symbol, model_name)

                        logger.info(f"\n{symbol}:")
                        logger.info(f"  Current Price: {signal['current_price']:.5f}")
                        logger.info(f"  Predicted Price: {signal['predicted_price']:.5f}")
                        logger.info(f"  Direction: {signal['direction']}")
                        logger.info(f"  Signal: {signal['signal']}")
                        logger.info(f"  Confidence: {signal.get('confidence', 'N/A')}")

                    except Exception as e:
                        logger.error(f"Error monitoring {symbol}: {e}")

                logger.info(f"\nNext update in {interval} seconds...")
                time.sleep(interval)

        except KeyboardInterrupt:
            logger.info("\nMonitoring stopped by user")

    def backtest_predictions(self, symbol: str, model_name: str = 'ensemble',
                            days: int = 30) -> Dict:
        """Backtest predictions on historical data.

        Args:
            symbol: Currency pair
            model_name: Model to use
            days: Number of days to backtest

        Returns:
            Backtesting results
        """
        logger.info(f"Backtesting {model_name} on {symbol} for {days} days")

        # Fetch historical data
        data = self.data_fetcher.fetch_data(
            symbol=symbol,
            interval=self.config['data']['interval'],
            lookback_days=days + 100  # Extra for feature calculation
        )

        # Create features
        df_features = self.feature_engineer.create_features(data)
        df_features = self.feature_engineer.create_target(
            df_features,
            horizon=self.config['prediction']['horizon']
        )
        df_features = df_features.dropna()

        # Use only the last 'days' worth of data
        samples_per_day = 24 if self.config['data']['interval'] == '1h' else 24 * 4
        test_samples = min(days * samples_per_day, len(df_features))
        df_test = df_features.iloc[-test_samples:]

        # Prepare features
        X = df_test.drop(columns=['target'])
        y = df_test['target']

        # Scale
        X_scaled = self.preprocessor.scaler.transform(X)
        X_scaled = pd.DataFrame(X_scaled, columns=X.columns, index=X.index)

        # Make predictions
        if model_name == 'lstm':
            sequence_length = self.config['models']['lstm']['sequence_length']
            X_seq, y_seq = self.preprocessor.create_sequences(
                X_scaled.values, y.values, sequence_length
            )
            predictions = self.models[model_name].predict(X_seq)
            y_actual = y_seq
        else:
            predictions = self.models[model_name].predict(X_scaled)
            y_actual = y.values

        # Calculate metrics
        from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

        mse = mean_squared_error(y_actual, predictions)
        mae = mean_absolute_error(y_actual, predictions)
        r2 = r2_score(y_actual, predictions)

        direction_true = np.sign(y_actual)
        direction_pred = np.sign(predictions)
        directional_accuracy = np.mean(direction_true == direction_pred)

        results = {
            'symbol': symbol,
            'model': model_name,
            'period_days': days,
            'mse': float(mse),
            'mae': float(mae),
            'r2': float(r2),
            'directional_accuracy': float(directional_accuracy),
            'predictions': len(predictions)
        }

        logger.info(f"Backtest results - MAE: {mae:.6f}, R2: {r2:.4f}, Dir Acc: {directional_accuracy:.4f}")

        return results
