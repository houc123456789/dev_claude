"""Ensemble model combining multiple prediction models."""

import logging
import numpy as np
import pandas as pd
from typing import List, Dict
import joblib
import os


logger = logging.getLogger(__name__)


class EnsembleModel:
    """Ensemble model for forex prediction."""

    def __init__(self, models: List, method: str = 'voting', weights: List[float] = None):
        """Initialize ensemble model.

        Args:
            models: List of trained models
            method: Ensemble method ('voting', 'weighted', 'stacking')
            weights: Weights for each model (for weighted averaging)
        """
        self.models = models
        self.method = method
        self.weights = weights

        if self.method == 'weighted' and self.weights is None:
            # Equal weights by default
            self.weights = [1.0 / len(models)] * len(models)
        elif self.weights is not None:
            # Normalize weights
            total = sum(self.weights)
            self.weights = [w / total for w in self.weights]

        logger.info(f"Initialized EnsembleModel with {len(models)} models using {method} method")

    def predict(self, X) -> np.ndarray:
        """Make ensemble predictions.

        Args:
            X: Input features (format depends on model type)

        Returns:
            Ensemble predictions
        """
        predictions = []

        for model in self.models:
            pred = model.predict(X)
            predictions.append(pred)

        predictions = np.array(predictions)

        if self.method == 'voting':
            # Simple average
            ensemble_pred = np.mean(predictions, axis=0)
        elif self.method == 'weighted':
            # Weighted average
            ensemble_pred = np.average(predictions, axis=0, weights=self.weights)
        elif self.method == 'stacking':
            # For stacking, we would need a meta-learner
            # For now, use weighted average
            logger.warning("Stacking not fully implemented, using weighted average")
            ensemble_pred = np.average(predictions, axis=0, weights=self.weights)
        else:
            raise ValueError(f"Unknown ensemble method: {self.method}")

        return ensemble_pred

    def evaluate(self, X, y) -> Dict[str, float]:
        """Evaluate ensemble model.

        Args:
            X: Input features
            y: True targets

        Returns:
            Dictionary of metrics
        """
        from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

        predictions = self.predict(X)

        mse = mean_squared_error(y, predictions)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y, predictions)
        r2 = r2_score(y, predictions)

        # Directional accuracy
        direction_true = np.sign(np.diff(y))
        direction_pred = np.sign(np.diff(predictions))
        directional_accuracy = np.mean(direction_true == direction_pred)

        metrics = {
            'mse': mse,
            'rmse': rmse,
            'mae': mae,
            'r2': r2,
            'directional_accuracy': directional_accuracy
        }

        logger.info(f"Ensemble - MSE: {mse:.6f}, MAE: {mae:.6f}, R2: {r2:.4f}, Dir Acc: {directional_accuracy:.4f}")

        return metrics

    def predict_with_confidence(self, X) -> tuple:
        """Make predictions with confidence intervals.

        Args:
            X: Input features

        Returns:
            Tuple of (predictions, std_dev)
        """
        predictions = []

        for model in self.models:
            pred = model.predict(X)
            predictions.append(pred)

        predictions = np.array(predictions)

        # Mean prediction
        mean_pred = np.mean(predictions, axis=0)

        # Standard deviation as confidence measure
        std_pred = np.std(predictions, axis=0)

        return mean_pred, std_pred

    def get_model_predictions(self, X) -> Dict[str, np.ndarray]:
        """Get individual predictions from each model.

        Args:
            X: Input features

        Returns:
            Dictionary mapping model names to predictions
        """
        model_preds = {}

        for i, model in enumerate(self.models):
            model_name = type(model).__name__
            pred = model.predict(X)
            model_preds[f"{model_name}_{i}"] = pred

        return model_preds

    def save(self, filepath: str):
        """Save ensemble model to disk.

        Args:
            filepath: Path to save model
        """
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        joblib.dump({
            'models': self.models,
            'method': self.method,
            'weights': self.weights
        }, filepath)
        logger.info(f"Saved ensemble model to {filepath}")

    @classmethod
    def load(cls, filepath: str):
        """Load ensemble model from disk.

        Args:
            filepath: Path to load model from

        Returns:
            EnsembleModel instance
        """
        data = joblib.load(filepath)
        ensemble = cls(
            models=data['models'],
            method=data['method'],
            weights=data.get('weights')
        )
        logger.info(f"Loaded ensemble model from {filepath}")
        return ensemble
