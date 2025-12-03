"""Feature engineering module with technical indicators."""

import logging
import pandas as pd
import numpy as np
from typing import List, Dict


logger = logging.getLogger(__name__)


class FeatureEngineer:
    """Creates features from forex OHLCV data."""

    def __init__(self, config: dict):
        """Initialize the feature engineer.

        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.indicators = config.get('technical_indicators', [])
        self.window_sizes = config.get('window_sizes', [5, 10, 20])
        self.lag_features = config.get('lag_features', [1, 2, 3])
        logger.info("Initialized FeatureEngineer")

    def create_features(self, data: pd.DataFrame) -> pd.DataFrame:
        """Create all features from OHLCV data.

        Args:
            data: DataFrame with OHLCV columns

        Returns:
            DataFrame with all features
        """
        logger.info(f"Creating features from {len(data)} rows")

        df = data.copy()

        # Basic price features
        df = self._add_basic_features(df)

        # Technical indicators
        if 'SMA' in self.indicators:
            df = self._add_sma(df)
        if 'EMA' in self.indicators:
            df = self._add_ema(df)
        if 'RSI' in self.indicators:
            df = self._add_rsi(df)
        if 'MACD' in self.indicators:
            df = self._add_macd(df)
        if 'Bollinger_Bands' in self.indicators:
            df = self._add_bollinger_bands(df)
        if 'ATR' in self.indicators:
            df = self._add_atr(df)
        if 'Stochastic' in self.indicators:
            df = self._add_stochastic(df)
        if 'ADX' in self.indicators:
            df = self._add_adx(df)

        # Lag features
        df = self._add_lag_features(df)

        # Time features
        df = self._add_time_features(df)

        # Drop NaN values
        initial_len = len(df)
        df = df.dropna()
        logger.info(f"Created features: {len(df.columns)} columns, {len(df)} rows (dropped {initial_len - len(df)} NaN rows)")

        return df

    def _add_basic_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add basic price-based features."""
        # Returns
        df['returns'] = df['close'].pct_change()
        df['log_returns'] = np.log(df['close'] / df['close'].shift(1))

        # Price changes
        df['price_change'] = df['close'] - df['open']
        df['high_low_range'] = df['high'] - df['low']

        # Relative prices
        df['close_to_high'] = df['close'] / df['high']
        df['close_to_low'] = df['close'] / df['low']

        return df

    def _add_sma(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add Simple Moving Average indicators."""
        for window in self.window_sizes:
            df[f'sma_{window}'] = df['close'].rolling(window=window).mean()
            df[f'price_to_sma_{window}'] = df['close'] / df[f'sma_{window}']

        return df

    def _add_ema(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add Exponential Moving Average indicators."""
        for window in self.window_sizes:
            df[f'ema_{window}'] = df['close'].ewm(span=window, adjust=False).mean()
            df[f'price_to_ema_{window}'] = df['close'] / df[f'ema_{window}']

        return df

    def _add_rsi(self, df: pd.DataFrame, periods: List[int] = None) -> pd.DataFrame:
        """Add Relative Strength Index."""
        if periods is None:
            periods = [14, 21]

        for period in periods:
            delta = df['close'].diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()

            rs = gain / loss
            df[f'rsi_{period}'] = 100 - (100 / (1 + rs))

        return df

    def _add_macd(self, df: pd.DataFrame, fast: int = 12, slow: int = 26, signal: int = 9) -> pd.DataFrame:
        """Add MACD indicator."""
        ema_fast = df['close'].ewm(span=fast, adjust=False).mean()
        ema_slow = df['close'].ewm(span=slow, adjust=False).mean()

        df['macd'] = ema_fast - ema_slow
        df['macd_signal'] = df['macd'].ewm(span=signal, adjust=False).mean()
        df['macd_diff'] = df['macd'] - df['macd_signal']

        return df

    def _add_bollinger_bands(self, df: pd.DataFrame, window: int = 20, num_std: float = 2.0) -> pd.DataFrame:
        """Add Bollinger Bands."""
        df['bb_middle'] = df['close'].rolling(window=window).mean()
        bb_std = df['close'].rolling(window=window).std()

        df['bb_upper'] = df['bb_middle'] + (bb_std * num_std)
        df['bb_lower'] = df['bb_middle'] - (bb_std * num_std)

        df['bb_width'] = df['bb_upper'] - df['bb_lower']
        df['bb_position'] = (df['close'] - df['bb_lower']) / df['bb_width']

        return df

    def _add_atr(self, df: pd.DataFrame, period: int = 14) -> pd.DataFrame:
        """Add Average True Range."""
        high_low = df['high'] - df['low']
        high_close = np.abs(df['high'] - df['close'].shift())
        low_close = np.abs(df['low'] - df['close'].shift())

        true_range = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)
        df['atr'] = true_range.rolling(window=period).mean()

        return df

    def _add_stochastic(self, df: pd.DataFrame, k_period: int = 14, d_period: int = 3) -> pd.DataFrame:
        """Add Stochastic Oscillator."""
        low_min = df['low'].rolling(window=k_period).min()
        high_max = df['high'].rolling(window=k_period).max()

        df['stoch_k'] = 100 * (df['close'] - low_min) / (high_max - low_min)
        df['stoch_d'] = df['stoch_k'].rolling(window=d_period).mean()

        return df

    def _add_adx(self, df: pd.DataFrame, period: int = 14) -> pd.DataFrame:
        """Add Average Directional Index."""
        # Calculate +DM and -DM
        high_diff = df['high'].diff()
        low_diff = -df['low'].diff()

        plus_dm = high_diff.where((high_diff > low_diff) & (high_diff > 0), 0)
        minus_dm = low_diff.where((low_diff > high_diff) & (low_diff > 0), 0)

        # Calculate ATR
        high_low = df['high'] - df['low']
        high_close = np.abs(df['high'] - df['close'].shift())
        low_close = np.abs(df['low'] - df['close'].shift())
        true_range = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)

        atr = true_range.rolling(window=period).mean()

        # Calculate +DI and -DI
        plus_di = 100 * (plus_dm.rolling(window=period).mean() / atr)
        minus_di = 100 * (minus_dm.rolling(window=period).mean() / atr)

        # Calculate DX and ADX
        dx = 100 * np.abs(plus_di - minus_di) / (plus_di + minus_di)
        df['adx'] = dx.rolling(window=period).mean()

        df['plus_di'] = plus_di
        df['minus_di'] = minus_di

        return df

    def _add_lag_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add lagged features."""
        for lag in self.lag_features:
            df[f'close_lag_{lag}'] = df['close'].shift(lag)
            df[f'returns_lag_{lag}'] = df['returns'].shift(lag)
            df[f'volume_lag_{lag}'] = df['volume'].shift(lag)

        return df

    def _add_time_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Add time-based features."""
        df['hour'] = df.index.hour
        df['day_of_week'] = df.index.dayofweek
        df['day_of_month'] = df.index.day
        df['month'] = df.index.month
        df['quarter'] = df.index.quarter

        # Cyclical encoding for time features
        df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
        df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
        df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
        df['day_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)

        return df

    def create_target(self, df: pd.DataFrame, horizon: int = 1, target_type: str = 'returns') -> pd.DataFrame:
        """Create target variable for prediction.

        Args:
            df: DataFrame with features
            horizon: Number of periods ahead to predict
            target_type: Type of target ('returns', 'direction', 'price')

        Returns:
            DataFrame with target column
        """
        if target_type == 'returns':
            df['target'] = df['close'].pct_change(horizon).shift(-horizon)
        elif target_type == 'direction':
            future_returns = df['close'].pct_change(horizon).shift(-horizon)
            df['target'] = (future_returns > 0).astype(int)
        elif target_type == 'price':
            df['target'] = df['close'].shift(-horizon)
        else:
            raise ValueError(f"Unknown target type: {target_type}")

        return df
