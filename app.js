let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

// Selectors
const display = document.querySelector(".display");

const buttons = document.querySelectorAll(".button");
//functions

function updateDisplay() {
  display.innerText = displayValue;
  // if (displayValue.length > 9) {
  //   display.innerText = displayValue.substring(0, 9);
  // }
}

function clickButton() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      if (buttons[i].classList.contains("number")) {
        inputOperand(buttons[i].value);
        updateDisplay();
      } else if (buttons[i].classList.contains("operator")) {
        inputOperator(buttons[i].value);
      } else if (buttons[i].classList.contains("equal")) {
        inputEquals();
        updateDisplay();
      } else if (buttons[i].classList.contains("decimal")) {
        inputDecimal(buttons[i].value);
        updateDisplay();
      } else if (buttons[i].classList.contains("percent")) {
        inputPercent(displayValue);
        updateDisplay();
      } else if (buttons[i].classList.contains("all-clear")) {
        clearDisplay();
        updateDisplay();
      }
    });
  }
}
clickButton();

function inputOperand(operand) {
  if (firstOperator === null) {
    //First click, to remove the 0 placeholder to first number
    if (displayValue === "0" || displayValue === 0) {
      displayValue = operand;
    } else if (displayValue === firstOperand) {
      // starts new operation after inputEquals()
      displayValue = operand;
    } else {
      displayValue += operand;
    }
  } else {
    // 3rd/5th click - inputs secondOperand
    if (displayValue === firstOperand) {
      displayValue = operand;
    } else {
      displayValue += operand;
    }
  }
}

function inputOperator(operator) {
  if (firstOperator != null && secondOperator === null) {
    secondOperator = operator;
    secondOperand = displayValue;
    result = operate(
      firstOperator,
      Number(firstOperand),
      Number(secondOperand)
    );
    displayValue = roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = null;
  } else if (firstOperator != null && secondOperator != null) {
    secondOperand = displayValue;
    result = operate(
      secondOperator,
      Number(firstOperand),
      Number(secondOperand)
    );
    secondOperator = operator;
    displayValue = roundAccurately(result, 15).toString();
    firstOperand = displayValue;
    result = null;
  } else {
    firstOperator = operator;
    firstOperand = displayValue;
  }
}

function inputEquals() {
  if (firstOperator === null) {
    displayValue = displayValue;
  } else if (secondOperator != null) {
    secondOperand = displayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      secondOperator
    );
    if (result === "undefined") {
      displayValue = "undefined";
    } else {
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      secondOperand = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  } else {
    secondOperand = displayValue;
    result = operate(
      firstOperator,
      Number(firstOperand),
      Number(secondOperand)
    );
    if (result === "undefined") {
      displayValue = "undefined";
    } else {
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      secondOperand = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  }
}

function inputDecimal(dot) {
  if (displayValue === firstOperand || displayValue === secondOperand) {
    displayValue = "0";
    displayValue += dot;
  } else if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
}

function inputPercent(num) {
  displayValue = (num / 100).toString();
}

function inputSign(num) {
  displayValue = (num * -1).toString();
}

function clearDisplay() {
  displayValue = "0";
  firstOperand = null;
  secondOperand = null;
  firstOperator = null;
  secondOperator = null;
  result = null;
}

function inputBackspace() {
  if (firstOperand != null) {
    firstOperand = null;
    updateDisplay();
  }
}

function operate(operator, a, b) {
  if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  } else if (operator === "*") {
    return a * b;
  } else if (operator === "/") {
    if (b === 0) {
      return "undefined";
    } else {
      return a / b;
    }
  }
}

function roundAccurately(num, places) {
  return parseFloat(Math.round(num + "e" + places) + "e-" + places);
}
