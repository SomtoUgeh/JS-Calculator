const calculator = document.querySelector(".calculator");
const calculator__keys = document.querySelector(".calculator__keys");
const calculator__display = document.querySelector(".calculator__display");

calculator__keys.addEventListener("click", e => {
	// Check for all instances of <button>
	if (e.target.matches("button")) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = calculator__display.textContent;
		const previousKeyType = calculator.dataset.previousKeyType;

		// Make an array and remove 'is-depressed' state from each key
		Array.from(key.parentNode.children).forEach(k =>
			k.classList.remove("is-depressed")
		);

		// Splitting code into pure and impure functions

		// Pure function
		const resultString = createResultString();

		createResultString = () => {
			// Variables required are:
			// 1. keyContent
			// 2. displayedNum
			// 3. previousKeyType
			// 4. action

			if (!action) {
				return displayedNum === "0" ||
					previousKeyType === "operator" ||
					previousKeyType === "calculate"
					? keyContent
					: displayedNum + keyContent;
			}

			if (action === "decimal") {
				if (!displayedNum.includes(".")) return displayedNum + ".";
				if (
					previousKeyType === "operator" ||
					previousKeyType === "calculate"
				)
					return "0.";
				return displayedNum;
			}

			if (
				action === "add" ||
				action === "subtract" ||
				action === "multiply" ||
				action === "divide"
			) {
				const firstValue = calculator.dataset.firstValue;
				const operator = calculator.dataset.operation;

				return firstValue &&
					operator &&
					previousKeyType !== "operator" &&
					previousKeyType !== "calculate"
					? calculate(firstValue, operator, displayedNum)
					: displayedNum;
			}
		};

		// Impure function

		calculator__display.textContent = resultString;
		updateCalculatorState();

		if (
			action === "add" ||
			action === "subtract" ||
			action === "multiply" ||
			action === "divide"
		) {
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operation;
			const secondValue = displayedNum;

			// Note: It's sufficient to check for firstValue and operator because secondValue always exists
			if (
				firstValue &&
				operator &&
				previousKeyType !== "operator" &&
				previousKeyType !== "calculate"
			) {
				const calcValue = calculate(firstValue, operator, secondValue);
				calculator__display.textContent = calcValue;

				// Update calculated value as firstValue
				calculator.dataset.firstValue = calcValue;
			} else {
				// If there are no calculations, set displayedNum as the firstValue
				calculator.dataset.firstValue = displayedNum;
			}

			// Make custom datasets for holding information
			calculator.dataset.operation = action;
			calculator.dataset.previousKeyType = "operator";
			key.classList.add("is-depressed");
		}

		if (action === "clear") {
			if (key.textContent === "AC") {
				calculator.dataset.firstValue = "";
				calculator.dataset.modValue = "";
				calculator.dataset.operator = "";
				calculator.dataset.previousKeyType = "";
			} else {
				key.textContent = "AC";
			}

			calculator__display.textContent = 0;
			calculator.dataset.previousKeyType = "clear";
		}

		if (action !== "clear") {
			const clearButton = calculator.querySelector("[data-action=clear]");
			clearButton.textContent = "CE";
		}

		if (action === "calculate") {
			let firstValue = calculator.dataset.firstValue;
			let secondValue = displayedNum;
			let operator = calculator.dataset.operation;

			if (firstValue) {
				if (previousKeyType === "calculate") {
					firstValue = displayedNum;
					secondValue = calculator.dataset.modValue;
				}

				calculator__display.textContent = calculate(
					firstValue,
					operator,
					secondValue
				);
			}

			calculator.dataset.modValue = secondValue;
			calculator.dataset.previousKeyType = "calculate";
		}
	}
});

const calculate = (n1, operator, n2) => {
	const firstNum = parseFloat(n1);
	const secondNum = parseFloat(n2);
	if (operator === "add") return firstNum + secondNum;
	if (operator === "subtract") return firstNum - secondNum;
	if (operator === "multiply") return firstNum * secondNum;
	if (operator === "divide") return firstNum / secondNum;
};
