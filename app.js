const calculator = document.querySelector(".calculator");
const calculator__keys = document.querySelector(".calculator__keys");
const calculator__display = document.querySelector(".calculator__display");

calculator__keys.addEventListener("click", e => {
	if (e.target.matches("button")) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = calculator__display.textContent;

		if (!action) {
			if (displayedNum == "0") {
				calculator__display.textContent = keyContent;
			} else {
				calculator__display.textContent = displayedNum + keyContent;
			}
		}

		if (
			action === "add" ||
			action === "subtract" ||
			action === "multiply" ||
			action === "divide"
		) {
			console.log("Operation key");
		}

		if (action === "decimal") {
			console.log("decimal");
		}

		if (action === "clear") {
			console.log("clear");
		}

		if (action === "calculate") {
			console.log("calculate");
		}
	}
});
