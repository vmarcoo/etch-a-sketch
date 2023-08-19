const container = document.querySelector("#container");
const dimensionText = document.querySelector("#dimensionText");
const range = document.querySelector("#range");

dimensionText.textContent = range.value+" x "+range.value;
range.addEventListener("input", (event) => {
  dimensionText.textContent = event.target.value+" x "+event.target.value;
});

const colorBtn = document.getElementById("colorBtn");
const grayBtn = document.getElementById("grayBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

colorBtn.onclick = () => {setCurrentMode("color")}
grayBtn.onclick = () => {setCurrentMode("gray")}
rainbowBtn.onclick = () => {setCurrentMode("rainbow")}
eraserBtn.onclick = () => {setCurrentMode("eraser")}
clearBtn.onclick = () => {setCurrentMode("clear")}

function setCurrentMode(mode){

  if (mode === "color") {
    colorBtn.classList.add("activeBtn")
    grayBtn.classList.remove("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    eraserBtn.classList.remove("activeBtn")
  }
  if (mode === "gray") {
    colorBtn.classList.remove("activeBtn")
    grayBtn.classList.add("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    eraserBtn.classList.remove("activeBtn")
  }
  if (mode === "rainbow") {
    colorBtn.classList.remove("activeBtn")
    grayBtn.classList.remove("activeBtn")
    rainbowBtn.classList.add("activeBtn")
    eraserBtn.classList.remove("activeBtn")
  } 
  if (mode === "eraser") {
    colorBtn.classList.remove("activeBtn")
    grayBtn.classList.remove("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    eraserBtn.classList.add("activeBtn")
  }
  if (mode === "clear") {
    colorBtn.classList.remove("activeBtn")
    grayBtn.classList.remove("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    eraserBtn.classList.remove("activeBtn")
  }
}

//Make grid:
//------------------------------------------------------------------------
function makeGrid(size) {
if (size !== Number(size)) return console.log("Error, not a number!");
let dimension = size*size;
  for (i = 0; i < dimension; i++) {
      const block = document.createElement("div");
      block.textContent = " ";
      block.style.backgroundColor = "black";
      const divSize = 500/size+"px";
      block.style.minHeight = divSize;
      block.style.maxHeight = divSize;
      block.style.minWidth = divSize;
      block.style.maxWidth = divSize;
      container.appendChild(block);
    }
  }
//-------------------------------------------------------------------------