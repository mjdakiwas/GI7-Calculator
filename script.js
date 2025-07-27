let userInput = '';
const calculator = document.getElementById('calculator')
const inputDisplay = document.getElementById('relay-input');
const buttons = document.querySelectorAll('button');
// const operations = document.querySelectorAll('operations');
const topInputDisplay = document.getElementById('prev-input');
const darkModeBtn = document.getElementById('dark-mode');
const lightModeBtn = document.getElementById('light-mode');
const allElements = document.querySelectorAll('*');

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

let operands = ['*', '/', '+', '-'];
// for (let i = 0; i < operations.length; i++) {
//     operands.push(operations[i].value);
// }

// let containOperand = true;
let resultDisplayed = false; // flag to see if result is shown in the input display

document.addEventListener('keydown', (event) => {
    // if (result) {
    //     topInputDisplay.innerText = result;
    //     inputDisplay.innerText = '';
    // }
    // console.log(event.key);

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
        // console.log(event.key);
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
        // if (button.className == 'mode') {
        //     console.log(button.className)
        //     continue;
        // }
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
            // if (userInput.includes('.')) {
            //     // if a period already exist in the input, don't add period; unless operand is added and new num is added
            //     // add period only if operand is added when a period is already present in the input after period
            //     const operandExistAfterPeriod = checkingElementsAfterPeriod();
            //     if (!operandExistAfterPeriod) { // no operand after period -> don't append period
            //         event.preventDefault;
            //         return;
            //     }
            // }
            if (!checkingPeriod()) {
                return;
            }
        }

        if (event.key === button.innerText) { // if key clicked is a clickable button, then display
            console.log(button.innerText);
            userInput += button.innerText;
            inputDisplay.textContent += button.innerText; // append works too
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
    // if (event.key === '(') {
    //         userInput += '(';
    //         inputDisplay.innerText += '(';
    //     }
    //     if (event.key === ')') {
    //         userInput += ')';
    //         inputDisplay.innerText += (')');
    //     }
    
})

// function checkingElementsAfterPeriod() {
//     const periodIndex = userInput.indexOf('.');
//     if (periodIndex === -1) {
//         // operand not found after period
//         return false;
//     }

//     const inputAfterPeriod = userInput.slice(periodIndex + 1);
//     console.log(inputAfterPeriod);
//     for (let i = 0; i < inputAfterPeriod.length; i++) {
//         console.log(inputAfterPeriod[i]);
//         if (operands.includes(inputAfterPeriod[i])) { // element is an operand
//             return true; // operand found after period
//         }
//     }

//     return false; // default that current number already has a period, so can't add another period
// }

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
            // if (userInput.includes('.')) {
            //     // if a period already exist in the input, don't add period; unless operand is added and new num is added
            //     // add period only if operand is added when a period is already present in the input after period
            //     const operandExistAfterPeriod = checkingElementsAfterPeriod();
            //     if (!operandExistAfterPeriod) { // no operand after period -> don't append period
            //         return;
            //     }
            // }
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


function inputArrange() {
    let inputOperands = []; // storing input operands
    let inputNums = []; // storing input nums

    let num = '';
    for (let i = 0; i < userInput.length; i++) {
        const inputChar = userInput[i];

        if (operands.includes(inputChar)) {
            if (inputChar === '-' && (i === 0 || operands.includes(userInput[i - 1]))) {
                // char is negation; adding negation symbol '-'
                console.log(inputChar);
                num += inputChar;
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
        inputNums.push(num);
    }


    // this solution works for negation (i.e. -1+1 and 1+-1)
    // let num = '';
    // for (let i = 0; i < userInput.length; i++) {
    //     const inputChar = userInput[i];

    //     if (operands.includes(inputChar)) {
    //         if (inputChar === '-' && (i === 0 || operands.includes(userInput[i - 1]))) {
    //             // char is negation; adding negation symbol '-'
    //             console.log(inputChar);
    //             num += inputChar;
    //         } else {
    //             // char isn't negation
    //             if (num != '') {
    //                 inputNums.push(num);
    //                 num = '';
    //             }
    //             inputOperands.push(inputChar);
    //         }
    //         } else {
    //             // char not an operand -> regular number
    //             num += inputChar;
    //         }
    //     }
    
    // if (num !== '') {
    //     // num isn't empty meaning negation symbol added => number is negative
    //     inputNums.push(num);
    // }

    // this solution works for subtraction (i.e. 1+1-1)
    // for (let i = 0; i < userInput.length; i++) {
    //         // console.log(`${userInput[i]}`);
    //         if (operands.includes(userInput[i])) {
    //             // console.log(`pushing ${userInput[i]}`);
    //             inputOperands.push(userInput[i]);
    //         // } else {
    //         //     if (operands.includes(userInput[i - 1])) {
    //         //         console.log(`${userInput[i-1]} is an operand; taking value after it`);
    //         //         console.log(`${userInput.slice(i+1)}`);
    //         //     } else {
    //         //         console.log(`${userInput.slice(0, i)}`);
    //         //     }
    //         //     inputNums.push(userInput[i]);
    //         }
    //     }
    //     for (let j = 0; j < userInput.length; j++) {
    //         if (inputOperands.includes(userInput[j])) {
    //             // console.log(`${userInput.split(inputOperands)}`)
    //             userInput.split(userInput[j]) // splitting userInput at every operand index
    //                 .forEach((num) => {
    //                     console.log(`pushing ${num}`);
    //                     inputNums.push(num);
    //                 });
    //         }
    //         if (inputOperands.length === 0) {
    //             // user inputted a number but not an expression
    //             inputNums.push(userInput);
    //         }
    //     }


    // const isOperand = (char) => operands.includes(char); // function checking if operand contains char (parameter)

    // for (let i = 0; i < userInput.length; i++) {
    //     const char = userInput[i]; // will check current iteration of input

    //     if (isOperand(char)) {
    //         // checking if '-' is negation -- if negation symbol beginning of input or follows an operand
    //         if (char === '-' && (i === 0 || isOperand(userInput[i - 1]))) {
    //             // char is negation; adding negation symbol '-'
    //             console.log(char);
    //             num += char;
    //         } else {
    //             // char isn't negation
    //             if (num != '') {
    //                 inputNums.push(num);
    //                 num = '';
    //             }
    //             inputOperands.push(char);
    //         }
    //     } else {
    //         // char not an operand -> regular number
    //         num += char;
    //     }

    //     if (num !== '') {
    //         // num isn't empty meaning negation symbol added => number is negative
    //         inputNums.push(num);
    //     }
    // }

    
    // negativeIndex = inputOperands.indexOf('-');
    // console.log(inputOperands);
    // console.log(inputNums);
    // // console.log(inputOperands[negativeIndex]);
    // console.log(inputNums[negativeIndex]);
    // if (inputNums[negativeIndex] === '') { // if there's no number before '-' sign then it's a symbol of negation
    //     inputOperands.splice(negativeIndex, 1);
    //     console.log(`removing: ${inputNums[negativeIndex]}; appending: -${inputNums[negativeIndex + 1]}`)
    //     inputNums.splice(negativeIndex, 2, `-${inputNums[negativeIndex + 1]}`);
    // }
    console.log('finished arranging');
    console.log(inputOperands);
    console.log(inputNums);
    return { inputOperands, inputNums };
}

function calculate(callback) {
    console.log('calculating');
    let result, operandIndex;
    const { inputOperands, inputNums } = callback();
    // console.log(inputOperands);
    // console.log(inputNums);
    // console.log(inputOperands.length);
    
    for (let j = 0; j < operands.length; j++) { 
        console.log(`looping through priority ${operands[j]} operand`);
        if (inputOperands.length == 0 && inputNums.length > 0) {
                console.log(inputOperands.length);
                console.log(inputNums.length);
                // no operands but user inputted a number
                result = inputNums[0];
            }
        // for (let i = 0; i < inputOperands.length; i++) { 
        let i = 0;
        while (i < inputOperands.length) {
            // can't use for loop since it iteration messes up while modifying inputOperands
            // since can't use for loop when modifying, logic is don't modify array
            // console.log('looping through inputOperands to see if inputOperands == operands');
            console.log(`currently checking if ${inputOperands[i]} = ${operands[j]}`);
            if (inputOperands[i] === operands[j]) {
                console.log(`${inputOperands[i]} = ${operands[j]}; starting calculation`);
                // if (inputOperands[i] === '*') {
                //     console.log('multiplying');
                //     operandIndex = inputOperands.indexOf('*');
                //     result = parseFloat(inputNums[operandIndex]) * parseFloat(inputNums[operandIndex + 1]);
                //     // inputOperands.splice(operandIndex, 1);
                //     inputNums.splice(operandIndex, 2);
                //     inputNums.splice(operandIndex, 0, String(result));
                //     console.log(`${inputNums[operandIndex]} * ${inputNums[operandIndex + 1]}`)
                //     console.log(result);
                //     // console.log(inputOperands);
                //     // console.log(inputNums);
                // }
                // if (inputOperands[i] === '/') {
                //     operandIndex = inputOperands.indexOf('/');
                //     console.log(`trying to divide: ${inputNums[operandIndex]} / ${inputNums[operandIndex + 1]}`)
                //     if (inputNums[operandIndex + 1] === '0') {
                //         console.log(`${inputNums[operandIndex + 1]} = 0`);
                //         result = 'undefined';
                //     } else {
                //         console.log('dividing');
                //         result = parseFloat(inputNums[operandIndex]) / parseFloat(inputNums[operandIndex + 1]);
                //         inputNums.splice(operandIndex, 2);
                //         inputNums.splice(operandIndex, 0, String(result));
                //     }
                // }
                // if (inputOperands[i] === '+') {
                //     console.log('adding');
                //     operandIndex = inputOperands.indexOf('+');
                //     result = parseFloat(inputNums[operandIndex]) + parseFloat(inputNums[operandIndex + 1]);
                //     // let removedOperand = inputOperands.splice(operandIndex, 1); // removes operand from array of input operands since it's been accounted for
                //     inputNums.splice(operandIndex, 2); // removes numbers from array of input numbers since they've been accounted for
                //     inputNums.splice(operandIndex, 0, String(result)); // add result into array of input numbers to be calculated with
                //     console.log(`${inputNums[operandIndex]} + ${inputNums[operandIndex + 1]}`)
                //     console.log(result);
                //     // console.log(removedOperand);
                //     // console.log(removedNums);
                //     // console.log(inputOperands);
                //     // console.log(inputNums);
                // }
                // if (inputOperands[i] === '-') {
                //     console.log('subtracting');
                //     operandIndex = inputOperands.indexOf('-');
                //     result = parseFloat(inputNums[operandIndex]) - parseFloat(inputNums[operandIndex + 1]);
                //     // inputOperands.splice(operandIndex, 1);
                //     inputNums.splice(operandIndex, 2);
                //     inputNums.splice(operandIndex, 0, String(result));
                //     // console.log(removedOperand);
                //     // console.log(removedNums);
                //     console.log(inputOperands);
                //     console.log(inputNums);
                // } 

                const leftOfOperand = parseFloat(inputNums[i]);
                const rightOfOperand = parseFloat(inputNums[i + 1]);

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

                inputOperands.splice(i, 1);
                inputNums.splice(i, 2, String(result));
            } else {
                i++
                console.log(`${inputOperands[i]} =! ${operands[j]}; skipping ${operands[j]} to look for next priority operand in inputOperands`);
            }
            // console.log(inputOperands);
            // console.log(inputNums);
            // console.log(`loop of ${inputOperands[i]} finished`);
        }
        console.log(`loop of ${operands[j]} finished`);
        console.log(`result of finished loop: ${result}`);
    }
    return inputNums[0];
}

// function calculate() {
//     console.log('calculating');
//     let result, operandIndex;
//     const { inputOperands, inputNums } = inputArrange();
//     console.log(inputOperands);
//     console.log(inputNums);
//     // console.log(inputOperands.length);
    
//     for (let j = 0; j < operands.length; j++) { 
//         console.log('looping through operands');
//         let i = 0
//         while (i < inputOperands.length) { // can't use for loop since it iteration messes up while modifying inputOperands
//             console.log('looping through inputOperands to see if inputOperands == operands');
//             if (inputOperands[i] === operands[j]) {
//                 console.log(`${inputOperands[i]} = ${operands[j]}; starting calculation`);
//                 if (inputOperands[i] === '*') {
//                     console.log('multiplying');
//                     operandIndex = inputOperands.indexOf('*');
//                     result = parseFloat(inputNums[operandIndex]) * parseFloat(inputNums[operandIndex + 1]);
//                     inputOperands.splice(operandIndex, 1);
//                     inputNums.splice(operandIndex, 2);
//                     inputNums.splice(0, 0, String(result));
//                 }
//                 if (inputOperands[i] === '/') {
//                     console.log('dividing');
//                     operandIndex = inputOperands.indexOf('/');
//                     result = parseFloat(inputNums[operandIndex]) / parseFloat(inputNums[operandIndex + 1]);
//                     inputOperands.splice(operandIndex, 1);
//                     inputNums.splice(operandIndex, 2);
//                     inputNums.splice(0, 0, String(result));
//                 }
//                 if (inputOperands[i] === '+') {
//                     console.log('adding');
//                     operandIndex = inputOperands.indexOf('+');
//                     result = parseFloat(inputNums[operandIndex]) + parseFloat(inputNums[operandIndex + 1]);
//                     let removedOperand = inputOperands.splice(operandIndex, 1); // removes operand from array of input operands since it's been accounted for
//                     let removedNums = inputNums.splice(operandIndex, 2); // removes numbers from array of input numbers since they've been accounted for
//                     inputNums.splice(0, 0, String(result)); // add result into array of input numbers to be calculated with
//                     console.log(result);
//                     console.log(removedOperand);
//                     console.log(removedNums);
//                     console.log(inputOperands);
//                     console.log(inputNums);
//                 }
//                 if (inputOperands[i] === '-') {
//                     console.log('subtracting');
//                     operandIndex = inputOperands.indexOf('-');
//                     result = parseFloat(inputNums[operandIndex]) - parseFloat(inputNums[operandIndex + 1]);
//                     inputOperands.splice(operandIndex, 1);
//                     inputNums.splice(operandIndex, 2);
//                     inputNums.splice(0, 0, String(result));
//                     // console.log(removedOperand);
//                     // console.log(removedNums);
//                     console.log(inputOperands);
//                     console.log(inputNums);
//                 }
//             } else {
//                 console.log(`${inputOperands[i]} =! ${operands[j]}; skipping ${operands[j]} to look for next priority operand in inputOperands`);
//             }
//             i++;
//             // console.log(`loop of ${inputOperands[i]} finished`);
//         }
//         console.log(`loop of ${operands[j]} finished`);
//         console.log(`result of finished loop: ${result}`);
//     }
//     // checkingContainOperand(result);

//     // for (let i = 0; i < inputOperands.length; i++) {
//     //     while (containOperand === true) {
//     //         if (inputOperands[i] === '*') {
//     //             console.log('multiplying');
//     //             result = parseFloat(inputNums[i]) * parseFloat(inputNums[i + 1]);
//     //             console.log(result);
//     //         }
//     //         if (inputOperands[i] === '/') {
//     //             console.log('dividing')
//     //             result = parseFloat(inputNums[i]) / parseFloat(inputNums[i + 1]);
//     //             console.log(result);
//     //         }
//     //         if (inputOperands[i] === '+') {
//     //             console.log('adding')
//     //             result = parseFloat(inputNums[i]) + parseFloat(inputNums[i + 1]);
//     //             console.log(result);
//     //         }
//     //         if (inputOperands[i] === '-') {
//     //             console.log('subtracting')
//     //             result = parseFloat(inputNums[i]) - parseFloat(inputNums[i + 1]);
//     //             console.log(result);
//     //         }
//     //     }

//     // }
//     return result;
// }

// function checkingContainOperand(inputOperands) {
//     for (let i = 0; i < input.length; i++) {
//         if (operands.includes(input[i])) {
//             containOperand = true;
//             break;
//         } else {
//             containOperand = false;
//         }
//     }
//     return containOperand;
// }






// let prevInput, currentInput, operand, result;
// function calculate() { // using callback since need sliceInput() to execute before calculate() -> calculate dependent on sliceInput
//     console.log('calculating');
//     let { prevInput, operand, currentInput, containOperand } = sliceInput(userInput);
//     console.log(containOperand);

//     if (operand === '*') {
//         console.log('multiplying');
//         result = prevInput * currentInput;
//     }
//     if (operand === '/') {
//         console.log('dividing');
//         result = prevInput / currentInput;
//     }
//     if (operand === '+') { // either === or .includes() works
//         console.log('adding');
//         if (checkingContainOperand(prevInput) === false && checkingContainOperand(currentInput) === false) {
//             console.log('prevInput and currentInput do not have operands');
//             result = prevInput + currentInput;
//             console.log(result);
//         }
//         else if (checkingContainOperand(prevInput) === true && checkingContainOperand(currentInput) === false) {
//             console.log('prevInput has operand');
//             console.log({ prevInput, currentInput } = sliceInput(prevInput));
//             console.log(sliceInput(prevInput));
//         }
//         else if (checkingContainOperand(prevInput) === false && checkingContainOperand(currentInput) === true) {
//             console.log('currentInput has operand');
//             while (containOperand === true) {
//                 currentSplit_prevInput = sliceInput(currentInput).prevInput;
//                 currentSplit_currentInput = sliceInput(currentInput).currentInput;
//                 currentSplit_operand = sliceInput(currentInput).operand;
//                 if (currentSplit_operand == ! '+') {
//                     calculate(currentInput);
//                 } else {
//                     result = parseFloat(prevInput) + parseFloat(currentSplit_prevInput) + parseFloat(currentSplit_currentInput);
//                 }
//             }
//             console.log(prevInput);
//             // console.log(sliceInput(currentInput));
//             console.log(currentSplit_prevInput);
//             console.log(currentSplit_currentInput);
//             console.log(result);
//         }
//     }
//     if (operand === '-') {
//         console.log('subtracting');
//         result = prevInput - currentInput;
//     }



// return result;
// }

// function sliceInput(input) {
//     console.log('slicing input');
//     // console.log(containOperand);
//     for (let i = 0; i < input.length; i++) {
//         if (operands.includes(input[i])) { // cannot use in because not parsing correctly -> not detecting operand correctly
//             operand = input[i];
//             prevInput = input.slice(0, i);
//             currentInput = input.slice(i + 1); // getting input from the element after the operand and beyond
//             break; // have to break since for loop keeps running and would split at the first operation with same priority (i.e. 1+2+3 returns 1+2, +, 3 instead of 1, +, 2+3)
//         } // when detecting priority operation, get input before operation index --> prevInput will have inputs and operation (loop through again to look for more operations) -- keep in mind, that to get the prevInput before operation, have to start from operation and work back
//     }
//     console.log(`${prevInput}, ${operand}, ${currentInput}, ${containOperand}`);
//     // console.log(containOperand);
//     // console.log('slicing completed');
//     return { prevInput, operand, currentInput, containOperand };
// }
// // loop through user input and split prevInput and currentInput at point of priority operation 
// // (parenthesis, exponential, multiplication, division, addition, subtraction)
// function checkingContainOperand(input) {
//     for (let i = 0; i < input.length; i++) {
//         // console.log(input[i]);
//         if (operands.includes(input[i])) {
//             containOperand = true;
//             break;
//         } else {
//             containOperand = false;
//         }
//     }
//     return containOperand;
// }