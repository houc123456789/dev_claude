"""Data preprocessing module."""

import logging
import pandas as pd
import numpy as np
from typing import Tuple, Optional
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.model_selection import train_test_split
import joblib
import os


logger = logging.getLogger(__name__)


class DataPreprocessor:
    """Preprocesses forex data for machine learning."""

    def __init__(self, config: dict):
        """Initialize the preprocessor.

        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.scaler = None
        self.feature_columns = None
        self.target_column = 'target'
        logger.info("Initialized DataPreprocessor")

    def prepare_data(self, df: pd.DataFrame, scaler_type: str = 'standard',
                     fit_scaler: bool = True) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """Prepare data for training.

        Args:
            df: DataFrame with features and target
            scaler_type: Type of scaler ('standard' or 'minmax')
            fit_scaler: Whether to fit the scaler

        Returns:
            Tuple of (features_df, target_df)
        """
        logger.info(f"Preparing data with {len(df)} rows")

        # Remove any infinite values
        df = df.replace([np.inf, -np.inf], np.nan)
        df = df.dropna()

        # Separate features and target
        if self.target_column not in df.columns:
            raise ValueError(f"Target column '{self.target_column}' not found in DataFrame")

        X = df.drop(columns=[self.target_column])
        y = df[self.target_column]

        # Store feature columns
        if self.feature_columns is None:
            self.feature_columns = X.columns.tolist()

        # Scale features
        if fit_scaler:
            if scaler_type == 'standard':
                self.scaler = StandardScaler()
            elif scaler_type == 'minmax':
                self.scaler = MinMaxScaler()
            else:
                raise ValueError(f"Unknown scaler type: {scaler_type}")

            X_scaled = self.scaler.fit_transform(X)
        else:
            if self.scaler is None:
                raise ValueError("Scaler not fitted. Set fit_scaler=True first.")
            X_scaled = self.scaler.transform(X)

        X_scaled = pd.DataFrame(X_scaled, columns=X.columns, index=X.index)

        logger.info(f"Prepared data: {X_scaled.shape[1]} features, {len(X_scaled)} samples")

        return X_scaled, y

    def split_data(self, X: pd.DataFrame, y: pd.Series,
                   test_size: float = 0.2, validation_size: float = 0.1,
                   shuffle: bool = False) -> dict:
        """Split data into train, validation, and test sets.

        Args:
            X: Features DataFrame
            y: Target Series
            test_size: Proportion of data for testing
            validation_size: Proportion of training data for validation
            shuffle: Whether to shuffle data before splitting

        Returns:
            Dictionary with train, validation, and test sets
        """
        logger.info(f"Splitting data: test_size={test_size}, validation_size={validation_size}")

        # First split: train+val vs test
        X_temp, X_test, y_temp, y_test = train_test_split(
            X, y, test_size=test_size, shuffle=shuffle, random_state=self.config.get('random_state', 42)
        )

        # Second split: train vs validation
        val_size_adjusted = validation_size / (1 - test_size)
        X_train, X_val, y_train, y_val = train_test_split(
            X_temp, y_temp, test_size=val_size_adjusted, shuffle=shuffle,
            random_state=self.config.get('random_state', 42)
        )

        logger.info(f"Split sizes - Train: {len(X_train)}, Val: {len(X_val)}, Test: {len(X_test)}")

        return {
            'X_train': X_train,
            'y_train': y_train,
            'X_val': X_val,
            'y_val': y_val,
            'X_test': X_test,
            'y_test': y_test
        }

    def create_sequences(self, X: np.ndarray, y: np.ndarray,
                         sequence_length: int) -> Tuple[np.ndarray, np.ndarray]:
        """Create sequences for LSTM models.

        Args:
            X: Features array
            y: Target array
            sequence_length: Length of sequences

        Returns:
            Tuple of (sequences, targets)
        """
        logger.info(f"Creating sequences with length {sequence_length}")

        X_seq, y_seq = [], []

        for i in range(len(X) - sequence_length):
            X_seq.append(X[i:i + sequence_length])
            y_seq.append(y[i + sequence_length])

        X_seq = np.array(X_seq)
        y_seq = np.array(y_seq)

        logger.info(f"Created {len(X_seq)} sequences with shape {X_seq.shape}")

        return X_seq, y_seq

    def save_scaler(self, filepath: str):
        """Save the scaler to disk."""
        if self.scaler is None:
            logger.warning("No scaler to save")
            return

        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        joblib.dump({
            'scaler': self.scaler,
            'feature_columns': self.feature_columns
        }, filepath)
        logger.info(f"Saved scaler to {filepath}")

    def load_scaler(self, filepath: str):
        """Load the scaler from disk."""
        data = joblib.load(filepath)
        self.scaler = data['scaler']
        self.feature_columns = data['feature_columns']
        logger.info(f"Loaded scaler from {filepath}")

    def inverse_transform_target(self, y_scaled: np.ndarray, target_feature: str = 'close') -> np.ndarray:
        """Inverse transform target values.

        Args:
            y_scaled: Scaled target values
            target_feature: Name of the target feature for inverse scaling

        Returns:
            Original scale target values
        """
        if self.scaler is None:
            return y_scaled

        # Create dummy array with zeros for all features except target
        n_features = len(self.feature_columns)
        dummy = np.zeros((len(y_scaled), n_features))

        # Find index of target feature
        if target_feature in self.feature_columns:
            target_idx = self.feature_columns.index(target_feature)
            dummy[:, target_idx] = y_scaled

            # Inverse transform
            inverse = self.scaler.inverse_transform(dummy)
            return inverse[:, target_idx]
        else:
            logger.warning(f"Target feature '{target_feature}' not found in feature columns")
            return y_scaled
