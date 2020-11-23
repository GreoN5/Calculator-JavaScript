class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.readyToReset = false;
        this.clear();
    }

    clear() { //clear the screen
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() { //deleting a single number
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) { //passing a number when selected
        if (number == "." && this.currentOperand.includes(".")) {
            return;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) { //passing an operator when selected
        if (this.currentOperand == "") {
            return;
        }

        if (this.previousOperand != "") {
            this.result();
        } 

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    result() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) {
            return;
        } else {
            switch (this.operation) {
                case "+": result = previous + current; 
                    break;
                case "-": result = previous - current; 
                    break;
                case "*": result = previous * current; 
                    break;
                case "/": result = previous / current;
                    break;
                default: return;
            }

            this.readyToReset = true;
            this.currentOperand = result;
            this.operation = undefined;
            this.previousOperand = "";
        }
    }

    updateDisplay() {
        this.currentNumber.innerText = this.getNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousNumber.innerText = `${this.getNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousNumber.innerText = "";
        }
    }

    getNumber(number) {
        let stringNumber = number.toString();
        let integerDigits = parseFloat(stringNumber.split(".")[0]);
        let decimalDigits = stringNumber.split(".")[1];
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousNumber = document.querySelector("[data-previous-number]");
const currentNumber = document.querySelector("[data-current-number]");

const calculator = new Calculator(previousNumber, currentNumber);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
        calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }

        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
});

equalButton.addEventListener("click", button => {
    calculator.result();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});