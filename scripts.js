const calculator = document.querySelector('.calculator');
const resultDisplay = calculator.querySelector('#topDisplay');
const newNumberDisplay = calculator.querySelector('#secondNumberDisplay');
const operatorDisplay = calculator.querySelector('#operatorDisplay');

resultDisplay.innerText = "0";
//add listeners to buttons for click
const buttons = calculator.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click', buttonPress));

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
    } else if (event.target.id == "ac") {
        clear();
    } else if (event.target.id == "delete") {
        undo();
    } else if (event.target.id == "equals") {
        if (storedOperator !== "") {
            evaluateCalculation();
            storedOperator = "";
            calculator.querySelector('.selected').classList.remove('selected');
        }
    } else {
        return;
    }
}

function numberPress(event) {

    const floatNumber = parseFloat(newNumberDisplay.innerText ? newNumberDisplay.innerText : 0);
    newNumberDisplay.innerText = parseFloat(floatNumber + event.target.id);
}

function operatorPress(event) {
    // check whether we've entered any number, one number,
    // or if we've already entered two numbers and an operator
    pressedBtn = event.target;
    pressedBtn.classList.toggle('selected');

    if (storedOperator === "") {
        if (newNumberDisplay.innerText !== "0") {
            resultDisplay.innerText = 0;
        }
        storedOperator = "add";
        evaluateCalculation();

    } else {

        const oldOperator = calculator.querySelector(`#${storedOperator}`);
        oldOperator.classList.remove('selected');
        evaluateCalculation();
    }

    operatorDisplay.innerText = pressedBtn.textContent;
    storedOperator = pressedBtn.id;
    
}

function evaluateCalculation() {
    //need to add a check for when we press multiple operators
    //in a row instead of pressing equals.
    const number2 = parseFloat(newNumberDisplay.innerText);
    const number1 = parseFloat(resultDisplay.innerText);
    const operator = storedOperator;
    storedOperator = "";
    console.log(`doing ${number1} ${operator} ${number2}`);
    // how can I remove redundancy of so many storedOperator clears;
    if (operator == "add") {
        resultDisplay.innerText = `${number1 + number2}`;

    } else if (operator == "subtract") {
        resultDisplay.innerText = `${number1 - number2}`;

    } else if (operator == "divide") {
        resultDisplay.innerText = `${number1 / number2}`;

    } else if (operator == "multiply") {
        resultDisplay.innerText = `${number1 * number2}`;

    } else if (operator == "exponent") {
        resultDisplay.innerText = `${number1 ** number2}`;     

    } else if (operator == "root") {
        resultDisplay.innerText = `${number1 ** (1 / number2)}`; 
    }
    
    newNumberDisplay.innerText = 0;
    operatorDisplay.innerText = "";
}

function undo() {
    if (newNumberDisplay.innerText.length === 1) {
        newNumberDisplay.innerText = "0";
    } else {
        newNumberDisplay.innerText = newNumberDisplay.innerText.slice(0, -1);
    }
}

function clear() {
    resultDisplay.innerText = 0;
    newNumberDisplay.innerText = 0;
    operatorDisplay.innerText = "";
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

