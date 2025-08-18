# Binance Futures CLI Trading Bot

This project is a command-line interface (CLI) trading bot for the Binance USDT-M Futures Testnet, developed as part of the Junior Python Developer application.

## Features

-   Place Market Orders
-   Place Limit Orders
-   Place Stop-Limit Orders (Advanced)
-   Structured logging of all actions, successes, and errors to `bot.log`.
-   Input validation for symbols, quantities, and prices.

## Setup and Installation

### 1. Prerequisites

-   Python 3.8+
-   `pip` package manager

### 2. Clone the Repository

```bash
git clone <your-github-repo-link>
cd your_name-binance-bot
```

### 3. Install Dependencies

Install the required Python library from the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

### [cite_start]4. API Key Setup [cite: 52]

This bot requires Binance Testnet API keys to function.

1.  Generate your API Key and Secret from the [Binance Futures Testnet](https://testnet.binancefuture.com).
2.  Set them as environment variables in your terminal:

    ```bash
    # On macOS/Linux
    export BINANCE_API_KEY="your_api_key_here"
    export BINANCE_API_SECRET="your_secret_key_here"

    # On Windows
    set BINANCE_API_KEY="your_api_key_here"
    set BINANCE_API_SECRET="your_secret_key_here"
    ```

## Usage

All commands should be run from the root directory of the project.

### [cite_start]Place a Market Order [cite: 53]

```bash
python src/market_orders.py <SYMBOL> <SIDE> <QUANTITY>
# Example:
python src/market_orders.py BTCUSDT BUY 0.001
```

### Place a Limit Order

```bash
python src/limit_orders.py <SYMBOL> <SIDE> <QUANTITY> <PRICE>
# Example:
python src/limit_orders.py BTCUSDT SELL 0.001 50000
```

### Place a Stop-Limit Order

```bash
python src/advanced/stop_limit.py <SYMBOL> <SIDE> <QUANTITY> <PRICE> <STOP_PRICE>
# Example:
python src/advanced/stop_limit.py BTCUSDT SELL 0.001 48000 48100
```