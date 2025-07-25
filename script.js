let userInput = '';
const inputDisplay = document.getElementById('relay-input');
const buttons = document.querySelectorAll('button');
const operations = document.getElementsByClassName('operations');
// const expression = document.getElementById('prev-input');

let operands = [];
for (let i = 0; i < operations.length; i++) {
    operands.push(operations[i].value);
}

document.addEventListener('keydown', (event) => {
    for (const button of buttons) {
        if (event.key === button.innerText || event.shiftKey === button.innerText) {
            userInput += button.innerText;
            inputDisplay.innerText += (`${button.innerText}`); // append works too
        }
        if (event.key === '(') {
            userInput += '(';
            inputDisplay.innerText += '(';
        }
        if (event.key === ')') {
            userInput += ')';
            inputDisplay.innerText += (')');
        }
        if (event.key === 'Enter') {
            inputDisplay.innerHTML = String(calculate());
        }
    }
})

let prevInput, currentInput;
function sliceInput() {
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === '*') {
            
        }
    }
}

// let containOperand = false;
// // loop through user input and split prevInput and currentInput at point of priority operation 
// // (parenthesis, exponential, multiplication, division, addition, subtraction)
// function checkingContainOperand() {
//     for (let i = 0; i < userInput.length; i++) {
//         if (userInput[i] === '*') {
//             return 
//         }
//     }
// }