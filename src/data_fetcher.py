"""Data fetcher module for forex market data."""

import logging
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Optional, List
import time


logger = logging.getLogger(__name__)


class ForexDataFetcher:
    """Fetches forex data from various sources."""

    def __init__(self, api_keys: dict, data_source: str = "alpha_vantage"):
        """Initialize the data fetcher.

        Args:
            api_keys: Dictionary containing API keys
            data_source: Source to fetch data from
        """
        self.api_keys = api_keys
        self.data_source = data_source
        logger.info(f"Initialized ForexDataFetcher with source: {data_source}")

    def fetch_data(self, symbol: str, interval: str = "1h", lookback_days: int = 365) -> pd.DataFrame:
        """Fetch forex data for a given symbol.

        Args:
            symbol: Currency pair (e.g., 'EUR/USD')
            interval: Time interval
            lookback_days: Number of days to look back

        Returns:
            DataFrame with OHLCV data
        """
        logger.info(f"Fetching data for {symbol} with interval {interval}")

        if self.data_source == "alpha_vantage":
            return self._fetch_alpha_vantage(symbol, interval)
        elif self.data_source == "yfinance":
            return self._fetch_yfinance(symbol, interval, lookback_days)
        elif self.data_source == "alpaca":
            return self._fetch_alpaca(symbol, interval, lookback_days)
        else:
            raise ValueError(f"Unknown data source: {self.data_source}")

    def _fetch_alpha_vantage(self, symbol: str, interval: str) -> pd.DataFrame:
        """Fetch data from Alpha Vantage API."""
        try:
            from alpha_vantage.foreignexchange import ForeignExchange

            if not self.api_keys.get('alpha_vantage'):
                logger.warning("No Alpha Vantage API key found, generating sample data")
                return self._generate_sample_data(symbol)

            # Convert symbol format (EUR/USD -> EURUSD)
            from_currency, to_currency = symbol.replace('/', '').replace('-', '')[:3], symbol.replace('/', '').replace('-', '')[3:]

            fx = ForeignExchange(key=self.api_keys['alpha_vantage'], output_format='pandas')

            # Map interval
            interval_map = {
                '1m': '1min', '5m': '5min', '15m': '15min',
                '30m': '30min', '1h': '60min', '1d': 'daily'
            }

            av_interval = interval_map.get(interval, '60min')

            if av_interval == 'daily':
                data, _ = fx.get_currency_exchange_daily(from_symbol=from_currency, to_symbol=to_currency, outputsize='full')
            else:
                data, _ = fx.get_currency_exchange_intraday(
                    from_symbol=from_currency,
                    to_symbol=to_currency,
                    interval=av_interval,
                    outputsize='full'
                )

            # Rename columns
            data.columns = ['open', 'high', 'low', 'close']
            data.index = pd.to_datetime(data.index)
            data = data.sort_index()

            # Add volume (forex doesn't have volume, use 0 as placeholder)
            data['volume'] = 0

            logger.info(f"Fetched {len(data)} records from Alpha Vantage")
            return data

        except Exception as e:
            logger.error(f"Error fetching from Alpha Vantage: {e}")
            logger.info("Generating sample data instead")
            return self._generate_sample_data(symbol)

    def _fetch_yfinance(self, symbol: str, interval: str, lookback_days: int) -> pd.DataFrame:
        """Fetch data from Yahoo Finance."""
        try:
            import yfinance as yf

            # Convert symbol format (EUR/USD -> EURUSD=X)
            yf_symbol = symbol.replace('/', '') + '=X'

            # Map interval
            interval_map = {
                '1m': '1m', '5m': '5m', '15m': '15m',
                '30m': '30m', '1h': '1h', '1d': '1d'
            }

            yf_interval = interval_map.get(interval, '1h')

            end_date = datetime.now()
            start_date = end_date - timedelta(days=lookback_days)

            ticker = yf.Ticker(yf_symbol)
            data = ticker.history(start=start_date, end=end_date, interval=yf_interval)

            if data.empty:
                logger.warning(f"No data returned from yfinance for {symbol}")
                return self._generate_sample_data(symbol)

            # Rename columns to lowercase
            data.columns = data.columns.str.lower()
            data = data[['open', 'high', 'low', 'close', 'volume']]

            logger.info(f"Fetched {len(data)} records from Yahoo Finance")
            return data

        except Exception as e:
            logger.error(f"Error fetching from Yahoo Finance: {e}")
            return self._generate_sample_data(symbol)

    def _fetch_alpaca(self, symbol: str, interval: str, lookback_days: int) -> pd.DataFrame:
        """Fetch data from Alpaca API."""
        try:
            import alpaca_trade_api as tradeapi

            if not self.api_keys.get('alpaca_key') or not self.api_keys.get('alpaca_secret'):
                logger.warning("No Alpaca API keys found, generating sample data")
                return self._generate_sample_data(symbol)

            api = tradeapi.REST(
                self.api_keys['alpaca_key'],
                self.api_keys['alpaca_secret'],
                base_url='https://paper-api.alpaca.markets'
            )

            # Convert symbol format
            alpaca_symbol = symbol.replace('/', '')

            # Map interval
            timeframe_map = {
                '1m': '1Min', '5m': '5Min', '15m': '15Min',
                '1h': '1Hour', '1d': '1Day'
            }

            timeframe = timeframe_map.get(interval, '1Hour')

            end = datetime.now()
            start = end - timedelta(days=lookback_days)

            bars = api.get_crypto_bars(
                alpaca_symbol,
                timeframe,
                start=start.isoformat(),
                end=end.isoformat()
            ).df

            bars.columns = bars.columns.str.lower()
            data = bars[['open', 'high', 'low', 'close', 'volume']]

            logger.info(f"Fetched {len(data)} records from Alpaca")
            return data

        except Exception as e:
            logger.error(f"Error fetching from Alpaca: {e}")
            return self._generate_sample_data(symbol)

    def _generate_sample_data(self, symbol: str, num_points: int = 5000) -> pd.DataFrame:
        """Generate sample forex data for testing."""
        logger.info(f"Generating sample data for {symbol}")

        # Generate realistic forex price movements
        np.random.seed(42)

        # Starting price based on common pairs
        base_prices = {
            'EUR/USD': 1.1000, 'GBP/USD': 1.3000, 'USD/JPY': 110.00,
            'AUD/USD': 0.7500, 'USD/CAD': 1.2500, 'USD/CHF': 0.9200
        }

        base_price = base_prices.get(symbol, 1.0000)

        # Generate price series with random walk
        returns = np.random.randn(num_points) * 0.001  # 0.1% volatility
        prices = base_price * np.exp(np.cumsum(returns))

        # Generate OHLC data
        dates = pd.date_range(end=datetime.now(), periods=num_points, freq='1H')

        data = pd.DataFrame({
            'open': prices * (1 + np.random.randn(num_points) * 0.0002),
            'high': prices * (1 + np.abs(np.random.randn(num_points)) * 0.0005),
            'low': prices * (1 - np.abs(np.random.randn(num_points)) * 0.0005),
            'close': prices,
            'volume': np.random.randint(1000, 10000, num_points)
        }, index=dates)

        # Ensure high is highest and low is lowest
        data['high'] = data[['open', 'high', 'low', 'close']].max(axis=1)
        data['low'] = data[['open', 'high', 'low', 'close']].min(axis=1)

        return data

    def fetch_multiple_symbols(self, symbols: List[str], interval: str = "1h",
                                lookback_days: int = 365) -> dict:
        """Fetch data for multiple symbols.

        Args:
            symbols: List of currency pairs
            interval: Time interval
            lookback_days: Number of days to look back

        Returns:
            Dictionary mapping symbols to DataFrames
        """
        data_dict = {}

        for symbol in symbols:
            try:
                data = self.fetch_data(symbol, interval, lookback_days)
                data_dict[symbol] = data
                time.sleep(1)  # Rate limiting
            except Exception as e:
                logger.error(f"Error fetching data for {symbol}: {e}")

        return data_dict
