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

		if (!action) {
			if (displayedNum === "0" || previousKeyType === "operator") {
				calculator__display.textContent = keyContent;
			} else {
				calculator__display.textContent = displayedNum + keyContent;
			}

			calculator.dataset.previousKeyType = "number";
		}

		if (action === "decimal") {
			if (!displayedNum.includes(".")) {
				calculator__display.textContent = displayedNum + ".";
			}

			if (previousKeyType === "operator") {
				calculator__display.textContent = "0.";
			}

			calculator.dataset.previousKeyType = "decimal";
		}

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
			if (firstValue && operator && previousKeyType !== "operator") {
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
			calculator.dataset.previousKeyType = "clear";
		}

		if (action === "calculate") {
			let firstValue = calculator.dataset.firstValue;
			let secondValue = displayedNum;
			let operator = calculator.dataset.operation;

			if (firstValue) {
				if (previousKeyType === "calculate") {
					firstValue = displayedNum;
				}

				calculator__display.textContent = calculate(
					firstValue,
					operator,
					secondValue
				);
			}

			calculator.dataset.previousKeyType = "calculate";
		}
	}
});

const calculate = (n1, operator, n2) => {
	let result = "";

	// Use parseFloat to convert string to floats
	if (operator === "add") {
		result = parseFloat(n1) + parseFloat(n2);
	} else if (operator === "subtract") {
		result = parseFloat(n1) - parseFloat(n2);
	} else if (operator === "multiply") {
		result = parseFloat(n1) * parseFloat(n2);
	} else if (operator === "divide") {
		result = parseFloat(n1) / parseFloat(n2);
	}

	return result.toFixed(4);
};
