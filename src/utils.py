"""Utility functions for the forex prediction bot."""

import os
import yaml
import logging
from datetime import datetime
from typing import Dict, Any
import numpy as np
import pandas as pd
from dotenv import load_dotenv


def setup_logging(log_dir: str = "logs") -> logging.Logger:
    """Setup logging configuration."""
    os.makedirs(log_dir, exist_ok=True)

    log_file = os.path.join(log_dir, f"forex_bot_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log")

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )

    return logging.getLogger(__name__)


def load_config(config_path: str = "config.yaml") -> Dict[str, Any]:
    """Load configuration from YAML file."""
    load_dotenv()

    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)

    # Replace environment variables in config
    if 'api_keys' in config:
        for key, value in config['api_keys'].items():
            if isinstance(value, str) and value.startswith('${') and value.endswith('}'):
                env_var = value[2:-1]
                config['api_keys'][key] = os.getenv(env_var, '')

    return config


def calculate_returns(prices: pd.Series) -> pd.Series:
    """Calculate returns from prices."""
    return prices.pct_change()


def calculate_log_returns(prices: pd.Series) -> pd.Series:
    """Calculate log returns from prices."""
    return np.log(prices / prices.shift(1))


def normalize_data(data: pd.DataFrame, method: str = 'minmax') -> pd.DataFrame:
    """Normalize data using specified method."""
    from sklearn.preprocessing import MinMaxScaler, StandardScaler

    if method == 'minmax':
        scaler = MinMaxScaler()
    elif method == 'standard':
        scaler = StandardScaler()
    else:
        raise ValueError(f"Unknown normalization method: {method}")

    normalized = pd.DataFrame(
        scaler.fit_transform(data),
        columns=data.columns,
        index=data.index
    )

    return normalized


def create_sequences(data: np.ndarray, sequence_length: int) -> tuple:
    """Create sequences for LSTM training."""
    X, y = [], []

    for i in range(len(data) - sequence_length):
        X.append(data[i:i + sequence_length])
        y.append(data[i + sequence_length])

    return np.array(X), np.array(y)


def calculate_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
    """Calculate various performance metrics."""
    from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y_true, y_pred)
    r2 = r2_score(y_true, y_pred)

    # Directional accuracy
    direction_true = np.sign(np.diff(y_true))
    direction_pred = np.sign(np.diff(y_pred))
    directional_accuracy = np.mean(direction_true == direction_pred)

    return {
        'mse': mse,
        'rmse': rmse,
        'mae': mae,
        'r2': r2,
        'directional_accuracy': directional_accuracy
    }


def save_model(model: Any, filepath: str):
    """Save a model to disk."""
    import joblib
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    joblib.dump(model, filepath)


def load_model(filepath: str) -> Any:
    """Load a model from disk."""
    import joblib
    return joblib.load(filepath)
