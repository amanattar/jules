import argparse
from calculator import Calculator

def main():
    parser = argparse.ArgumentParser(description="A simple command-line calculator.")
    parser.add_argument("operation", choices=["add", "subtract", "multiply", "divide"], help="The operation to perform.")
    parser.add_argument("a", type=float, help="The first number.")
    parser.add_argument("b", type=float, help="The second number.")

    args = parser.parse_args()

    calculator = Calculator()

    if args.operation == "add":
        result = calculator.add(args.a, args.b)
    elif args.operation == "subtract":
        result = calculator.subtract(args.a, args.b)
    elif args.operation == "multiply":
        result = calculator.multiply(args.a, args.b)
    elif args.operation == "divide":
        try:
            result = calculator.divide(args.a, args.b)
        except ValueError as e:
            print(e)
            return

    print(f"Result: {result}")

if __name__ == "__main__":
    main()
