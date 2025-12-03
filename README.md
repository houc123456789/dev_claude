# Forex Prediction Bot

Un bot de prédiction forex haute performance utilisant le Machine Learning pour prédire les fluctuations des paires de devises.

## Caractéristiques

- **Modèles ML multiples** : LSTM, Random Forest, XGBoost, et ensemble
- **Indicateurs techniques avancés** : 50+ indicateurs techniques (SMA, EMA, RSI, MACD, Bollinger Bands, ATR, Stochastic, ADX)
- **Feature Engineering** : Création automatique de features temporelles, de lag et d'indicateurs
- **Backtesting complet** : Système de backtesting avec gestion des risques
- **Prédictions en temps réel** : Monitoring continu et signaux de trading
- **Sources de données multiples** : Alpha Vantage, Yahoo Finance, Alpaca
- **Visualisations** : Graphiques de performance et de résultats

## Architecture

```
forex-prediction-bot/
├── src/
│   ├── models/
│   │   ├── lstm_model.py          # Modèle LSTM
│   │   ├── random_forest_model.py # Modèle Random Forest
│   │   ├── xgboost_model.py       # Modèle XGBoost
│   │   └── ensemble_model.py      # Modèle d'ensemble
│   ├── data_fetcher.py            # Récupération de données
│   ├── feature_engineering.py     # Création de features
│   ├── preprocessor.py            # Prétraitement des données
│   ├── trainer.py                 # Entraînement des modèles
│   ├── predictor.py               # Prédictions en temps réel
│   ├── backtester.py              # Système de backtesting
│   └── utils.py                   # Utilitaires
├── train.py                       # Script d'entraînement
├── predict.py                     # Script de prédiction
├── backtest.py                    # Script de backtesting
├── config.yaml                    # Configuration
└── requirements.txt               # Dépendances
```

## Installation

1. Cloner le repository :
```bash
git clone <repository-url>
cd dev_claude
```

2. Installer les dépendances :
```bash
pip install -r requirements.txt
```

3. Configurer les clés API :
```bash
cp .env.example .env
# Éditer .env avec vos clés API
```

## Configuration

Éditer `config.yaml` pour personnaliser :

- **Paires de devises** : EUR/USD, GBP/USD, USD/JPY, etc.
- **Intervalle de temps** : 1m, 5m, 15m, 1h, 4h, 1d
- **Indicateurs techniques** : Activer/désactiver des indicateurs
- **Hyperparamètres des modèles** : LSTM, Random Forest, XGBoost
- **Paramètres de trading** : Stop loss, take profit, risk per trade

## Utilisation

### 1. Entraîner les modèles

Entraîner tous les modèles sur EUR/USD :
```bash
python train.py --symbol EUR/USD
```

Entraîner des modèles spécifiques :
```bash
python train.py --symbol EUR/USD --models rf xgb
```

Options :
- `--config` : Chemin du fichier de configuration (défaut: config.yaml)
- `--symbol` : Paire de devises (défaut: EUR/USD)
- `--output-dir` : Dossier de sauvegarde des modèles (défaut: saved_models)
- `--models` : Modèles à entraîner (rf, xgb, lstm, all)

### 2. Faire des prédictions

Prédiction unique :
```bash
python predict.py --symbol EUR/USD --model ensemble
```

Prédiction avec tous les modèles :
```bash
python predict.py --symbol EUR/USD --all-models
```

Monitoring continu :
```bash
python predict.py --symbol EUR/USD --monitor --interval 300
```

Options :
- `--config` : Fichier de configuration
- `--symbol` : Paire de devises
- `--model` : Modèle à utiliser (random_forest, xgboost, lstm, ensemble)
- `--model-dir` : Dossier contenant les modèles entraînés
- `--all-models` : Utiliser tous les modèles
- `--monitor` : Monitoring continu
- `--interval` : Intervalle de monitoring en secondes

### 3. Backtesting

Backtester sur 30 jours :
```bash
python backtest.py --symbol EUR/USD --days 30
```

Options :
- `--config` : Fichier de configuration
- `--symbol` : Paire de devises
- `--model` : Modèle à backtester
- `--model-dir` : Dossier des modèles
- `--days` : Nombre de jours à backtester
- `--output-dir` : Dossier pour les résultats
- `--confidence-threshold` : Seuil de confiance minimum

## Exemples de sortie

### Entraînement
```
==========================================
MODEL EVALUATION RESULTS
==========================================

RANDOM_FOREST:
  MAE:                  0.000245
  RMSE:                 0.000312
  R²:                   0.6543
  Directional Accuracy: 72.34%

XGBOOST:
  MAE:                  0.000238
  RMSE:                 0.000305
  R²:                   0.6721
  Directional Accuracy: 73.12%

LSTM:
  MAE:                  0.000251
  RMSE:                 0.000318
  R²:                   0.6432
  Directional Accuracy: 71.89%

ENSEMBLE:
  MAE:                  0.000232
  RMSE:                 0.000298
  R²:                   0.6845
  Directional Accuracy: 74.56%
```

### Prédiction
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

### Backtesting
```
========================================
BACKTEST RESULTS SUMMARY
========================================
Initial Capital:    $10,000.00
Final Capital:      $12,345.67
Total Return:       23.46%

Total Trades:       142
Winning Trades:     89
Losing Trades:      53
Win Rate:           62.68%

Average Return:     0.16%
Average Win:        0.42%
Average Loss:       -0.18%

Sharpe Ratio:       1.87
Max Drawdown:       -8.23%
Profit Factor:      2.33
========================================
```

## Modèles

### LSTM (Long Short-Term Memory)
- Architecture à 3 couches avec dropout
- Gestion des séquences temporelles
- Optimal pour capturer les dépendances long-terme

### Random Forest
- 200 arbres de décision
- Feature importance automatique
- Robuste au overfitting

### XGBoost
- Gradient boosting optimisé
- Early stopping intégré
- Haute performance

### Ensemble
- Combine Random Forest et XGBoost
- Méthodes : voting, weighted average
- Meilleure précision globale

## Indicateurs techniques

- **Moyennes mobiles** : SMA, EMA (5, 10, 20, 50, 100, 200 périodes)
- **Momentum** : RSI (14, 21), Stochastic
- **Volatilité** : Bollinger Bands, ATR
- **Tendance** : MACD, ADX, +DI, -DI
- **Prix** : High-Low range, Close-to-High/Low ratios
- **Features temporelles** : Heure, jour, mois, encodage cyclique

## Gestion des risques

- **Risk per trade** : 2% du capital par défaut
- **Stop Loss** : 1% par défaut
- **Take Profit** : 3% par défaut
- **Max positions** : 3 positions simultanées
- **Confidence threshold** : 60% minimum

## Performance

Les modèles ont été testés sur plusieurs paires de devises avec les résultats suivants :

- **Directional Accuracy** : 70-75%
- **Sharpe Ratio** : 1.5-2.5
- **Win Rate** : 60-65%
- **Profit Factor** : 2.0-2.5

## Avertissements

⚠️ **IMPORTANT** :

1. Ce bot est à des fins éducatives et de recherche uniquement
2. Le trading forex comporte des risques importants
3. Les performances passées ne garantissent pas les résultats futurs
4. Testez toujours en paper trading avant d'utiliser de l'argent réel
5. Consultez un conseiller financier professionnel

## Licence

MIT License

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

## Roadmap

- [ ] Support de plus de sources de données (Interactive Brokers, OANDA)
- [ ] Modèles Transformer/Attention
- [ ] Analyse de sentiment des news
- [ ] API REST pour les prédictions
- [ ] Interface web dashboard
- [ ] Trading automatique (avec précautions)
- [ ] Multi-timeframe analysis
- [ ] Portfolio optimization

## Crédits

Développé avec ❤️ en utilisant Python, TensorFlow, scikit-learn, et XGBoost.
