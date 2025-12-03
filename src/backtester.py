"""Backtesting system for forex trading strategies."""

import logging
import numpy as np
import pandas as pd
from typing import Dict, List
from datetime import datetime
import matplotlib.pyplot as plt
import os


logger = logging.getLogger(__name__)


class ForexBacktester:
    """Backtests forex trading strategies."""

    def __init__(self, config: dict):
        """Initialize the backtester.

        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.initial_capital = config['backtesting']['initial_capital']
        self.risk_per_trade = config['backtesting']['risk_per_trade']
        self.stop_loss = config['backtesting']['stop_loss']
        self.take_profit = config['backtesting']['take_profit']
        self.max_positions = config['backtesting']['max_positions']

        self.trades = []
        self.equity_curve = []
        self.metrics = {}

        logger.info("Initialized ForexBacktester")

    def run_backtest(self, predictions: pd.DataFrame, actual_prices: pd.DataFrame,
                     confidence_threshold: float = 0.6) -> Dict:
        """Run backtest on predictions.

        Args:
            predictions: DataFrame with predictions and timestamps
            actual_prices: DataFrame with actual prices
            confidence_threshold: Minimum confidence for trades

        Returns:
            Backtesting results
        """
        logger.info("Running backtest")

        capital = self.initial_capital
        position = None
        open_positions = []

        for idx in range(len(predictions)):
            timestamp = predictions.index[idx]
            pred = predictions.iloc[idx]

            # Get actual price
            if timestamp not in actual_prices.index:
                continue

            current_price = actual_prices.loc[timestamp, 'close']

            # Check existing positions
            for pos in open_positions[:]:
                # Check stop loss
                if pos['type'] == 'long':
                    if current_price <= pos['entry_price'] * (1 - self.stop_loss):
                        # Stop loss hit
                        exit_price = pos['entry_price'] * (1 - self.stop_loss)
                        pnl = (exit_price - pos['entry_price']) * pos['size']
                        capital += pnl
                        self._record_trade(pos, exit_price, pnl, 'stop_loss')
                        open_positions.remove(pos)
                    elif current_price >= pos['entry_price'] * (1 + self.take_profit):
                        # Take profit hit
                        exit_price = pos['entry_price'] * (1 + self.take_profit)
                        pnl = (exit_price - pos['entry_price']) * pos['size']
                        capital += pnl
                        self._record_trade(pos, exit_price, pnl, 'take_profit')
                        open_positions.remove(pos)

                elif pos['type'] == 'short':
                    if current_price >= pos['entry_price'] * (1 + self.stop_loss):
                        # Stop loss hit
                        exit_price = pos['entry_price'] * (1 + self.stop_loss)
                        pnl = (pos['entry_price'] - exit_price) * pos['size']
                        capital += pnl
                        self._record_trade(pos, exit_price, pnl, 'stop_loss')
                        open_positions.remove(pos)
                    elif current_price <= pos['entry_price'] * (1 - self.take_profit):
                        # Take profit hit
                        exit_price = pos['entry_price'] * (1 - self.take_profit)
                        pnl = (pos['entry_price'] - exit_price) * pos['size']
                        capital += pnl
                        self._record_trade(pos, exit_price, pnl, 'take_profit')
                        open_positions.remove(pos)

            # Check if we can open new positions
            confidence = pred.get('confidence', 0.5)

            if len(open_positions) < self.max_positions and confidence >= confidence_threshold:
                predicted_return = pred.get('predicted_return', 0)

                if predicted_return > 0:  # Buy signal
                    position_size = capital * self.risk_per_trade * confidence
                    position_size = position_size / current_price

                    new_position = {
                        'timestamp': timestamp,
                        'type': 'long',
                        'entry_price': current_price,
                        'size': position_size,
                        'confidence': confidence
                    }
                    open_positions.append(new_position)

                elif predicted_return < 0:  # Sell signal
                    position_size = capital * self.risk_per_trade * confidence
                    position_size = position_size / current_price

                    new_position = {
                        'timestamp': timestamp,
                        'type': 'short',
                        'entry_price': current_price,
                        'size': position_size,
                        'confidence': confidence
                    }
                    open_positions.append(new_position)

            # Record equity
            total_equity = capital
            for pos in open_positions:
                if pos['type'] == 'long':
                    unrealized_pnl = (current_price - pos['entry_price']) * pos['size']
                else:
                    unrealized_pnl = (pos['entry_price'] - current_price) * pos['size']
                total_equity += unrealized_pnl

            self.equity_curve.append({
                'timestamp': timestamp,
                'equity': total_equity,
                'open_positions': len(open_positions)
            })

        # Close remaining positions
        final_price = actual_prices.iloc[-1]['close']
        for pos in open_positions:
            if pos['type'] == 'long':
                pnl = (final_price - pos['entry_price']) * pos['size']
            else:
                pnl = (pos['entry_price'] - final_price) * pos['size']

            capital += pnl
            self._record_trade(pos, final_price, pnl, 'close')

        # Calculate metrics
        self.metrics = self._calculate_metrics(capital)

        logger.info(f"Backtest completed - Final Capital: ${capital:.2f}")
        logger.info(f"Total Return: {self.metrics['total_return']:.2%}")
        logger.info(f"Win Rate: {self.metrics['win_rate']:.2%}")
        logger.info(f"Sharpe Ratio: {self.metrics['sharpe_ratio']:.2f}")

        return self.metrics

    def _record_trade(self, position: Dict, exit_price: float, pnl: float, exit_reason: str):
        """Record a completed trade."""
        trade = {
            'entry_time': position['timestamp'],
            'entry_price': position['entry_price'],
            'exit_price': exit_price,
            'type': position['type'],
            'size': position['size'],
            'pnl': pnl,
            'return': pnl / (position['entry_price'] * position['size']),
            'exit_reason': exit_reason,
            'confidence': position['confidence']
        }
        self.trades.append(trade)

    def _calculate_metrics(self, final_capital: float) -> Dict:
        """Calculate backtesting metrics."""
        if not self.trades:
            return {
                'total_return': 0,
                'total_trades': 0,
                'win_rate': 0,
                'avg_return': 0,
                'sharpe_ratio': 0,
                'max_drawdown': 0
            }

        trades_df = pd.DataFrame(self.trades)

        total_return = (final_capital - self.initial_capital) / self.initial_capital
        total_trades = len(self.trades)

        winning_trades = trades_df[trades_df['pnl'] > 0]
        win_rate = len(winning_trades) / total_trades if total_trades > 0 else 0

        avg_return = trades_df['return'].mean()
        avg_win = winning_trades['return'].mean() if len(winning_trades) > 0 else 0
        avg_loss = trades_df[trades_df['pnl'] < 0]['return'].mean() if len(trades_df[trades_df['pnl'] < 0]) > 0 else 0

        # Sharpe ratio
        if len(trades_df) > 1:
            returns_std = trades_df['return'].std()
            sharpe_ratio = (avg_return / returns_std) * np.sqrt(252) if returns_std > 0 else 0
        else:
            sharpe_ratio = 0

        # Max drawdown
        equity_df = pd.DataFrame(self.equity_curve)
        if len(equity_df) > 0:
            equity_df['cummax'] = equity_df['equity'].cummax()
            equity_df['drawdown'] = (equity_df['equity'] - equity_df['cummax']) / equity_df['cummax']
            max_drawdown = equity_df['drawdown'].min()
        else:
            max_drawdown = 0

        # Profit factor
        total_profit = winning_trades['pnl'].sum() if len(winning_trades) > 0 else 0
        total_loss = abs(trades_df[trades_df['pnl'] < 0]['pnl'].sum())
        profit_factor = total_profit / total_loss if total_loss > 0 else 0

        return {
            'initial_capital': self.initial_capital,
            'final_capital': final_capital,
            'total_return': total_return,
            'total_trades': total_trades,
            'winning_trades': len(winning_trades),
            'losing_trades': total_trades - len(winning_trades),
            'win_rate': win_rate,
            'avg_return': avg_return,
            'avg_win': avg_win,
            'avg_loss': avg_loss,
            'sharpe_ratio': sharpe_ratio,
            'max_drawdown': max_drawdown,
            'profit_factor': profit_factor
        }

    def plot_results(self, output_dir: str = 'backtest_results'):
        """Plot backtesting results.

        Args:
            output_dir: Directory to save plots
        """
        os.makedirs(output_dir, exist_ok=True)

        if not self.equity_curve:
            logger.warning("No equity curve to plot")
            return

        equity_df = pd.DataFrame(self.equity_curve)

        # Create figure with subplots
        fig, axes = plt.subplots(3, 1, figsize=(14, 10))

        # Equity curve
        axes[0].plot(equity_df['timestamp'], equity_df['equity'], linewidth=2)
        axes[0].axhline(y=self.initial_capital, color='r', linestyle='--', label='Initial Capital')
        axes[0].set_title('Equity Curve', fontsize=14, fontweight='bold')
        axes[0].set_ylabel('Equity ($)')
        axes[0].legend()
        axes[0].grid(True, alpha=0.3)

        # Drawdown
        equity_df['cummax'] = equity_df['equity'].cummax()
        equity_df['drawdown'] = (equity_df['equity'] - equity_df['cummax']) / equity_df['cummax'] * 100
        axes[1].fill_between(equity_df['timestamp'], equity_df['drawdown'], 0, color='red', alpha=0.3)
        axes[1].set_title('Drawdown', fontsize=14, fontweight='bold')
        axes[1].set_ylabel('Drawdown (%)')
        axes[1].grid(True, alpha=0.3)

        # Trade distribution
        if self.trades:
            trades_df = pd.DataFrame(self.trades)
            axes[2].hist(trades_df['return'] * 100, bins=50, edgecolor='black', alpha=0.7)
            axes[2].axvline(x=0, color='r', linestyle='--', linewidth=2)
            axes[2].set_title('Trade Returns Distribution', fontsize=14, fontweight='bold')
            axes[2].set_xlabel('Return (%)')
            axes[2].set_ylabel('Frequency')
            axes[2].grid(True, alpha=0.3)

        plt.tight_layout()
        plt.savefig(os.path.join(output_dir, 'backtest_results.png'), dpi=300, bbox_inches='tight')
        logger.info(f"Saved backtest plot to {output_dir}/backtest_results.png")
        plt.close()

    def export_results(self, output_dir: str = 'backtest_results'):
        """Export backtest results to files.

        Args:
            output_dir: Directory to save results
        """
        os.makedirs(output_dir, exist_ok=True)

        # Export trades
        if self.trades:
            trades_df = pd.DataFrame(self.trades)
            trades_df.to_csv(os.path.join(output_dir, 'trades.csv'), index=False)
            logger.info(f"Saved trades to {output_dir}/trades.csv")

        # Export equity curve
        if self.equity_curve:
            equity_df = pd.DataFrame(self.equity_curve)
            equity_df.to_csv(os.path.join(output_dir, 'equity_curve.csv'), index=False)
            logger.info(f"Saved equity curve to {output_dir}/equity_curve.csv")

        # Export metrics
        import json
        metrics_file = os.path.join(output_dir, 'metrics.json')
        with open(metrics_file, 'w') as f:
            json.dump({k: float(v) if isinstance(v, (np.floating, np.integer)) else v
                      for k, v in self.metrics.items()}, f, indent=2)
        logger.info(f"Saved metrics to {metrics_file}")

    def get_summary(self) -> str:
        """Get a summary of backtest results.

        Returns:
            Summary string
        """
        if not self.metrics:
            return "No backtest results available"

        summary = f"""
        ========================================
        BACKTEST RESULTS SUMMARY
        ========================================
        Initial Capital:    ${self.metrics['initial_capital']:,.2f}
        Final Capital:      ${self.metrics['final_capital']:,.2f}
        Total Return:       {self.metrics['total_return']:.2%}

        Total Trades:       {self.metrics['total_trades']}
        Winning Trades:     {self.metrics['winning_trades']}
        Losing Trades:      {self.metrics['losing_trades']}
        Win Rate:           {self.metrics['win_rate']:.2%}

        Average Return:     {self.metrics['avg_return']:.2%}
        Average Win:        {self.metrics['avg_win']:.2%}
        Average Loss:       {self.metrics['avg_loss']:.2%}

        Sharpe Ratio:       {self.metrics['sharpe_ratio']:.2f}
        Max Drawdown:       {self.metrics['max_drawdown']:.2%}
        Profit Factor:      {self.metrics['profit_factor']:.2f}
        ========================================
        """

        return summary
