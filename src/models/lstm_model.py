"""LSTM model for forex prediction."""

import logging
import numpy as np
from typing import Tuple, Optional
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, callbacks
import os


logger = logging.getLogger(__name__)


class LSTMModel:
    """LSTM-based forex prediction model."""

    def __init__(self, config: dict):
        """Initialize LSTM model.

        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.model = None
        self.history = None
        logger.info("Initialized LSTMModel")

    def build_model(self, input_shape: Tuple[int, int]) -> keras.Model:
        """Build LSTM model architecture.

        Args:
            input_shape: Shape of input sequences (sequence_length, n_features)

        Returns:
            Compiled Keras model
        """
        logger.info(f"Building LSTM model with input shape: {input_shape}")

        units = self.config.get('units', [128, 64, 32])
        dropout = self.config.get('dropout', 0.2)
        learning_rate = self.config.get('learning_rate', 0.001)

        model = keras.Sequential()

        # First LSTM layer with return sequences
        model.add(layers.LSTM(
            units[0],
            return_sequences=True if len(units) > 1 else False,
            input_shape=input_shape
        ))
        model.add(layers.Dropout(dropout))

        # Additional LSTM layers
        for i, n_units in enumerate(units[1:], 1):
            return_seq = i < len(units) - 1
            model.add(layers.LSTM(n_units, return_sequences=return_seq))
            model.add(layers.Dropout(dropout))

        # Dense layers
        model.add(layers.Dense(32, activation='relu'))
        model.add(layers.Dropout(dropout))
        model.add(layers.Dense(16, activation='relu'))
        model.add(layers.Dense(1))

        # Compile model
        optimizer = keras.optimizers.Adam(learning_rate=learning_rate)
        model.compile(
            optimizer=optimizer,
            loss='mse',
            metrics=['mae', 'mape']
        )

        self.model = model
        logger.info(f"Built LSTM model with {model.count_params()} parameters")

        return model

    def train(self, X_train: np.ndarray, y_train: np.ndarray,
              X_val: Optional[np.ndarray] = None, y_val: Optional[np.ndarray] = None,
              epochs: Optional[int] = None, batch_size: Optional[int] = None) -> dict:
        """Train the LSTM model.

        Args:
            X_train: Training sequences
            y_train: Training targets
            X_val: Validation sequences (optional)
            y_val: Validation targets (optional)
            epochs: Number of training epochs
            batch_size: Batch size

        Returns:
            Training history
        """
        if self.model is None:
            raise ValueError("Model not built. Call build_model() first.")

        epochs = epochs or self.config.get('epochs', 100)
        batch_size = batch_size or self.config.get('batch_size', 32)

        logger.info(f"Training LSTM model for {epochs} epochs with batch size {batch_size}")

        # Callbacks
        callback_list = [
            callbacks.EarlyStopping(
                monitor='val_loss' if X_val is not None else 'loss',
                patience=15,
                restore_best_weights=True
            ),
            callbacks.ReduceLROnPlateau(
                monitor='val_loss' if X_val is not None else 'loss',
                factor=0.5,
                patience=5,
                min_lr=1e-7
            )
        ]

        # Train model
        validation_data = (X_val, y_val) if X_val is not None and y_val is not None else None

        self.history = self.model.fit(
            X_train, y_train,
            validation_data=validation_data,
            epochs=epochs,
            batch_size=batch_size,
            callbacks=callback_list,
            verbose=1
        )

        logger.info("LSTM training completed")

        return self.history.history

    def predict(self, X: np.ndarray) -> np.ndarray:
        """Make predictions.

        Args:
            X: Input sequences

        Returns:
            Predictions
        """
        if self.model is None:
            raise ValueError("Model not built or loaded.")

        predictions = self.model.predict(X, verbose=0)
        return predictions.flatten()

    def evaluate(self, X: np.ndarray, y: np.ndarray) -> dict:
        """Evaluate model performance.

        Args:
            X: Test sequences
            y: Test targets

        Returns:
            Dictionary of metrics
        """
        if self.model is None:
            raise ValueError("Model not built or loaded.")

        loss, mae, mape = self.model.evaluate(X, y, verbose=0)

        predictions = self.predict(X)

        # Additional metrics
        from sklearn.metrics import r2_score
        r2 = r2_score(y, predictions)

        # Directional accuracy
        direction_true = np.sign(np.diff(y))
        direction_pred = np.sign(np.diff(predictions))
        directional_accuracy = np.mean(direction_true == direction_pred)

        metrics = {
            'loss': loss,
            'mae': mae,
            'mape': mape,
            'r2': r2,
            'directional_accuracy': directional_accuracy
        }

        logger.info(f"LSTM evaluation - MAE: {mae:.6f}, R2: {r2:.4f}, Dir Acc: {directional_accuracy:.4f}")

        return metrics

    def save(self, filepath: str):
        """Save model to disk.

        Args:
            filepath: Path to save model
        """
        if self.model is None:
            logger.warning("No model to save")
            return

        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        self.model.save(filepath)
        logger.info(f"Saved LSTM model to {filepath}")

    def load(self, filepath: str):
        """Load model from disk.

        Args:
            filepath: Path to load model from
        """
        self.model = keras.models.load_model(filepath)
        logger.info(f"Loaded LSTM model from {filepath}")
