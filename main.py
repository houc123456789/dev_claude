#!/usr/bin/env python3
"""Main entry point for Forex Prediction Bot."""

import argparse
import sys
from src.utils import setup_logging, load_config


def print_banner():
    """Print application banner."""
    banner = """
    ╔════════════════════════════════════════════════════════════╗
    ║                                                            ║
    ║          FOREX PREDICTION BOT v1.0                         ║
    ║          Machine Learning-Based Forex Predictor            ║
    ║                                                            ║
    ╚════════════════════════════════════════════════════════════╝
    """
    print(banner)


def interactive_menu():
    """Show interactive menu."""
    print_banner()

    while True:
        print("\n" + "="*60)
        print("MENU PRINCIPAL")
        print("="*60)
        print("1. Entraîner les modèles")
        print("2. Faire une prédiction")
        print("3. Monitoring continu")
        print("4. Backtesting")
        print("5. Afficher la configuration")
        print("6. Quitter")
        print("="*60)

        choice = input("\nChoisissez une option (1-6): ").strip()

        if choice == '1':
            train_models()
        elif choice == '2':
            make_prediction()
        elif choice == '3':
            monitor_continuous()
        elif choice == '4':
            run_backtest()
        elif choice == '5':
            show_config()
        elif choice == '6':
            print("\nMerci d'avoir utilisé Forex Prediction Bot!")
            sys.exit(0)
        else:
            print("\n❌ Option invalide. Veuillez choisir entre 1 et 6.")


def train_models():
    """Train models interactively."""
    print("\n" + "="*60)
    print("ENTRAÎNEMENT DES MODÈLES")
    print("="*60)

    symbol = input("Paire de devises (ex: EUR/USD): ").strip() or "EUR/USD"
    print(f"\n📊 Entraînement des modèles pour {symbol}...")

    from train import main as train_main
    sys.argv = ['train.py', '--symbol', symbol]
    train_main()

    input("\nAppuyez sur Entrée pour continuer...")


def make_prediction():
    """Make a single prediction interactively."""
    print("\n" + "="*60)
    print("PRÉDICTION")
    print("="*60)

    symbol = input("Paire de devises (ex: EUR/USD): ").strip() or "EUR/USD"

    print("\nModèles disponibles:")
    print("1. Random Forest")
    print("2. XGBoost")
    print("3. LSTM")
    print("4. Ensemble (Recommandé)")

    model_choice = input("Choisissez un modèle (1-4): ").strip()

    model_map = {
        '1': 'random_forest',
        '2': 'xgboost',
        '3': 'lstm',
        '4': 'ensemble'
    }

    model = model_map.get(model_choice, 'ensemble')

    print(f"\n🔮 Prédiction pour {symbol} avec {model}...")

    from predict import main as predict_main
    sys.argv = ['predict.py', '--symbol', symbol, '--model', model]
    predict_main()

    input("\nAppuyez sur Entrée pour continuer...")


def monitor_continuous():
    """Start continuous monitoring."""
    print("\n" + "="*60)
    print("MONITORING CONTINU")
    print("="*60)

    symbol = input("Paire de devises (ex: EUR/USD): ").strip() or "EUR/USD"
    interval = input("Intervalle en secondes (défaut: 300): ").strip() or "300"

    print(f"\n📡 Démarrage du monitoring de {symbol}...")
    print("Appuyez sur Ctrl+C pour arrêter\n")

    from predict import main as predict_main
    sys.argv = ['predict.py', '--symbol', symbol, '--monitor', '--interval', interval]
    predict_main()


def run_backtest():
    """Run backtesting interactively."""
    print("\n" + "="*60)
    print("BACKTESTING")
    print("="*60)

    symbol = input("Paire de devises (ex: EUR/USD): ").strip() or "EUR/USD"
    days = input("Nombre de jours (défaut: 30): ").strip() or "30"

    print(f"\n📈 Backtesting de {symbol} sur {days} jours...")

    from backtest import main as backtest_main
    sys.argv = ['backtest.py', '--symbol', symbol, '--days', days]
    backtest_main()

    input("\nAppuyez sur Entrée pour continuer...")


def show_config():
    """Show current configuration."""
    print("\n" + "="*60)
    print("CONFIGURATION")
    print("="*60)

    try:
        config = load_config()

        print("\n📊 Sources de données:")
        print(f"  Source: {config['data']['data_source']}")
        print(f"  Paires: {', '.join(config['data']['symbols'])}")
        print(f"  Intervalle: {config['data']['interval']}")

        print("\n🤖 Modèles:")
        print(f"  LSTM units: {config['models']['lstm']['units']}")
        print(f"  Random Forest estimators: {config['models']['random_forest']['n_estimators']}")
        print(f"  XGBoost estimators: {config['models']['xgboost']['n_estimators']}")

        print("\n💰 Gestion des risques:")
        print(f"  Capital initial: ${config['backtesting']['initial_capital']}")
        print(f"  Risk per trade: {config['backtesting']['risk_per_trade']*100}%")
        print(f"  Stop loss: {config['backtesting']['stop_loss']*100}%")
        print(f"  Take profit: {config['backtesting']['take_profit']*100}%")

    except Exception as e:
        print(f"\n❌ Erreur lors du chargement de la configuration: {e}")

    input("\nAppuyez sur Entrée pour continuer...")


def main():
    """Main function."""
    parser = argparse.ArgumentParser(description='Forex Prediction Bot')
    parser.add_argument('--interactive', action='store_true',
                       help='Run in interactive mode')
    parser.add_argument('--train', action='store_true',
                       help='Train models')
    parser.add_argument('--predict', action='store_true',
                       help='Make prediction')
    parser.add_argument('--backtest', action='store_true',
                       help='Run backtest')
    parser.add_argument('--symbol', type=str, default='EUR/USD',
                       help='Currency pair')

    args = parser.parse_args()

    # Setup logging
    logger = setup_logging()

    if args.interactive or len(sys.argv) == 1:
        # Interactive mode
        interactive_menu()
    elif args.train:
        from train import main as train_main
        sys.argv = ['train.py', '--symbol', args.symbol]
        train_main()
    elif args.predict:
        from predict import main as predict_main
        sys.argv = ['predict.py', '--symbol', args.symbol]
        predict_main()
    elif args.backtest:
        from backtest import main as backtest_main
        sys.argv = ['backtest.py', '--symbol', args.symbol]
        backtest_main()
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
