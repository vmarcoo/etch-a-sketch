const container = document.querySelector("#container");
const dimensionText = document.querySelector("#dimensionText");
const range = document.querySelector("#range");

dimensionText.textContent = range.value+" x "+range.value;
range.addEventListener("input", (event) => {
  dimensionText.textContent = event.target.value+" x "+event.target.value;
});

function makeGrid(size) {
if (size !== Number(size)) return console.log("Error, not a number!");
let dimension = size*size;
  for (i = 0; i < dimension; i++) {
      const block = document.createElement("div");
      container.appendChild(block);
      block.textContent = " ";
      block.style.backgroundColor = "white";
    }
  }

makeGrid(100);