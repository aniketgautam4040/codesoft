
        let currentOperand = '0';
        let previousOperand = '';
        let operation = null;
        let shouldResetScreen = false;

        const currentOperandElement = document.getElementById('current-operand');
        const previousOperandElement = document.getElementById('previous-operand');

        function updateDisplay() {
            currentOperandElement.textContent = currentOperand;
            previousOperandElement.textContent = previousOperand;
        }

        function appendNumber(number) {
            if (currentOperand === '0' || shouldResetScreen) {
                currentOperand = number;
                shouldResetScreen = false;
            } else {
                // Prevent multiple decimal points
                if (number === '.' && currentOperand.includes('.')) return;
                currentOperand += number;
            }
            updateDisplay();
        }

        function appendOperator(op) {
            if (currentOperand === '0' && previousOperand === '') return;
            
            if (operation !== null) {
                calculate();
            }
            
            operation = op;
            previousOperand = `${currentOperand} ${op}`;
            shouldResetScreen = true;
            updateDisplay();
        }

        function calculate() {
            if (operation === null || shouldResetScreen) return;
            
            const current = parseFloat(currentOperand);
            const previous = parseFloat(previousOperand.split(' ')[0]);
            let result;
            
            switch (operation) {
                case '+':
                    result = previous + current;
                    break;
                case '-':
                    result = previous - current;
                    break;
                case '×':
                    result = previous * current;
                    break;
                case '÷':
                    if (current === 0) {
                        result = 'Error';
                    } else {
                        result = previous / current;
                    }
                    break;
                default:
                    return;
            }
            
            // Format the result
            if (result !== 'Error') {
                result = Math.round(result * 10000) / 10000; // Round to 4 decimal places
            }
            
            currentOperand = result.toString();
            operation = null;
            previousOperand = '';
            shouldResetScreen = true;
            updateDisplay();
        }

        function clearAll() {
            currentOperand = '0';
            previousOperand = '';
            operation = null;
            shouldResetScreen = false;
            updateDisplay();
        }

        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (/[0-9]/.test(event.key)) {
                appendNumber(event.key);
            } else if (event.key === '.') {
                appendNumber('.');
            } else if (event.key === '+') {
                appendOperator('+');
            } else if (event.key === '-') {
                appendOperator('-');
            } else if (event.key === '*') {
                appendOperator('×');
            } else if (event.key === '/') {
                event.preventDefault();
                appendOperator('÷');
            } else if (event.key === 'Enter' || event.key === '=') {
                event.preventDefault();
                calculate();
            } else if (event.key === 'Escape' || event.key === 'Delete') {
                clearAll();
            } else if (event.key === 'Backspace') {
                if (currentOperand.length > 1) {
                    currentOperand = currentOperand.slice(0, -1);
                } else {
                    currentOperand = '0';
                }
                updateDisplay();
            }
        });

        // Initialize display
        updateDisplay();
