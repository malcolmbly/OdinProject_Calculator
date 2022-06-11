const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('#display');
//add listeners to buttons for click
const buttons = calculator.querySelectorAll('button');
buttons.forEach(addEventListener('click', buttonPress));

let displayedNumber = "";
let storedNumber = 0;
let storedOperator = "";

//need to 1) check button for type
// 2) if it's a number, add it to the current number
// 3) if it's an operator ( and we don't already have another active
// operator, then move on to the next number)
function buttonPress(event) {
    
    const buttonType = event.target.btnType;

    if (buttonType == "number") {
        numberPress(event);
    } else if (buttonType == "operator") {
        operatorPress(event);
    } else if (target.id == "decimal") {
        decimalPress()
    } else if (target.id == "AC") {
        clear();
    } else if (target.id == "delete") {
        undo();
    } else if (target.id == "equals"){
        evaluateCalculation();
    } else {
        return;
    }
}

function numberPress(event) {

    displayedNumber += event.target.id;
    display.textContent = displayedNumber;

}

function operatorPress(event) {
    // check whether we've entered any number, one number,
    // or if we've already entered two numbers and an operator
    event.target.classList.toggle('selected');
    if (storedOperator === "") {

        storedNumber = parseFloat(display.textContent);
    } else {

        evaluateCalculation();

    }
    storedOperator = event.target.id;
}

function evaluateCalculation() {

    const number2 = parseFloat(display.textContent);
    const number1 = storedNumber;

    if (storedOperator == "add") {
        display.textContent = `${number1 + number2}`;
        return;
    } else if (storedOperator == "subtract") {
        display.textContent = `${number1 - number2}`;
        return;
    } else if (storedOperator == "divide") {
        display.textContent = `${number1 / number2}`;
        return;
    } else if (storedOperator == "multiply") {
        display.textContent = `${number1 * number2}`;
        return;
    } else if (storedOperator == "exponent") {
        display.textContent = `${number1 ** number2}`;
        return;
    } else if (storedOperator == "root") {
        display.textContent = `${number1 ** (1 / number2)}`;
        return;
    }
}

function undo() {
    display.textContent = display.textContent.slice(0, -1);
}

function clear() {
    display.textContent = 0;
    storedNumber = 0;
    storedOperator = "";

    //unselect selected operator buttons
    calculator.querySelector('.selected').classList.remove('selected');
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

