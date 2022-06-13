const calculator = document.querySelector('.calculator');
const resultDisplay = calculator.querySelector('#topDisplay');
const newNumberDisplay = calculator.querySelector('#secondNumberDisplay');
const operatorDisplay = calculator.querySelector('#operatorDisplay');
const operatorSymbolToWord = {
    '+' : "add",
    '-' : "subtract",
    '/' : "divide",
    '*' : "multiply",
    'n√x': "root",
    "xn" : "exponent",
};

resultDisplay.innerText = "";
//add listeners to buttons for click
const buttons = calculator.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click', buttonPress));

window.addEventListener('keydown', keyPress);
let storedOperator = "";

//need to 1) check button for type
// 2) if it's a number, add it to the current number
// 3) if it's an operator ( and we don't already have another active
// operator, then move on to the next number)
function buttonPress(event) {
    
    const buttonType = event.target.getAttribute('btnType');
    if (buttonType == "number") {
        numberPress(event.target.id);
    } else if (buttonType == "operator") {
        operatorPress(event.target.innerText);
    } else if (event.target.id == "decimal") {
        decimalPress()
    } else if (event.target.id == "ac") {
        clear();
    } else if (event.target.id == "delete") {
        undo();
    } else if (event.target.id == "equals") {
        if (storedOperator !== "") {
            evaluateCalculation();
            storedOperator = "";
        }
    } else {
        return;
    }
}

function keyPress(event) {

    if (event.keyCode >= 48 && event.keyCode <= 57) {
        if (event.keyCode === 56) {
            if (event.key === '*') {
                operatorPress('*');
            } else {
                numberPress(event.key);
            }
        } else {
            numberPress(event.key);
        }
    } else if (keyIsOperator(event.key) && event.key !== '*') {
        operatorPress(event.key);
    } else if (event.key === '.') {
        decimalPress()
    } else if (event.key === 'Backspace') {
        undo();
    } else if (event.key === '=' || event.key === 'Enter') {
        if (storedOperator !== "") {
            evaluateCalculation();
            storedOperator = "";
        }
    } else {
        return;
    }
}

function numberPress(number) {
    
    const floatNumber = parseFloat(newNumberDisplay.innerText ? newNumberDisplay.innerText : 0);
    console.log(floatNumber);
    if (newNumberDisplay.innerText.includes('.')) {
        newNumberDisplay.innerText += number;
    } else {
        newNumberDisplay.innerText = parseFloat(floatNumber + number);
    }
}

function operatorPress(operator) {
    // check whether we've entered any number, one number,
    // or if we've already entered two numbers and an operator
    //operator is a symbol (+,-,/,*)
    if (storedOperator === "") {
        if (newNumberDisplay.innerText !== "") {
            resultDisplay.innerText = newNumberDisplay.innerText;
            newNumberDisplay.innerText = "";
        }

    } else {
        if (newNumberDisplay.innerText !== "") {
            evaluateCalculation();
        }
    }

    operatorDisplay.innerText = operator;
    console.log(operator);
    //convert symbol to word equivalent
    storedOperator = operatorSymbolToWord[operator]; 
}

function evaluateCalculation() {
    //need to add a check for when we press multiple operators
    //in a row instead of pressing equals.
    const number2 = parseFloat(newNumberDisplay.innerText);
    const number1 = parseFloat(resultDisplay.innerText);
    const operator = storedOperator;
    storedOperator = "";
    let answer;
    console.log(`${number1} ${operator} ${number2}`);

    if (operator == "add") {
        answer = number1 + number2;

    } else if (operator == "subtract") {
        answer = number1 - number2;

    } else if (operator == "divide") {
        if (number2 === 0) {
            alert("Oh you think you're slick? no dividing by zero!");
            answer = number1 / 1;
        } else {
            answer = number1 / number2; 
        }
        
    } else if (operator == "multiply") {
        answer = number1 * number2;

    } else if (operator == "exponent") {
        answer = number1 ** number2;     

    } else if (operator == "root") {
        answer = number1 ** (1 / number2); 
    }

    resultDisplay.innerText = calculatorFormat(answer);
    newNumberDisplay.innerText = "";
    operatorDisplay.innerText = "";
}

function undo() {
    if (newNumberDisplay.innerText.length === 0) {
        newNumberDisplay.innerText = "";
    } else {
        newNumberDisplay.innerText = newNumberDisplay.innerText.slice(0, -1);
    }
}

function clear() {
    resultDisplay.innerText = "";
    newNumberDisplay.innerText = "";
    operatorDisplay.innerText = "";
    storedOperator = "";
}

function keyIsOperator(key){
    //'/' is 191, 106 '*' is 106, '+' is 107
    // '-' is 109
    const operatorCodes = ['+', '-', '/', '*'];
    return operatorCodes.includes(key);
}

function decimalPress() {
    if (newNumberDisplay.innerText.includes('.')) {
        return;
    } else {
        newNumberDisplay.textContent += '.';
    }
}

function calculatorFormat(floatNumber) {
    //a total of 9 digits can fit, so if it's great than 9,
    // use the scientific notation
    const unformattedNumber = String(floatNumber).includes('.') ? String(floatNumber) : String(floatNumber) + '.';
    let formattedNumber = unformattedNumber;

    
    if (unformattedNumber.length > 9) {
        const decimalPlace = unformattedNumber.indexOf('.') == -1 ? unformattedNumber.length - 1 : unformattedNumber.indexOf('.');
        //figure out how many indices left the decimal needs to be 
        //shifted.
        const decimalShift = decimalPlace - 1;
        //because we are reducing the length, we can fit some decimal
        // places, more precisely 9 - 4 - (the number after the e)

        const magnitudeShiftedNumber = unformattedNumber.slice(0, 1) + '.' +
            unformattedNumber.slice(2, decimalPlace) + unformattedNumber.slice(decimalPlace + 1);
        
        formattedNumber = String(magnitudeShiftedNumber).slice(0, 9-(2 + String(decimalShift).length))
            + `e${decimalShift}`;

    }
    return formattedNumber;
}
// create method that takes an operator and two numbers
// and then it runs them together (and calls the respective
// add, subtract, divide, etc. method)
//
// create delete button (removes one digit)
// create clear button (removes all numbers and operators)
//
// need variable to track value being displayed
// keep button pressed for operator we're doing (toggled selected class)
//
// need to round values to fit display
//
// make sure decimal button can only be pressed once per number