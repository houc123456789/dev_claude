# Exemples d'utilisation - Forex Prediction Bot

Ce document contient des exemples détaillés d'utilisation du bot de prédiction forex.

## Table des matières

1. [Démarrage rapide](#démarrage-rapide)
2. [Entraînement des modèles](#entraînement-des-modèles)
3. [Prédictions](#prédictions)
4. [Backtesting](#backtesting)
5. [Mode interactif](#mode-interactif)
6. [Cas d'usage avancés](#cas-dusage-avancés)

## Démarrage rapide

### Installation rapide

```bash
# Cloner et installer
git clone <repo-url>
cd dev_claude
pip install -r requirements.txt

# Configurer les clés API
cp .env.example .env
nano .env  # Ajouter vos clés API

# Lancer en mode interactif
python main.py
```

## Entraînement des modèles

### Exemple 1: Entraînement basique

```bash
# Entraîner tous les modèles sur EUR/USD
python train.py --symbol EUR/USD
```

**Sortie attendue:**
```
2025-12-03 10:30:15 - INFO - Starting forex model training
2025-12-03 10:30:16 - INFO - Fetching data for EUR/USD
2025-12-03 10:30:20 - INFO - Fetched 5000 data points
2025-12-03 10:30:25 - INFO - Created 87 features
2025-12-03 10:30:30 - INFO - Training Random Forest model
2025-12-03 10:32:45 - INFO - Training XGBoost model
2025-12-03 10:34:20 - INFO - Training LSTM model
...
```

### Exemple 2: Entraîner un modèle spécifique

```bash
# Entraîner uniquement XGBoost
python train.py --symbol GBP/USD --models xgb

# Entraîner Random Forest et LSTM
python train.py --symbol USD/JPY --models rf lstm
```

### Exemple 3: Configuration personnalisée

```bash
# Utiliser une configuration personnalisée
python train.py --symbol EUR/USD --config my_config.yaml --output-dir my_models/
```

## Prédictions

### Exemple 1: Prédiction simple

```bash
# Faire une prédiction avec le modèle ensemble
python predict.py --symbol EUR/USD --model ensemble
```

**Sortie:**
```
============================================================
TRADING SIGNAL FOR EUR/USD
============================================================

Current Price:     1.10523
Predicted Price:   1.10687
Predicted Return:  0.1484%
Direction:         UP

SIGNAL:            BUY
Confidence:        78.45%
Position Size:     0.0157
Stop Loss:         1.00%
Take Profit:       3.00%
============================================================
```

### Exemple 2: Comparer tous les modèles

```bash
# Obtenir des prédictions de tous les modèles
python predict.py --symbol EUR/USD --all-models
```

**Sortie:**
```
============================================================
PREDICTIONS FOR EUR/USD
============================================================

RANDOM_FOREST:
  Current Price:     1.10523
  Predicted Price:   1.10652
  Predicted Return:  0.1167%
  Direction:         UP
  Confidence:        70.00%

XGBOOST:
  Current Price:     1.10523
  Predicted Price:   1.10698
  Predicted Return:  0.1583%
  Direction:         UP
  Confidence:        70.00%

LSTM:
  Current Price:     1.10523
  Predicted Price:   1.10612
  Predicted Return:  0.0805%
  Direction:         UP

ENSEMBLE:
  Current Price:     1.10523
  Predicted Price:   1.10687
  Predicted Return:  0.1484%
  Direction:         UP
  Confidence:        78.45%
```

### Exemple 3: Monitoring continu

```bash
# Monitorer EUR/USD toutes les 5 minutes
python predict.py --symbol EUR/USD --monitor --interval 300
```

**Sortie:**
```
============================================================
Monitoring at 2025-12-03 10:00:00
============================================================

EUR/USD:
  Current Price: 1.10523
  Predicted Price: 1.10687
  Direction: UP
  Signal: BUY
  Confidence: 78.45%

Next update in 300 seconds...

============================================================
Monitoring at 2025-12-03 10:05:00
============================================================
...
```

### Exemple 4: Utilisation programmatique

```python
from src.utils import setup_logging, load_config
from src.predictor import ForexPredictor

# Initialiser
config = load_config()
predictor = ForexPredictor(config, 'saved_models')

# Faire une prédiction
result = predictor.predict_single('EUR/USD', 'ensemble')
print(f"Signal: {result['signal']}")
print(f"Predicted return: {result['predicted_return']:.4%}")

# Obtenir un signal de trading
signal = predictor.get_trading_signal('EUR/USD')
if signal['signal'] == 'BUY':
    print(f"Acheter avec position size: {signal['position_size']}")
```

## Backtesting

### Exemple 1: Backtest basique

```bash
# Backtester sur 30 jours
python backtest.py --symbol EUR/USD --days 30
```

**Sortie:**
```
========================================
BACKTEST RESULTS SUMMARY
========================================
Initial Capital:    $10,000.00
Final Capital:      $11,234.56
Total Return:       12.35%

Total Trades:       87
Winning Trades:     54
Losing Trades:      33
Win Rate:           62.07%

Average Return:     0.14%
Average Win:        0.38%
Average Loss:       -0.16%

Sharpe Ratio:       1.87
Max Drawdown:       -6.23%
Profit Factor:      2.18
========================================
```

### Exemple 2: Backtest avec paramètres personnalisés

```bash
# Backtest avec seuil de confiance élevé
python backtest.py --symbol EUR/USD --days 60 --confidence-threshold 0.75
```

### Exemple 3: Comparer différents modèles

```bash
# Backtester Random Forest
python backtest.py --symbol EUR/USD --model random_forest --days 30

# Backtester XGBoost
python backtest.py --symbol EUR/USD --model xgboost --days 30

# Backtester Ensemble
python backtest.py --symbol EUR/USD --model ensemble --days 30
```

### Exemple 4: Backtest programmatique

```python
from src.utils import load_config
from src.backtester import ForexBacktester
from src.predictor import ForexPredictor
import pandas as pd

# Initialiser
config = load_config()
predictor = ForexPredictor(config, 'saved_models')
backtester = ForexBacktester(config)

# Préparer les données
# ... (fetch data and create predictions)

# Lancer le backtest
results = backtester.run_backtest(predictions_df, actual_prices)

# Exporter les résultats
backtester.export_results('my_backtest_results')
backtester.plot_results('my_backtest_results')

# Afficher le résumé
print(backtester.get_summary())
```

## Mode interactif

### Lancement

```bash
# Lancer le mode interactif
python main.py

# ou simplement
python main.py --interactive
```

**Menu:**
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          FOREX PREDICTION BOT v1.0                         ║
║          Machine Learning-Based Forex Predictor            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

============================================================
MENU PRINCIPAL
============================================================
1. Entraîner les modèles
2. Faire une prédiction
3. Monitoring continu
4. Backtesting
5. Afficher la configuration
6. Quitter
============================================================

Choisissez une option (1-6):
```

## Cas d'usage avancés

### Cas 1: Trading multi-paires

```python
from src.utils import load_config
from src.predictor import ForexPredictor

config = load_config()
predictor = ForexPredictor(config, 'saved_models')

# Analyser plusieurs paires
symbols = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD']
predictions = predictor.predict_multiple(symbols, 'ensemble')

# Trouver les meilleurs signaux
buy_signals = [p for p in predictions if p['signal'] == 'BUY']
buy_signals.sort(key=lambda x: x.get('confidence', 0), reverse=True)

print("Top 3 signaux d'achat:")
for signal in buy_signals[:3]:
    print(f"{signal['symbol']}: {signal['confidence']:.2%} confidence")
```

### Cas 2: Analyse de performance par modèle

```python
import pandas as pd
from src.utils import load_config
from src.predictor import ForexPredictor

config = load_config()
predictor = ForexPredictor(config, 'saved_models')

# Comparer les performances
models = ['random_forest', 'xgboost', 'lstm', 'ensemble']
results = []

for model in models:
    backtest_result = predictor.backtest_predictions('EUR/USD', model, days=30)
    results.append({
        'Model': model,
        'MAE': backtest_result['mae'],
        'R²': backtest_result['r2'],
        'Directional Accuracy': backtest_result['directional_accuracy']
    })

df_results = pd.DataFrame(results)
print(df_results.to_string(index=False))
```

### Cas 3: Entraînement avec validation croisée

```python
from src.utils import load_config
from src.trainer import ModelTrainer
from sklearn.model_selection import TimeSeriesSplit

config = load_config()
trainer = ModelTrainer(config)

# Préparer les données
data_splits = trainer.prepare_training_data('EUR/USD')

# Validation croisée temporelle
tscv = TimeSeriesSplit(n_splits=5)
X = pd.concat([data_splits['X_train'], data_splits['X_val']])
y = pd.concat([data_splits['y_train'], data_splits['y_val']])

scores = []
for train_idx, val_idx in tscv.split(X):
    X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
    y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]

    # Entraîner et évaluer
    # ... (training code)

print(f"CV Score: {np.mean(scores):.4f} +/- {np.std(scores):.4f}")
```

### Cas 4: Optimisation des hyperparamètres

```python
from src.utils import load_config
from src.models.xgboost_model import XGBoostModel
from sklearn.model_selection import GridSearchCV

config = load_config()

# Préparer les données
# ... (data preparation)

# Grid search
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [5, 10, 15],
    'learning_rate': [0.01, 0.1, 0.3]
}

# Note: Adapter pour utiliser avec le wrapper sklearn
# ... (grid search code)
```

### Cas 5: Alertes et notifications

```python
import smtplib
from email.message import EmailMessage
from src.predictor import ForexPredictor

def send_alert(signal):
    """Envoyer une alerte email."""
    msg = EmailMessage()
    msg['Subject'] = f"Trading Alert: {signal['symbol']}"
    msg['From'] = "bot@example.com"
    msg['To'] = "trader@example.com"

    body = f"""
    Signal: {signal['signal']}
    Symbol: {signal['symbol']}
    Current Price: {signal['current_price']}
    Predicted Price: {signal['predicted_price']}
    Confidence: {signal['confidence']:.2%}
    """
    msg.set_content(body)

    # Envoyer l'email
    # ... (SMTP code)

# Monitoring avec alertes
predictor = ForexPredictor(config, 'saved_models')

while True:
    signal = predictor.get_trading_signal('EUR/USD')

    if signal['signal'] != 'HOLD' and signal['confidence'] > 0.8:
        send_alert(signal)

    time.sleep(300)
```

## Configuration avancée

### Personnaliser les indicateurs techniques

```yaml
# config.yaml
features:
  technical_indicators:
    - SMA
    - EMA
    - RSI
    - MACD
    - Bollinger_Bands
    - ATR
  window_sizes: [10, 20, 50, 100]  # Personnaliser les fenêtres
  lag_features: [1, 3, 5, 10]      # Features de lag
```

### Ajuster la gestion des risques

```yaml
# config.yaml
backtesting:
  initial_capital: 50000           # Capital plus important
  risk_per_trade: 0.01             # Risque conservateur (1%)
  stop_loss: 0.005                 # Stop loss serré (0.5%)
  take_profit: 0.02                # Take profit modéré (2%)
  max_positions: 5                 # Plus de positions simultanées
```

## Résolution de problèmes

### Problème: Manque de données

```bash
# Utiliser des données générées (pour tests)
# Les données seront automatiquement générées si l'API échoue
python train.py --symbol EUR/USD
```

### Problème: Modèles non entraînés

```bash
# Vérifier les modèles disponibles
ls -la saved_models/

# Entraîner si manquants
python train.py --symbol EUR/USD
```

### Problème: Erreur de mémoire avec LSTM

```yaml
# Réduire la taille du batch dans config.yaml
models:
  lstm:
    batch_size: 16  # Au lieu de 32
    sequence_length: 30  # Au lieu de 60
```

## Support et communauté

- Issues GitHub: [lien]
- Documentation: README.md
- Exemples: Ce fichier (USAGE_EXAMPLES.md)
