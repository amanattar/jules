from flask import Flask, render_template, request, jsonify
from src.calculator import Calculator

app = Flask(__name__)
calculator = Calculator()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    operation = data.get('operation')
    result = None
    error = None

    try:
        if operation == 'add':
            result = calculator.add(data['a'], data['b'])
        elif operation == 'subtract':
            result = calculator.subtract(data['a'], data['b'])
        elif operation == 'multiply':
            result = calculator.multiply(data['a'], data['b'])
        elif operation == 'divide':
            result = calculator.divide(data['a'], data['b'])
        elif operation == 'add_gst':
            result = calculator.add_gst(data['amount'], data['rate'])
        else:
            error = 'Invalid operation'
    except (ValueError, KeyError) as e:
        error = str(e)

    if error:
        return jsonify({'error': error}), 400
    else:
        return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
