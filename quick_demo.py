#!/usr/bin/env python3
"""Quick demo - Train and predict without TensorFlow."""

import sys
import warnings
warnings.filterwarnings('ignore')

from src.utils import setup_logging, load_config
from src.trainer import ModelTrainer
from src.predictor import ForexPredictor

print("""
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          FOREX PREDICTION BOT v1.0 - DEMO RAPIDE           ║
║          Machine Learning-Based Forex Predictor            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
""")

# Setup logging
logger = setup_logging()

print("\n📊 Chargement de la configuration...")
config = load_config()

print("📈 Initialisation du système de prédiction...")
print("   - Paire: EUR/USD")
print("   - Modèles: Random Forest & XGBoost")
print("   - Source: Données générées (démo)")

try:
    # Initialize trainer
    trainer = ModelTrainer(config)

    print("\n🔄 Préparation des données...")
    data_splits = trainer.prepare_training_data('EUR/USD')
    print(f"   ✓ {len(data_splits['X_train'])} échantillons d'entraînement")
    print(f"   ✓ {len(data_splits['X_val'])} échantillons de validation")
    print(f"   ✓ {len(data_splits['X_test'])} échantillons de test")
    print(f"   ✓ {len(data_splits['X_train'].columns)} features créées")

    print("\n🤖 Entraînement des modèles...")

    # Train Random Forest
    print("\n   [1/2] Random Forest...")
    rf_model = trainer.train_random_forest(data_splits)

    # Train XGBoost
    print("\n   [2/2] XGBoost...")
    xgb_model = trainer.train_xgboost(data_splits)

    print("\n✅ Entraînement terminé !")

    # Evaluate
    print("\n📊 Évaluation sur les données de test...")
    eval_results = trainer.evaluate_all_models(data_splits)

    print("\n" + "="*60)
    print("RÉSULTATS D'ÉVALUATION")
    print("="*60)

    for model_name in ['random_forest', 'xgboost']:
        if model_name in eval_results:
            metrics = eval_results[model_name]
            print(f"\n{model_name.upper().replace('_', ' ')}:")
            print(f"  MAE:                  {metrics['mae']:.6f}")
            print(f"  RMSE:                 {metrics['rmse']:.6f}")
            print(f"  R²:                   {metrics['r2']:.4f}")
            print(f"  Directional Accuracy: {metrics['directional_accuracy']:.2%}")

    # Make a prediction
    print("\n" + "="*60)
    print("PRÉDICTION EXEMPLE")
    print("="*60)

    # Use the latest data point
    latest_X = data_splits['X_test'].iloc[[-1]]

    rf_pred = trainer.models['random_forest'].predict(latest_X)[0]
    xgb_pred = trainer.models['xgboost'].predict(latest_X)[0]
    ensemble_pred = (rf_pred + xgb_pred) / 2

    print(f"\nPrédictions pour EUR/USD (prochaine période):")
    print(f"  Random Forest:  {rf_pred:+.6f} ({'+' if rf_pred > 0 else ''}{'↑ BUY' if rf_pred > 0 else '↓ SELL'})")
    print(f"  XGBoost:        {xgb_pred:+.6f} ({'+' if xgb_pred > 0 else ''}{'↑ BUY' if xgb_pred > 0 else '↓ SELL'})")
    print(f"  Ensemble:       {ensemble_pred:+.6f} ({'+' if ensemble_pred > 0 else ''}{'↑ BUY' if ensemble_pred > 0 else '↓ SELL'})")

    direction = "HAUSSE ↑" if ensemble_pred > 0 else "BAISSE ↓"
    print(f"\n🎯 Signal de trading: {direction}")

    # Show top features
    print("\n" + "="*60)
    print("TOP 10 FEATURES IMPORTANTES (Random Forest)")
    print("="*60)

    importance_df = trainer.models['random_forest'].get_feature_importance(top_n=10)
    for idx, row in importance_df.iterrows():
        bar_length = int(row['importance'] * 50)
        bar = "█" * bar_length
        print(f"  {row['feature']:25s} {bar} {row['importance']:.4f}")

    print("\n" + "="*60)
    print("✅ DÉMO TERMINÉE AVEC SUCCÈS !")
    print("="*60)
    print("\n💡 Prochaines étapes:")
    print("   1. python train.py --symbol EUR/USD (entraîner avec vos données)")
    print("   2. python predict.py --symbol EUR/USD (faire des prédictions)")
    print("   3. python backtest.py --symbol EUR/USD --days 30 (backtester)")
    print("   4. python main.py (mode interactif complet)")
    print("\n")

except KeyboardInterrupt:
    print("\n\n❌ Démo interrompue par l'utilisateur")
    sys.exit(0)
except Exception as e:
    print(f"\n\n❌ Erreur: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
