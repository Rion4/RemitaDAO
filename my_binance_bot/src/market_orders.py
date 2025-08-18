import argparse
from bot import BasicBot

def main():
    parser = argparse.ArgumentParser(description='Place a market order on Binance Futures.')
    parser.add_argument('symbol', type=str, help='The trading symbol (e.g., BTCUSDT)')
    parser.add_argument('side', type=str, choices=['BUY', 'SELL'], help='Order side: BUY or SELL')
    parser.add_argument('quantity', type=float, help='The quantity to trade')
    args = parser.parse_args()

    try:
        bot = BasicBot()
        bot.place_market_order(args.symbol, args.side, args.quantity)
    except ValueError as e:
        print(f"Initialization Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()