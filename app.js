const calculator = document.querySelector(".calculator");
const calculator__keys = document.querySelector(".calculator__keys");
const calculator__display = document.querySelector(".calculator__display");

calculator__keys.addEventListener("click", e => {
	if (e.target.matches("button")) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = calculator__display.textContent;
		const previousKeyType = calculator.dataset.previousKeyType;

		// Removing 'is-depressed' state from each key
		Array.from(key.parentNode.children).forEach(k =>
			k.classList.remove("is-depressed")
		);

		if (!action) {
			if (displayedNum === "0" || previousKeyType === "operator") {
				calculator__display.textContent = keyContent;
			} else {
				calculator__display.textContent = displayedNum + keyContent;
			}
		}

		if (action === "decimal") {
			calculator__display.textContent = displayedNum + ".";
		}

		if (
			action === "add" ||
			action === "subtract" ||
			action === "multiply" ||
			action === "divide"
		) {
			// Make a custom dataset for holding information
			calculator.dataset.firstValue = displayedNum;
			calculator.dataset.operation = action;
			calculator.dataset.previousKeyType = "operator";
			key.classList.add("is-depressed");
		}

		if (action === "clear") {
			console.log("clear");
		}

		if (action === "calculate") {
			const firstValue = calculator.dataset.firstValue;
			const secondValue = displayedNum;
			const operator = calculator.dataset.operation;

			calculator__display.textContent = calculate(
				firstValue,
				operator,
				secondValue
			);
		}
	}
});

const calculate = (n1, operator, n2) => {
	let result = "";

	// Use parseFloat to convert string to floats
	if (operator === "add") {
		result = parsrFloat(n1) + parsrFloat(n2);
	} else if (operator === "subtract") {
		result = parsrFloat(n1) - parsrFloat(n2);
	} else if (operator === "multiply") {
		result = parsrFloat(n1) * parsrFloat(n2);
	} else if (operator === "divide") {
		result = parsrFloat(n1) / parsrFloat(n2);
	}

	return result;
};
