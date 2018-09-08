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
			key.classList.add("is-depressed");
			// Make a custom dataset for holding the previous key pressed 
			calculator.dataset.previousKeyType = "operator";
		}

		if (action === "clear") {
			console.log("clear");
		}

		if (action === "calculate") {
			console.log("calculate");
		}
	}
});
