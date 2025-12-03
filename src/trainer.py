"""Training module for forex prediction models."""

import logging
import numpy as np
import pandas as pd
from typing import Dict, List
import os
import json
from datetime import datetime

from src.data_fetcher import ForexDataFetcher
from src.feature_engineering import FeatureEngineer
from src.preprocessor import DataPreprocessor
from src.models.random_forest_model import RandomForestModel
from src.models.xgboost_model import XGBoostModel
from src.models.ensemble_model import EnsembleModel

# Lazy import for LSTM to avoid TensorFlow dependency if not needed
LSTMModel = None


logger = logging.getLogger(__name__)


class ModelTrainer:
    """Trains and evaluates forex prediction models."""

    def __init__(self, config: dict):
        """Initialize the trainer.

        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.data_fetcher = ForexDataFetcher(
            api_keys=config.get('api_keys', {}),
            data_source=config['data'].get('data_source', 'yfinance')
        )
        self.feature_engineer = FeatureEngineer(config['features'])
        self.preprocessor = DataPreprocessor(config['training'])

        self.models = {}
        self.results = {}

        logger.info("Initialized ModelTrainer")

    def prepare_training_data(self, symbol: str) -> Dict:
        """Prepare data for training.

        Args:
            symbol: Currency pair to train on

        Returns:
            Dictionary containing prepared datasets
        """
        logger.info(f"Preparing training data for {symbol}")

        # Fetch data
        data = self.data_fetcher.fetch_data(
            symbol=symbol,
            interval=self.config['data']['interval'],
            lookback_days=self.config['data']['lookback_days']
        )

        logger.info(f"Fetched {len(data)} data points")

        # Create features
        df_features = self.feature_engineer.create_features(data)

        # Create target
        df_features = self.feature_engineer.create_target(
            df_features,
            horizon=self.config['prediction']['horizon'],
            target_type='returns'
        )

        # Remove NaN values
        df_features = df_features.dropna()

        logger.info(f"Created {len(df_features.columns)} features")

        # Prepare data (scaling)
        X, y = self.preprocessor.prepare_data(df_features, fit_scaler=True)

        # Split data
        splits = self.preprocessor.split_data(
            X, y,
            test_size=self.config['training']['test_size'],
            validation_size=self.config['training']['validation_size'],
            shuffle=False  # Keep time series order
        )

        logger.info("Data preparation completed")

        return splits

    def train_random_forest(self, data_splits: Dict) -> RandomForestModel:
        """Train Random Forest model.

        Args:
            data_splits: Dictionary with train/val/test splits

        Returns:
            Trained RandomForestModel
        """
        logger.info("Training Random Forest model")

        rf_config = self.config['models']['random_forest']
        rf_config['random_state'] = self.config['training']['random_state']

        rf_model = RandomForestModel(rf_config)
        rf_model.build_model()

        results = rf_model.train(
            data_splits['X_train'],
            data_splits['y_train'],
            data_splits['X_val'],
            data_splits['y_val']
        )

        self.models['random_forest'] = rf_model
        self.results['random_forest'] = results

        return rf_model

    def train_xgboost(self, data_splits: Dict) -> XGBoostModel:
        """Train XGBoost model.

        Args:
            data_splits: Dictionary with train/val/test splits

        Returns:
            Trained XGBoostModel
        """
        logger.info("Training XGBoost model")

        xgb_config = self.config['models']['xgboost']
        xgb_config['random_state'] = self.config['training']['random_state']

        xgb_model = XGBoostModel(xgb_config)
        xgb_model.build_model()

        results = xgb_model.train(
            data_splits['X_train'],
            data_splits['y_train'],
            data_splits['X_val'],
            data_splits['y_val']
        )

        self.models['xgboost'] = xgb_model
        self.results['xgboost'] = results

        return xgb_model

    def train_lstm(self, data_splits: Dict):
        """Train LSTM model.

        Args:
            data_splits: Dictionary with train/val/test splits

        Returns:
            Trained LSTMModel
        """
        global LSTMModel
        if LSTMModel is None:
            try:
                from src.models.lstm_model import LSTMModel as LSTM
                LSTMModel = LSTM
            except ImportError:
                logger.error("TensorFlow not installed. Cannot train LSTM model.")
                raise ImportError("TensorFlow is required for LSTM. Install with: pip install tensorflow")

        logger.info("Training LSTM model")

        # Create sequences for LSTM
        sequence_length = self.config['models']['lstm']['sequence_length']

        X_train_seq, y_train_seq = self.preprocessor.create_sequences(
            data_splits['X_train'].values,
            data_splits['y_train'].values,
            sequence_length
        )

        X_val_seq, y_val_seq = self.preprocessor.create_sequences(
            data_splits['X_val'].values,
            data_splits['y_val'].values,
            sequence_length
        )

        # Build and train LSTM
        lstm_model = LSTMModel(self.config['models']['lstm'])
        input_shape = (sequence_length, X_train_seq.shape[2])
        lstm_model.build_model(input_shape)

        history = lstm_model.train(
            X_train_seq, y_train_seq,
            X_val_seq, y_val_seq
        )

        self.models['lstm'] = lstm_model
        self.results['lstm'] = {'history': history}

        return lstm_model

    def train_all_models(self, symbol: str) -> Dict:
        """Train all models.

        Args:
            symbol: Currency pair to train on

        Returns:
            Dictionary of training results
        """
        logger.info(f"Training all models for {symbol}")

        # Prepare data
        data_splits = self.prepare_training_data(symbol)

        # Train individual models
        self.train_random_forest(data_splits)
        self.train_xgboost(data_splits)
        self.train_lstm(data_splits)

        # Create ensemble
        ensemble_method = self.config['prediction'].get('ensemble_method', 'voting')

        # For ensemble, use tree-based models only (LSTM needs different input format)
        ensemble = EnsembleModel(
            models=[self.models['random_forest'], self.models['xgboost']],
            method=ensemble_method
        )

        self.models['ensemble'] = ensemble

        logger.info("All models trained successfully")

        return self.results

    def evaluate_all_models(self, data_splits: Dict) -> Dict:
        """Evaluate all trained models.

        Args:
            data_splits: Dictionary with train/val/test splits

        Returns:
            Dictionary of evaluation results
        """
        logger.info("Evaluating all models")

        eval_results = {}

        # Evaluate Random Forest
        if 'random_forest' in self.models:
            eval_results['random_forest'] = self.models['random_forest'].evaluate(
                data_splits['X_test'],
                data_splits['y_test']
            )

        # Evaluate XGBoost
        if 'xgboost' in self.models:
            eval_results['xgboost'] = self.models['xgboost'].evaluate(
                data_splits['X_test'],
                data_splits['y_test']
            )

        # Evaluate LSTM
        if 'lstm' in self.models:
            sequence_length = self.config['models']['lstm']['sequence_length']
            X_test_seq, y_test_seq = self.preprocessor.create_sequences(
                data_splits['X_test'].values,
                data_splits['y_test'].values,
                sequence_length
            )
            eval_results['lstm'] = self.models['lstm'].evaluate(X_test_seq, y_test_seq)

        # Evaluate Ensemble
        if 'ensemble' in self.models:
            eval_results['ensemble'] = self.models['ensemble'].evaluate(
                data_splits['X_test'],
                data_splits['y_test']
            )

        logger.info("Model evaluation completed")

        return eval_results

    def save_models(self, output_dir: str = 'saved_models'):
        """Save all trained models.

        Args:
            output_dir: Directory to save models
        """
        logger.info(f"Saving models to {output_dir}")

        os.makedirs(output_dir, exist_ok=True)

        for model_name, model in self.models.items():
            if model_name == 'ensemble':
                filepath = os.path.join(output_dir, f'{model_name}.joblib')
            elif model_name == 'lstm':
                filepath = os.path.join(output_dir, f'{model_name}.keras')
            else:
                filepath = os.path.join(output_dir, f'{model_name}.joblib')

            model.save(filepath)

        # Save preprocessor
        self.preprocessor.save_scaler(os.path.join(output_dir, 'scaler.joblib'))

        # Save results
        results_file = os.path.join(output_dir, 'training_results.json')
        with open(results_file, 'w') as f:
            # Convert numpy types to Python types for JSON serialization
            serializable_results = {}
            for model_name, result in self.results.items():
                if isinstance(result, dict):
                    serializable_results[model_name] = {
                        k: float(v) if isinstance(v, (np.floating, np.integer)) else v
                        for k, v in result.items() if k != 'history'
                    }

            json.dump(serializable_results, f, indent=2)

        logger.info(f"All models saved to {output_dir}")

    def load_models(self, input_dir: str = 'saved_models'):
        """Load trained models.

        Args:
            input_dir: Directory containing saved models
        """
        logger.info(f"Loading models from {input_dir}")

        # Load Random Forest
        rf_path = os.path.join(input_dir, 'random_forest.joblib')
        if os.path.exists(rf_path):
            self.models['random_forest'] = RandomForestModel(self.config['models']['random_forest'])
            self.models['random_forest'].load(rf_path)

        # Load XGBoost
        xgb_path = os.path.join(input_dir, 'xgboost.joblib')
        if os.path.exists(xgb_path):
            self.models['xgboost'] = XGBoostModel(self.config['models']['xgboost'])
            self.models['xgboost'].load(xgb_path)

        # Load LSTM
        lstm_path = os.path.join(input_dir, 'lstm.keras')
        if os.path.exists(lstm_path):
            self.models['lstm'] = LSTMModel(self.config['models']['lstm'])
            self.models['lstm'].load(lstm_path)

        # Load Ensemble
        ensemble_path = os.path.join(input_dir, 'ensemble.joblib')
        if os.path.exists(ensemble_path):
            self.models['ensemble'] = EnsembleModel.load(ensemble_path)

        # Load preprocessor
        self.preprocessor.load_scaler(os.path.join(input_dir, 'scaler.joblib'))

        logger.info("All models loaded successfully")
