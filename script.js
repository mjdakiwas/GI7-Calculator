let userInput = '';
const calculator = document.getElementById('calculator')
const inputDisplay = document.getElementById('relay-input');
const buttons = document.querySelectorAll('button');
const topInputDisplay = document.getElementById('prev-input');
const darkModeBtn = document.getElementById('dark-mode');
const lightModeBtn = document.getElementById('light-mode');
const allElements = document.querySelectorAll('*');

// aesthetic choice of toggling between light mode and dark mode
darkModeBtn.addEventListener('click', () => {
    toggleVisibility(darkModeBtn);
    toggleVisibility(lightModeBtn);
    allElements.forEach(element => {
        element.classList.add('dark-mode');
    })
})

lightModeBtn.addEventListener('click', () => {
    toggleVisibility(lightModeBtn);
    toggleVisibility(darkModeBtn);
    allElements.forEach(element => {
        element.classList.remove('dark-mode');
    })})

function toggleVisibility(element) {
    element.classList.toggle('hide');
}

// setting rule of operation
let operands = ['*', '/', '+', '-'];
let resultDisplayed = false; // flag to see if result is shown in the input display
// used for altering screen display of current input and previous input

// keyboard input control
document.addEventListener('keydown', (event) => {
    if (event.key === 'C') {
        userInput = '';
        inputDisplay.textContent = '';
        topInputDisplay.textContent = '';
        return;
    }
    if (event.key === 'Backspace') {
        userInput = userInput.slice(0, -1); // only keep elements minus last
        console.log(userInput);
        inputDisplay.textContent = userInput;
        return;
    }
    if (event.key === 'Enter' || event.key === '=') {
        result = String(calculate(inputArrange))
        inputDisplay.textContent = result;
        inputOperands = [];
        inputNums = [];
        previousResultDisplay = result; // save previously displayed result
        resultDisplayed = true; // result is currently shown => run if statement that clear out result when new input starts
        return;
    }

    if (resultDisplayed) {
        topInputDisplay.innerText = previousResultDisplay; // displaying previously displayed result
        inputDisplay.textContent = ''; // clearing out input display to show new input
        userInput = '';
        resultDisplayed = false;
    }

    for (const button of buttons) { // preventing user from inputting any keys that's not a button option
        inputDisplay.scrollLeft = inputDisplay.scrollWidth;
        if (['=', 'C', 'clear', 'backspace'].includes(button.innerText)) {continue};

        if (operands.includes(userInput.slice(-1)) && event.key === '-') {
            // operand inputted is '-' after an operand, therefore it will be calculated as negation so it can be appended
            userInput += '-';
            inputDisplay.textContent += '-';
            console.log(button.innerText);
            return;
        } 

        if (operands.includes(userInput.slice(-1)) && operands.includes(event.key)) {
            // if prev input (last key) is an operand and current input (current key) is an operand, don't add current key
                return;
        }  

        if (event.key === '.') {
            if (!checkingPeriod()) {
                return;
            }
        }

        if (event.key === button.innerText) { // if keyboard key clicked is a clickable button (a button option), then display --> links keyboard key with buttons
            console.log(button.innerText);
            userInput += button.innerText;
            inputDisplay.textContent += button.innerText;
            return;
            // inputDisplay.animate([
            //     {opacity: .5},
            //     {opacity: 1}
            // ], {
            //     duration: 200,
            //     easing: 'ease-in',
            //     fill: 'forwards'
            // });
        }
    }
})

// function checks if period is present in last number input
function checkingPeriod() {
    // finding last index of all operators and taking the max/largest operator index --> largest index means most recent operator inputted
    const lastOperandIndex = Math.max(...operands.map(operand => userInput.lastIndexOf(operand)));
    // getting the last num value (the value after the last operator)
    const currentNumber = userInput.slice(lastOperandIndex + 1);
    // checking if that value has a period
    return !currentNumber.includes('.'); 
    // if currentNumber.includes('.') returns true, means currentNumber has a period, 
    // so adding ! means that returns false (no period) -> can't add another period, and vice versa
}

// control for clicking buttons
// has same/similar logic as keyboard key control
for (const button of buttons) { // adding click event listener to buttons to display input
    button.addEventListener('click', () => {
        console.log(`${button.value} clicked`);
        inputDisplay.scrollLeft = inputDisplay.scrollWidth;

        if (button.value === 'clear') {
            userInput = '';
            inputDisplay.innerHTML = '';
            topInputDisplay.innerHTML = '';
            resultDisplayed = false;
            return;
        }
        if (button.value === 'backspace') {
            // console.log('backspace clicked');
            userInput = userInput.slice(0, -1); // only keep elements minus last
            console.log(userInput);
            inputDisplay.textContent = userInput;
            return;
        }          
        if (button.value === '=') {
            result = String(calculate(inputArrange))
            inputDisplay.textContent = result;
            inputOperands = [];
            inputNums = [];
            previousResultDisplay = result; // save previously displayed result
            resultDisplayed = true; // result is currently shown => run if statement that clear out result when new input starts
            return;
        }
        if (button.value === '.') {
            if (!checkingPeriod()) {
                return;
            }
        }

        if (resultDisplayed) { // if result is displayed and button clicked is not any of the special case values
            topInputDisplay.textContent = previousResultDisplay; // move result to top
            userInput = ''; // clear user input
            inputDisplay.textContent = ''; // clear input display
            resultDisplayed = false;
        }

        if (operands.includes(userInput.slice(-1)) && button.innerText === '-') {
            // operand inputted is '-' after an operand, therefore it will be calculated as negation so it can be appended
            userInput += '-';
            inputDisplay.textContent += '-';
            console.log(button.innerText);
            return;
        } 

        if (operands.includes(userInput.slice(-1)) && operands.includes(button.innerText)) {
            // if prev input (last key) is an operand and current input (current key) is an operand, don't add current key
                return;
        }  

        if (button.innerText === '.') {
            if (userInput.includes('.')) {
                // if a period already exist in the input, don't add period; unless operand is added and new num is added
                // add period only if operand is added when a period is already present in the input after period
                const operandExistAfterPeriod = checkingElementsAfterPeriod();
                if (!operandExistAfterPeriod) { // no operand after period -> don't append period
                    return;
                }
            }
        }

        userInput += button.innerText;
        inputDisplay.textContent += button.innerText;
    })
}

// arranges user input into an array of operands and an array of numbers
function inputArrange() {
    let inputOperands = []; // storing input operands
    let inputNums = []; // storing input nums

    let num = '';
    for (let i = 0; i < userInput.length; i++) {
        const inputChar = userInput[i];
        if (operands.includes(inputChar)) {
            // checking if iteration is an operand
            if (inputChar === '-' && (i === 0 || operands.includes(userInput[i - 1]))) {
                // checking if iteration is a negative number
                // determines if negative number if '-' symbol is at the beginning of the input or follows directly after an operand
                console.log(inputChar);
                num += inputChar; // iteration is negation; adding negation symbol '-'
            } else {
                // char isn't negation
                if (num != '') {
                    inputNums.push(num);
                    num = '';
                }
                inputOperands.push(inputChar);
            }
        } else {
            // char not an operand -> regular number
            num += inputChar;
        }
    }
    
    if (num !== '') {
        // num isn't empty meaning negation symbol added => number is negative
        inputNums.push(num); // pushing number into
    }
    console.log('finished arranging');
    console.log(inputOperands);
    console.log(inputNums);
    return { inputOperands, inputNums };
}

// function calculating numbers and operands based on arranged arrays
function calculate(callback) {
    console.log('calculating');
    let result;
    const { inputOperands, inputNums } = callback();
    
    for (let j = 0; j < operands.length; j++) { 
        // looping through operands based on operation priority
        console.log(`looping through priority ${operands[j]} operand`);
        if (inputOperands.length == 0 && inputNums.length > 0) {
            console.log(inputOperands.length);
            console.log(inputNums.length);
            // returns input if no operands found but user inputted a number
            result = inputNums[0];
        }

        let i = 0;
        while (i < inputOperands.length) {
            console.log(`currently checking if ${inputOperands[i]} = ${operands[j]}`);
            if (inputOperands[i] === operands[j]) {
                console.log(`${inputOperands[i]} = ${operands[j]}; starting calculation`);
                const leftOfOperand = parseFloat(inputNums[i]);
                const rightOfOperand = parseFloat(inputNums[i + 1]);

                // calculating is priority operand is found in input operand --> allows operation to be executed in order
                switch (inputOperands[i]) {
                    case '*':
                        result = leftOfOperand * rightOfOperand;
                        break;
                    case '/':
                        if (rightOfOperand === 0) {
                            return 'undefined';
                        }
                        result = leftOfOperand / rightOfOperand;
                        break;
                    case '+':
                        result = leftOfOperand + rightOfOperand;
                        break;
                    case '-':
                        result = leftOfOperand - rightOfOperand;
                        break;
                }

                // removing operands and numbers already calculated so when iterated again, they won't count in next calculation
                inputOperands.splice(i, 1);
                inputNums.splice(i, 2, String(result)); // however appending back result so that it can calculated on along with the remainding operands and numbers
            } else {
                i++
                console.log(`${inputOperands[i]} =! ${operands[j]}; skipping ${operands[j]} to look for next priority operand in inputOperands`);
            }
        }
        console.log(`loop of ${operands[j]} finished`);
        console.log(`result of finished loop: ${result}`);
    }
    // last input is the last result added into the inputNums array
    return inputNums[0];
}