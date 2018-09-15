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

		// Impure function
		updateCalculatorState();

		if (
			action === "add" ||
			action === "subtract" ||
			action === "multiply" ||
			action === "divide"
		) {
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
			calculator.dataset.previousKeyType = "clear";
		}

		if (action !== "clear") {
			const clearButton = calculator.querySelector("[data-action=clear]");
			clearButton.textContent = "CE";
		}

		if (action === "calculate") {
			calculator.dataset.modValue = secondValue;
			calculator.dataset.previousKeyType = "calculate";
		}
	}
});

calculator__keys.addEventListener("click", e => {
	if (e.target.matches("button")) return;
	const displayedNum = calculator__display.textContent;
	const resultString = createResultString(
		e.target,
		displayedNum,
		calculator.dataset
	);
});

createResultString = (key, displayedNum, state) => {
	const keyContent = key.textContent;
	const action = key.dataset.action;
	const firstValue = state.firstValue;
	const modValue = state.modValue;
	const operator = state.operation;
	const previousKeyType = state.previousKeyType;
	const keyType = getKeyType(key);

	if (keyType === "number") {
		return displayedNum === "0" ||
			previousKeyType === "operator" ||
			previousKeyType === "calculate"
			? keyContent
			: displayedNum + keyContent;
	}

	if (keyType === "decimal") {
		if (!displayedNum.includes(".")) return displayedNum + ".";
		if (previousKeyType === "operator" || previousKeyType === "calculate")
			return "0.";
		return displayedNum;
	}

	if (keyType === "operator") {
		return firstValue &&
			operator &&
			previousKeyType !== "operator" &&
			previousKeyType !== "calculate"
			? calculate(firstValue, operator, displayedNum)
			: displayedNum;
	}

	if (keyType === "clear") return 0;

	if (keyType === "calculate") {
		return firstValue
			? previousKeyType === "calculate"
				? calculate(displayedNum, operator, modValue)
				: calculate(firstValue, operator, displayedNum)
			: displayedNum;
	}
};

const getKeyType = key => {
	const { action } = key.dataset;
	if (!action) return "number";
	if (
		action === "add" ||
		action === "subtract" ||
		action === "multiply" ||
		action === "divide"
	)
		return "operator";
	// For everything else, return the action
	return action;
};

const calculate = (n1, operator, n2) => {
	const firstNum = parseFloat(n1);
	const secondNum = parseFloat(n2);
	if (operator === "add") return firstNum + secondNum;
	if (operator === "subtract") return firstNum - secondNum;
	if (operator === "multiply") return firstNum * secondNum;
	if (operator === "divide") return firstNum / secondNum;
};