const calculator = document.querySelector(".calculator");
const calculator__keys = document.querySelector(".calculator__keys");

calculator__keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;

if (!action) {
  console.log("number key");
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
