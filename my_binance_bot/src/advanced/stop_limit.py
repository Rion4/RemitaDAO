import argparse
import sys
import os

# Add the project's root directory to the Python path to allow importing from 'src'
from ..bot import BasicBot

def main():
    parser = argparse.ArgumentParser(description='Place a stop-limit order on Binance Futures.')
    parser.add_argument('symbol', type=str, help='The trading symbol (e.g., BTCUSDT)')
    parser.add_argument('side', type=str, choices=['BUY', 'SELL'], help='Order side: BUY or SELL')
    parser.add_argument('quantity', type=float, help='The quantity to trade')
    parser.add_argument('price', type=float, help='The limit price to be executed after stop price is triggered')
    parser.add_argument('stop_price', type=float, help='The price that triggers the limit order')
    args = parser.parse_args()

    try:
        bot = BasicBot()
        bot.place_stop_limit_order(args.symbol, args.side, args.quantity, args.price, args.stop_price)
    except ValueError as e:
        print(f"Initialization Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()