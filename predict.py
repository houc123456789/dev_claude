"""Script to make forex predictions."""

import argparse
import sys

from src.utils import setup_logging, load_config
from src.predictor import ForexPredictor


def main():
    """Main prediction function."""
    parser = argparse.ArgumentParser(description='Make forex predictions')
    parser.add_argument('--config', type=str, default='config.yaml',
                       help='Path to configuration file')
    parser.add_argument('--symbol', type=str, default='EUR/USD',
                       help='Currency pair to predict')
    parser.add_argument('--model', type=str, default='ensemble',
                       choices=['random_forest', 'xgboost', 'lstm', 'ensemble'],
                       help='Model to use for prediction')
    parser.add_argument('--model-dir', type=str, default='saved_models',
                       help='Directory containing trained models')
    parser.add_argument('--all-models', action='store_true',
                       help='Use all available models')
    parser.add_argument('--monitor', action='store_true',
                       help='Continuously monitor and predict')
    parser.add_argument('--interval', type=int, default=300,
                       help='Monitoring interval in seconds')

    args = parser.parse_args()

    # Setup logging
    logger = setup_logging()
    logger.info("Starting forex prediction")

    # Load configuration
    config = load_config(args.config)

    # Initialize predictor
    predictor = ForexPredictor(config, args.model_dir)

    if args.monitor:
        # Continuous monitoring
        symbols = [args.symbol] if args.symbol else config['data']['symbols']
        logger.info(f"Starting continuous monitoring for {symbols}")
        predictor.monitor_continuous(symbols, args.interval, args.model)
    elif args.all_models:
        # Predict with all models
        results = predictor.predict_all_models(args.symbol)

        print("\n" + "="*60)
        print(f"PREDICTIONS FOR {args.symbol}")
        print("="*60)

        for model_name, result in results.items():
            print(f"\n{model_name.upper()}:")
            print(f"  Current Price:     {result['current_price']:.5f}")
            print(f"  Predicted Price:   {result['predicted_price']:.5f}")
            print(f"  Predicted Return:  {result['predicted_return']:.4%}")
            print(f"  Direction:         {result['direction']}")
            if result['confidence']:
                print(f"  Confidence:        {result['confidence']:.2%}")
    else:
        # Single prediction
        result = predictor.get_trading_signal(args.symbol, args.model)

        print("\n" + "="*60)
        print(f"TRADING SIGNAL FOR {args.symbol}")
        print("="*60)
        print(f"\nCurrent Price:     {result['current_price']:.5f}")
        print(f"Predicted Price:   {result['predicted_price']:.5f}")
        print(f"Predicted Return:  {result['predicted_return']:.4%}")
        print(f"Direction:         {result['direction']}")
        print(f"\nSIGNAL:            {result['signal']}")
        if result.get('confidence'):
            print(f"Confidence:        {result['confidence']:.2%}")
        print(f"Position Size:     {result['position_size']:.4f}")
        print(f"Stop Loss:         {result['stop_loss']:.2%}")
        print(f"Take Profit:       {result['take_profit']:.2%}")
        print("="*60)


if __name__ == '__main__':
    main()
