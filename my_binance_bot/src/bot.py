import os
import logging
from binance import Client
from binance.client import BinanceAPIException

# --- Configure Structured Logging ---
# This setup logs to both the console and the required 'bot.log' file
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("bot.log"),
        logging.StreamHandler()
    ]
)

class BasicBot:
    def __init__(self):
        api_key = os.getenv('BINANCE_API_KEY')
        api_secret = os.getenv('BINANCE_API_SECRET')

        if not api_key or not api_secret:
            logging.error("CRITICAL: API keys not found. Please set environment variables.")
            raise ValueError("API keys not set.")

        self.client = Client(api_key, api_secret, testnet=True)
        self.client.API_URL = 'https://testnet.binancefuture.com/fapi'
        logging.info("Bot initialized and connected to Binance Futures Testnet.")

    def validate_inputs(self, symbol, quantity):
        """Validates symbol format and positive quantity."""
        if not symbol or not symbol.endswith('USDT'):
            logging.error(f"Validation Error: Invalid symbol format '{symbol}'. Must be a USDT pair.")
            return False
        if quantity <= 0:
            logging.error(f"Validation Error: Quantity must be positive, but got {quantity}.")
            return False
        return True

    def place_market_order(self, symbol, side, quantity):
        """Places a market order with validation and error handling."""
        if not self.validate_inputs(symbol, quantity):
            return None

        logging.info(f"Attempting to place MARKET {side} order for {quantity} {symbol}...")
        try:
            order = self.client.futures_create_order(
                symbol=symbol,
                side=side.upper(),
                type='MARKET',
                quantity=quantity
            )
            logging.info(f"SUCCESS: Market order placed. Details: {order}")
            print(f"Successfully placed MARKET {side} order for {quantity} {symbol}.")
            return order
        except BinanceAPIException as e:
            logging.error(f"API Error placing market order: {e}")
            print(f"API Error: {e}")
            return None
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            print(f"An unexpected error occurred: {e}")
            return None

    def place_limit_order(self, symbol, side, quantity, price):
        """Places a limit order with validation and error handling."""
        if not self.validate_inputs(symbol, quantity) or price <= 0:
            if price <= 0: logging.error(f"Validation Error: Price must be positive, but got {price}.")
            return None

        logging.info(f"Attempting to place LIMIT {side} order for {quantity} {symbol} at price {price}...")
        try:
            order = self.client.futures_create_order(
                symbol=symbol,
                side=side.upper(),
                type='LIMIT',
                timeInForce='GTC',  # Good 'Til Canceled
                quantity=quantity,
                price=price
            )
            logging.info(f"SUCCESS: Limit order placed. Details: {order}")
            print(f"Successfully placed LIMIT {side} order for {quantity} {symbol} at {price}.")
            return order
        except BinanceAPIException as e:
            logging.error(f"API Error placing limit order: {e}")
            print(f"API Error: {e}")
            return None
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            print(f"An unexpected error occurred: {e}")
            return None
        # This is a new method to add to the BasicBot class in src/bot.py
    def place_stop_limit_order(self, symbol, side, quantity, price, stop_price):
        """Places a stop-limit order."""
        if not self.validate_inputs(symbol, quantity) or price <= 0 or stop_price <= 0:
            if price <= 0: logging.error(f"Validation Error: Limit price must be positive, but got {price}.")
            if stop_price <= 0: logging.error(f"Validation Error: Stop price must be positive, but got {stop_price}.")
            return None

        logging.info(f"Attempting to place STOP_LIMIT {side} order for {quantity} {symbol} with stop price {stop_price} and limit price {price}...")
        try:
            order = self.client.futures_create_order(
                symbol=symbol,
                side=side.upper(),
                type='STOP',
                timeInForce='GTC',
                quantity=quantity,
                price=price,
                stopPrice=stop_price
            )
            logging.info(f"SUCCESS: Stop-Limit order placed. Details: {order}")
            print(f"Successfully placed STOP_LIMIT {side} order for {quantity} {symbol}.")
            return order
        except BinanceAPIException as e:
            logging.error(f"API Error placing stop-limit order: {e}")
            print(f"API Error: {e}")
            return None
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            print(f"An unexpected error occurred: {e}")
            return None
