const screen2 = document.querySelector('.screen2');
const screen1 = document.querySelector('.screen1');
const buttons = document.querySelectorAll('.numberContainer button');
const equals = document.querySelector('.equals');
const operators = document.querySelectorAll('.operator');
const ac = document.querySelector('.ac');
const del = document.querySelector('.del');

let currentNumber = ''; // The current number being typed
let previousNumber = ''; // The previous number before an operator
let currentOperator = ''; // The operator being used

// Handle number and decimal buttons
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.value;
        
        // Append numbers and decimals to the currentNumber
        if (!isNaN(value) || value === '.') {
            currentNumber += value;
            screen2.textContent = currentNumber; // Update screen2 with current input
        }
    });
});
    
       


// Handle operator buttons
operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        if (currentNumber === '') return; // Ignore if no number is entered yet
        currentOperator = event.target.value; // Store the operator
        previousNumber = currentNumber; // Store the current number as previous
        currentNumber = ''; // Reset current number
        screen1.textContent = `${previousNumber} ${currentOperator}`; // Show in screen1
        screen2.textContent = ''; // Clear screen2 for the next number
    });
});

     
    
   
    
   
    



