"""XGBoost model for forex prediction."""

import logging
import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib
import os


logger = logging.getLogger(__name__)


class XGBoostModel:
    """XGBoost-based forex prediction model."""

    def __init__(self, config: dict):
        """Initialize XGBoost model.

        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.model = None
        self.feature_importance = None
        logger.info("Initialized XGBoostModel")

    def build_model(self) -> xgb.XGBRegressor:
        """Build XGBoost model.

        Returns:
            XGBRegressor instance
        """
        logger.info("Building XGBoost model")

        n_estimators = self.config.get('n_estimators', 200)
        max_depth = self.config.get('max_depth', 10)
        learning_rate = self.config.get('learning_rate', 0.1)
        subsample = self.config.get('subsample', 0.8)
        colsample_bytree = self.config.get('colsample_bytree', 0.8)
        random_state = self.config.get('random_state', 42)

        self.model = xgb.XGBRegressor(
            n_estimators=n_estimators,
            max_depth=max_depth,
            learning_rate=learning_rate,
            subsample=subsample,
            colsample_bytree=colsample_bytree,
            random_state=random_state,
            n_jobs=-1,
            verbosity=0
        )

        logger.info(f"Built XGBoost with {n_estimators} estimators")

        return self.model

    def train(self, X_train: pd.DataFrame, y_train: pd.Series,
              X_val: pd.DataFrame = None, y_val: pd.Series = None) -> dict:
        """Train the XGBoost model.

        Args:
            X_train: Training features
            y_train: Training targets
            X_val: Validation features (optional)
            y_val: Validation targets (optional)

        Returns:
            Training metrics
        """
        if self.model is None:
            self.build_model()

        logger.info(f"Training XGBoost on {len(X_train)} samples")

        # Prepare evaluation set
        eval_set = [(X_train, y_train)]
        if X_val is not None and y_val is not None:
            eval_set.append((X_val, y_val))

        # Train model
        self.model.fit(
            X_train, y_train,
            eval_set=eval_set,
            early_stopping_rounds=20,
            verbose=False
        )

        # Get feature importance
        self.feature_importance = pd.DataFrame({
            'feature': X_train.columns,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)

        logger.info("Top 5 important features:")
        for idx, row in self.feature_importance.head().iterrows():
            logger.info(f"  {row['feature']}: {row['importance']:.4f}")

        # Evaluate on training set
        train_pred = self.model.predict(X_train)
        train_metrics = self._calculate_metrics(y_train, train_pred, "Training")

        # Evaluate on validation set if provided
        val_metrics = {}
        if X_val is not None and y_val is not None:
            val_pred = self.model.predict(X_val)
            val_metrics = self._calculate_metrics(y_val, val_pred, "Validation")

        logger.info("XGBoost training completed")

        return {
            'train_metrics': train_metrics,
            'val_metrics': val_metrics,
            'feature_importance': self.feature_importance
        }

    def predict(self, X: pd.DataFrame) -> np.ndarray:
        """Make predictions.

        Args:
            X: Input features

        Returns:
            Predictions
        """
        if self.model is None:
            raise ValueError("Model not trained or loaded.")

        predictions = self.model.predict(X)
        return predictions

    def evaluate(self, X: pd.DataFrame, y: pd.Series) -> dict:
        """Evaluate model performance.

        Args:
            X: Test features
            y: Test targets

        Returns:
            Dictionary of metrics
        """
        if self.model is None:
            raise ValueError("Model not trained or loaded.")

        predictions = self.predict(X)
        metrics = self._calculate_metrics(y, predictions, "Test")

        return metrics

    def _calculate_metrics(self, y_true: np.ndarray, y_pred: np.ndarray, dataset: str = "") -> dict:
        """Calculate evaluation metrics.

        Args:
            y_true: True values
            y_pred: Predicted values
            dataset: Dataset name for logging

        Returns:
            Dictionary of metrics
        """
        mse = mean_squared_error(y_true, y_pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_true, y_pred)
        r2 = r2_score(y_true, y_pred)

        # Directional accuracy
        direction_true = np.sign(np.diff(y_true))
        direction_pred = np.sign(np.diff(y_pred))
        directional_accuracy = np.mean(direction_true == direction_pred)

        metrics = {
            'mse': mse,
            'rmse': rmse,
            'mae': mae,
            'r2': r2,
            'directional_accuracy': directional_accuracy
        }

        if dataset:
            logger.info(f"{dataset} - MSE: {mse:.6f}, MAE: {mae:.6f}, R2: {r2:.4f}, Dir Acc: {directional_accuracy:.4f}")

        return metrics

    def get_feature_importance(self, top_n: int = 20) -> pd.DataFrame:
        """Get top N important features.

        Args:
            top_n: Number of top features to return

        Returns:
            DataFrame with feature importance
        """
        if self.feature_importance is None:
            logger.warning("Feature importance not available")
            return pd.DataFrame()

        return self.feature_importance.head(top_n)

    def save(self, filepath: str):
        """Save model to disk.

        Args:
            filepath: Path to save model
        """
        if self.model is None:
            logger.warning("No model to save")
            return

        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        joblib.dump({
            'model': self.model,
            'feature_importance': self.feature_importance
        }, filepath)
        logger.info(f"Saved XGBoost model to {filepath}")

    def load(self, filepath: str):
        """Load model from disk.

        Args:
            filepath: Path to load model from
        """
        data = joblib.load(filepath)
        self.model = data['model']
        self.feature_importance = data.get('feature_importance')
        logger.info(f"Loaded XGBoost model from {filepath}")
