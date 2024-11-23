// Elements
const screen2 = document.querySelector('.screen2');
const screen1 = document.querySelector('.screen1');
const buttons = document.querySelectorAll('.numberContainer button');
const equals = document.querySelector('.equals');
const operators = document.querySelectorAll('.operator');
const ac = document.querySelector('.ac');
const del = document.querySelector('.del');

// Variables
let currentNumber = ''; // The current number being typed
let previousNumber = ''; // The previous number before an operator
let currentOperator = ''; // The operator being used

// Handle number and decimal buttons
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.value;

        if ((!isNaN(value) || value === '.') && (screen2.textContent.length < 18)) {
            if (value === '.' && currentNumber.includes('.')) {
                return; // Prevent adding another decimal point
            }
            currentNumber += value;
            screen2.textContent = currentNumber; // Update screen2 with current input
        }

        // Add visual feedback
        applyVisualEffect(button);
    });
});

// Handle operator buttons
operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        if (currentNumber === '') return; // Ignore if no number is entered yet
        if (!isNaN(previousNumber) && !isNaN(currentNumber)) {
            calculate();
        }
        currentOperator = event.target.value; // Store the operator
        previousNumber = currentNumber; // Store the current number as previous
        currentNumber = ''; // Reset current number
        screen1.textContent = `${previousNumber} ${currentOperator}`; // Show in screen1
        screen2.textContent = ''; // Clear screen2 for the next number

        // Add visual feedback
        applyVisualEffect(operator);
    });
});

// Handle AC button
ac.addEventListener('click', () => {
    clearAll();
    applyVisualEffect(ac);
});

// Handle DEL button
del.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0, -1); // Remove the last character
    screen2.textContent = currentNumber;
    applyVisualEffect(del);
});

// Handle equals button
equals.addEventListener('click', () => {
    calculate();
    applyVisualEffect(equals);
});

// Keyboard functionality
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Handle number and decimal keys
    if ((!isNaN(key) || key === '.') && (screen2.textContent.length < 18)) {
        if (key === '.' && currentNumber.includes('.')) {
            return; // Prevent adding another decimal point
        }
        currentNumber += key;
        screen2.textContent = currentNumber;
    }

    // Handle operator keys
    if (['+', '-', '*', '/'].includes(key)) {
        if (currentNumber === '') return;
        if (!isNaN(previousNumber) && !isNaN(currentNumber)) {
            calculate();
        }
        currentOperator = key;
        previousNumber = currentNumber;
        currentNumber = '';
        screen1.textContent = `${previousNumber} ${currentOperator}`;
        screen2.textContent = '';
    }

    // Handle Enter key for equals
    if (key === 'Enter') {
        calculate();
    }

    // Handle Backspace for delete
    if (key === 'Backspace') {
        currentNumber = currentNumber.slice(0, -1); // Remove the last character
        screen2.textContent = currentNumber;
        applyVisualEffect(del); // Highlight the DEL button
    }

    // Handle Escape and Delete for AC
    if (key === 'Escape' || key === 'Delete') {
        clearAll();
        applyVisualEffect(ac); // Highlight the AC button
    }

    // Visual feedback for matching calculator buttons
    const button = document.querySelector(`button[value="${key}"]`);
    if (button) {
        applyVisualEffect(button);
    }
});

// Function to calculate the result
function calculate() {
    if (currentNumber === '' || previousNumber === '' || currentOperator === '') return;

    let result;
    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);
    switch (currentOperator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Nice try!';
            break;
        default:
            return;
    }

    result = parseFloat(result.toFixed(3)); // Limit to 3 decimal places
    screen1.textContent = `${previousNumber} ${currentOperator} ${currentNumber} =`;
    screen2.textContent = result;

    currentNumber = result.toString(); // Allow chaining calculations
    previousNumber = '';
    currentOperator = '';
}

// Function to clear all data (AC functionality)
function clearAll() {
    currentNumber = '';
    previousNumber = '';
    currentOperator = '';
    screen1.textContent = '';
    screen2.textContent = '';
}

// Function for visual feedback
function applyVisualEffect(button) {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 200);
}
