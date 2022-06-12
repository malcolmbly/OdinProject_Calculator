const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('#display');
display.innerText = "0";
//add listeners to buttons for click
const buttons = calculator.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click', buttonPress));

let storedNumber = 0;
let storedOperator = "";

//need to 1) check button for type
// 2) if it's a number, add it to the current number
// 3) if it's an operator ( and we don't already have another active
// operator, then move on to the next number)
function buttonPress(event) {
    
    const buttonType = event.target.getAttribute('btnType');
    if (buttonType == "number") {
        numberPress(event);
    } else if (buttonType == "operator") {
        operatorPress(event);
    } else if (event.target.id == "decimal") {
        decimalPress()
    } else if (event.target.id == "AC") {
        clear();
    } else if (event.target.id == "delete") {
        undo();
    } else if (event.target.id == "equals") {
        if (storedOperator !== "") {
            evaluateCalculation();
        }
        
    } else {
        return;
    }
}

function numberPress(event) {

    const floatNumber = parseFloat(display.innerText);
    display.innerText = parseFloat(floatNumber + event.target.id);
}

function operatorPress(event) {
    // check whether we've entered any number, one number,
    // or if we've already entered two numbers and an operator
    event.target.classList.toggle('selected');
    if (storedOperator === "") {

        storedNumber = parseFloat(display.innerText);
        display.innerText = "0";
    } else {
        event.target.classList.add('selected');
        evaluateCalculation();

    }
    storedOperator = event.target.id;
}

function evaluateCalculation() {
    //need to add a check for when we press multiple operators
    //in a row instead of pressing equals.
    const number2 = parseFloat(display.innerText);
    const number1 = storedNumber;
    const operator = storedOperator;

    calculator.querySelector('.selected').classList.toggle('selected');
    
    storedOperator = "";
    // how can I remove redundancy of so many storedOperator clears;
    if (operator == "add") {
        display.innerText = `${number1 + number2}`;
        return;

    } else if (operator == "subtract") {
        display.innerText = `${number1 - number2}`;
        return;

    } else if (operator == "divide") {
        display.innerText = `${number1 / number2}`;
        return;

    } else if (operator == "multiply") {
        display.innerText = `${number1 * number2}`;
        return;

    } else if (operator == "exponent") {
        display.innerText = `${number1 ** number2}`;
        return;

    } else if (operator == "root") {
        display.innerText = `${number1 ** (1 / number2)}`;
        return;
    }
}

function undo() {
    if (display.innerText.length === 1) {
        display.innerText = "0";
    } else {
        display.innerText = display.innerText.slice(0, -1);
    }
}

function clear() {
    display.innerText = 0;
    storedNumber = 0;
    storedOperator = "";

    //unselect selected operator buttons
    const selectedButton = calculator.querySelector('.selected');
    if (selectedButton) { selectedButton.classList.remove('selected') };
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

