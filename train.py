"""Script to train forex prediction models."""

import argparse
import sys

from src.utils import setup_logging, load_config
from src.trainer import ModelTrainer


def main():
    """Main training function."""
    parser = argparse.ArgumentParser(description='Train forex prediction models')
    parser.add_argument('--config', type=str, default='config.yaml',
                       help='Path to configuration file')
    parser.add_argument('--symbol', type=str, default='EUR/USD',
                       help='Currency pair to train on')
    parser.add_argument('--output-dir', type=str, default='saved_models',
                       help='Directory to save trained models')
    parser.add_argument('--models', type=str, nargs='+',
                       choices=['rf', 'xgb', 'lstm', 'all'],
                       default=['all'],
                       help='Models to train')

    args = parser.parse_args()

    # Setup logging
    logger = setup_logging()
    logger.info("Starting forex model training")

    # Load configuration
    config = load_config(args.config)

    # Initialize trainer
    trainer = ModelTrainer(config)

    # Prepare data
    logger.info(f"Preparing training data for {args.symbol}")
    data_splits = trainer.prepare_training_data(args.symbol)

    # Train models
    if 'all' in args.models:
        logger.info("Training all models")
        trainer.train_all_models(args.symbol)
    else:
        if 'rf' in args.models:
            trainer.train_random_forest(data_splits)
        if 'xgb' in args.models:
            trainer.train_xgboost(data_splits)
        if 'lstm' in args.models:
            trainer.train_lstm(data_splits)

    # Evaluate models
    logger.info("Evaluating models on test set")
    eval_results = trainer.evaluate_all_models(data_splits)

    # Print results
    print("\n" + "="*60)
    print("MODEL EVALUATION RESULTS")
    print("="*60)

    for model_name, metrics in eval_results.items():
        print(f"\n{model_name.upper()}:")
        print(f"  MAE:                  {metrics['mae']:.6f}")
        print(f"  RMSE:                 {metrics.get('rmse', 0):.6f}")
        print(f"  R²:                   {metrics['r2']:.4f}")
        print(f"  Directional Accuracy: {metrics['directional_accuracy']:.2%}")

    # Save models
    logger.info(f"Saving models to {args.output_dir}")
    trainer.save_models(args.output_dir)

    print("\n" + "="*60)
    print(f"Training completed! Models saved to {args.output_dir}")
    print("="*60)


if __name__ == '__main__':
    main()
