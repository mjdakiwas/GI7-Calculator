
// const userInput = document.getElementById('user-input');

// function getInput() {
//     inputHidden.addEventListener('input')
// }

// const num1 = document.getElementById('1').value;
// console.log(num1)
// document.addEventListener('keydown', (event) => {
//     console.log(`${event.key}`);
//     if (event.key === num1) {
//         inputResult += 1;
//         inputDisplay.append('1');
//     }
// })

// function buttonClicked(button) {
//     const clickedBtn = document.getElementById(button);
//     console.log(`${clickedBtn.id}`)
//     clickedBtn.addEventListener('click', function () {
//         console.log(`id of button clicked ${clickedBtn}`);
//     })
// }

let userInput = '';
const inputDisplay = document.getElementById('relay-input');
const buttonList = document.querySelectorAll('button');
const operations = document.getElementsByClassName('operations');
// const expression = document.getElementById('prev-input');
let operands = [];
for (let i = 0; i < operations.length; i++) {
    operands.push(operations[i].value);
}
// console.log(operands);
document.addEventListener('keydown', (event) => {
    // console.log(`${event.key}`);
    for (const button of buttonList) {
        if (event.key === button.innerText || event.shiftKey === button.innerText) {
            userInput += button.innerText;
            inputDisplay.innerText += (`${button.innerText}`); // append works too
            // running inputs when second or more operation detected
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
            // console.log('Enter clicked');
            // expression.innerHTML = inputDisplay;
            inputDisplay.innerHTML = String(calculate(sliceInput));
        }
    }
    // console.log(userInput);
})

// const operand = [];
// for (let i; i < operations.length; i++) {
//     operand.push(operations[i].value);
// }
// console.log(operations);
// console.log(operand);
let prevInput, currentInput, operation, result;

function calculate(callback) { // using callback since need sliceInput() to execute before calculate() -> calculate dependent on sliceInput
    console.log('calculating');
    const { prevInput, operation, currentInput } = callback();
    // prevInput = parseInt(callback()[0]); => removed since line above is sufficient
    // operation = callback()[1];
    // currentInput = parseInt(callback()[2]);
    // console.log(typeof (prevInput));
    // console.log(`${prevInput} ${operation} ${currentInput}`);

    // The problem here was "i" was not = to 0 and slice is not working correctly
    // for (let i = 0; i < userInput.length; i++) {
    //     console.log(userInput[i]);
    //     if (userInput[i] in operations) { 
    //         operation = userInput[i];
    //         prevInput = userInput.slice(i);
    //         nextInput = userInput.slice(-i); 
    //     }
    // }

    if (operation === '*') {
        console.log('multiplying');
        result = prevInput * currentInput;
    }
    if (operation === '/') {
        console.log('dividing');
        return prevInput / currentInput;
    }
    if (operation === '+') { // either === or .includes() works
        console.log('adding');
        return prevInput + currentInput;
    }
    if (userInput.includes('-')) {
        console.log('subtracting');
        return prevInput - currentInput;
    }

    // console.log(prevInput, operation, currentInput);
    // return (operation, currentInput, nextInput);
}

// let isOperandInInput = false;
// function operantExist() {
//     for (let i = 0; i < userInput.length; i++) {
//         console.log('slicing input');
//         // console.log(userInput[i]);
//         if (operands.includes(userInput[i])) { // cannot use in because not parsing correctly -> not detecting operand correctly
//             isOperandInInput = true;
//         } // when detecting priority operation, get input before operation index --> prevInput will have inputs and operation (loop through again to look for more operations) -- keep in mind, that to get the prevInput before operation, have to start from operation and work back
//     }
//     return isOperandInInput;
// }

function sliceInput() {
    for (let i = 0; i < userInput.length; i++) {
        console.log('slicing input');
        if (operands.includes(userInput[i])) { // cannot use in because not parsing correctly -> not detecting operand correctly
            operation = userInput[i];
            prevInput = parseInt(userInput.slice(0, i));
            currentInput = parseInt(userInput.slice(i + 1)); // getting input from the element after the operand and beyond
            // console.log(userInput[i]);
            // console.log(parseInt(userInput.slice(0, i)));
            // console.log(parseInt(userInput.slice(i + 1)));
        } // when detecting priority operation, get input before operation index --> prevInput will have inputs and operation (loop through again to look for more operations) -- keep in mind, that to get the prevInput before operation, have to start from operation and work back
    }
    return { prevInput, operation, currentInput };
}

// implementing pressing buttons
for (const button of buttonList) {
    button.addEventListener('click', function () {
        if (button.value = 'equal') {
            calculate(sliceInput);
        } 
        console.log(`${button} clicked; value: ${button.value}}`);
        userInput += button.innerText;
        inputDisplay.innerText += button.innerText;
    })
}