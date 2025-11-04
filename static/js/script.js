document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        const value = target.dataset.value;

        if (target.classList.contains('btn')) {
            if (value >= '0' && value <= '9' || value === '.') {
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
                updateDisplay(currentInput);
            } else if (target.classList.contains('operator')) {
                if (currentInput === '') return;
                if (previousInput !== '') {
                    calculate();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            } else if (target.id === 'equals') {
                if (currentInput === '' || previousInput === '') return;
                calculate();
            } else if (target.id === 'clear') {
                clear();
            } else if (target.id === 'gst') {
                if (currentInput === '') return;
                addGst();
            }
        }
    });

    function updateDisplay(value) {
        display.textContent = value || '0';
    }

    function clear() {
        currentInput = '';
        operator = '';
        previousInput = '';
        updateDisplay();
    }

    async function calculate() {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                operation: getOperationName(operator),
                a: parseFloat(previousInput),
                b: parseFloat(currentInput)
            })
        });

        const data = await response.json();
        if (data.error) {
            updateDisplay('Error');
        } else {
            currentInput = data.result.toString();
            updateDisplay(currentInput);
        }
        operator = '';
        previousInput = '';
    }

    async function addGst() {
        const rate = prompt("Enter GST rate (%):");
        if (rate === null || rate === '') return;

        const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                operation: 'add_gst',
                amount: parseFloat(currentInput),
                rate: parseFloat(rate)
            })
        });

        const data = await response.json();
        if (data.error) {
            updateDisplay('Error');
        } else {
            currentInput = data.result.toString();
            updateDisplay(currentInput);
        }
    }

    function getOperationName(op) {
        switch (op) {
            case '+': return 'add';
            case '-': return 'subtract';
            case '*': return 'multiply';
            case '/': return 'divide';
            default: return '';
        }
    }
});
