# Binance Futures CLI Trading Bot

This project is a command-line interface (CLI) trading bot for the Binance USDT-M Futures Testnet, developed as a submission for the Junior Python Developer role. It demonstrates core trading functionalities, error handling, and best practices in Python development.

## Features

-   **Market Orders**: Execute trades immediately at the best available market price.
-   **Limit Orders**: Place trades that only execute at a specified price or better.
-   **Stop-Limit Orders (Advanced)**: Implement a more complex order type that places a limit order once a specific stop price is reached.
-   **Input Validation**: Ensures that user inputs like symbol format and quantity are valid before sending requests.
-   **Structured Logging**: All actions, API responses, and errors are logged with timestamps to `bot.log` for easy debugging and auditing.

---

## Setup and Installation

### 1. Prerequisites

-   Python 3.8+
-   `pip` package manager
-   A Binance Futures Testnet account

### 2. Clone the Repository

Clone this private repository to your local machine.

```bash
git clone <your-github-repo-link-here>
cd your_name-binance-bot
````

### 3\. Create and Activate a Virtual Environment

It is highly recommended to use a virtual environment to manage project dependencies.

```bash
# Create the virtual environment
python -m venv venv

# Activate it (Windows PowerShell)
.\venv\Scripts\Activate.ps1


### 4\. Install Dependencies

Install the required Python library from the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

### 5\. API Key Setup

This bot requires Binance Testnet API keys to function.

1.  Generate your API Key and Secret from the [Binance Futures Testnet](https://testnet.binancefuture.com).

2.  Set them as environment variables in your terminal. **Note: These are temporary and must be set for each new terminal session.**

    **On Windows (PowerShell):**

    ```powershell
    $env:BINANCE_API_KEY = "your_api_key_here"
    $env:BINANCE_API_SECRET = "your_secret_key_here"
    ```
-----

## Usage

All commands should be run from the root directory of the project while the virtual environment is active.

### Place a Market Order

```bash
python src/market_orders.py <SYMBOL> <SIDE> <QUANTITY>
# Example:
python src/market_orders.py BTCUSDT BUY 0.001
```

### Place a Limit Order

*Note: The notional value (quantity \* price) for BTCUSDT must be at least 100 USDT.*

```bash
python src/limit_orders.py <SYMBOL> <SIDE> <QUANTITY> <PRICE>
# Example:
python src/limit_orders.py BTCUSDT SELL 0.002 59000
```

### Place a Stop-Limit Order (Advanced)

This command places a sell order at $58,000 if the market price drops to $58,100.

```bash
python src/advanced/stop_limit.py <SYMBOL> <SIDE> <QUANTITY> <PRICE> <STOP_PRICE>
# Example:
python src/advanced/stop_limit.py BTCUSDT SELL 0.002 58000 58100
```