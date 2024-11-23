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
buttons.forEach(button => 
    { button.addEventListener('click', (event) => {
     const value = event.target.value;
    
    
         if (!isNaN(value) || value === '.') {
            currentNumber += value                // Append numbers and decimals to the currentNumber
            screen2.textContent = currentNumber  // Update screen2 with current input
        };
    });

});
    
       


