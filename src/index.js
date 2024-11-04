const buttons = document.querySelectorAll(".numbers button");
const screen = document.querySelector(".screen input");
const operations = document.querySelectorAll(".operators button");

let currentOperand = "";
let currentOperation = null;

function calculate() {
   for (const btn of buttons) {
      const value = btn.getAttribute("data-val");
      btn.addEventListener("click", () => {
         if (value === "clear") {
            screen.value = "";
            currentOperand = "";
            currentOperation = null;
         } else {
            screen.value += value;
         }
      });
   }

   for (const oper of operations) {
      const value = oper.getAttribute("data-val");
      oper.addEventListener("click", () => {
         if (value === "=") {
            if (currentOperation !== null) {
               let secondOperand = screen.value.replace(
                  currentOperand + currentOperation,
                  ""
               );
               screen.value = performOperation(
                  currentOperation,
                  parseFloat(currentOperand),
                  parseFloat(secondOperand)
               ).toFixed(2);
               currentOperand = screen.value;
               currentOperation = null;
            }
            return;
         }

         if (currentOperation === null) {
            currentOperand = screen.value;
            currentOperation = value;
            screen.value += value;
         } else {
            let secondOperand = screen.value.replace(
               currentOperand + currentOperation,
               ""
            );
            screen.value =
               performOperation(
                  currentOperation,
                  parseFloat(currentOperand),
                  parseFloat(secondOperand)
               ) + value;
            currentOperand = screen.value;
            currentOperation = value;
         }
      });
   }
}

function performOperation(operation, operand1, operand2) {
   switch (operation) {
      case "+":
         return operand1 + operand2;
      case "-":
         return operand1 - operand2;
      case "x":
         return operand1 * operand2;
      case "÷":
         return operand1 / operand2;
      default:
         return operand1;
   }
}

calculate();
