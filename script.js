window.onload = () => {
  setStartMode();
}

const colorBtn = document.getElementById("colorBtn");
const grayBtn = document.getElementById("grayBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const container = document.querySelector("#container");
const dimensionText = document.querySelector("#dimensionText");
const range = document.querySelector("#range");
const colorPicker = document.querySelector("#colorPicker");
let startColor = "#000000";
let currentMode = "color";
let mouseBtnPressed = false
document.body.onmousedown = () => (mouseBtnPressed = true)
document.body.onmouseup = () => (mouseBtnPressed = false)

dimensionText.textContent = range.value+" x "+range.value;
range.addEventListener("input", (event) => {
  dimensionText.textContent = event.target.value+" x "+event.target.value;
});

colorPicker.addEventListener("input", (e)=>{colorSelection(e.target.value)})
range.addEventListener("input", (e)=>{setGrid(e.target.value)});

colorBtn.onclick = () => {setCurrentMode("color")}
grayBtn.onclick = () => {setCurrentMode("gray")}
rainbowBtn.onclick = () => {setCurrentMode("rainbow")}
eraserBtn.onclick = () => {setCurrentMode("eraser")}
clearBtn.onclick = () => {setCurrentMode("clear")}

function setStartMode (){
  setCurrentMode("color");
  setGrid(25);
  range.value = 25
  dimensionText.textContent = range.value+" x "+range.value;
}

function setCurrentMode(mode){
  if (mode === "color") {
    colorBtn.classList.add("activeBtn")
    grayBtn.classList.remove("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    eraserBtn.classList.remove("activeBtn")
    currentMode = "color";
  }
  if (mode === "gray") {
    colorBtn.classList.remove("activeBtn")
    grayBtn.classList.add("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    eraserBtn.classList.remove("activeBtn")
    currentMode = "gray";
  }
  if (mode === "rainbow") {
    colorBtn.classList.remove("activeBtn")
    grayBtn.classList.remove("activeBtn")
    rainbowBtn.classList.add("activeBtn")
    eraserBtn.classList.remove("activeBtn")
    currentMode = "rainbow";
  } 
  if (mode === "eraser") {
    colorBtn.classList.remove("activeBtn")
    grayBtn.classList.remove("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    eraserBtn.classList.add("activeBtn")
    currentMode = "eraser";
  }
  if (mode === "clear") {
    clearGrid();
  }
}

function setGrid(size) {
  container.innerHTML=""
  let dimension = size*size;
    for (i = 0; i < dimension; i++) {
        const block = document.createElement("div");
        block.classList.add("colorBlock");
        block.addEventListener("mouseover", (event) => {draw(event)});
        block.addEventListener("mousedown", (event) => {draw(event)});
        const divSize = 500/size+"px";
        block.style.minHeight = divSize;
        block.style.maxHeight = divSize;
        block.style.minWidth = divSize;
        block.style.maxWidth = divSize;
        container.appendChild(block);
      }
}

function clearGrid(){
  container.innerHTML="";
  setGrid(range.value);
}

function colorSelection(color){
  startColor = color;
}

function draw(color){
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  
    if(color.type === "mouseover" && !mouseBtnPressed) return
  
    if(currentMode === "color"){
      color.target.style.backgroundColor = startColor
    }
  
    if(currentMode === "gray"){
      color.target.style.backgroundColor = startColor
    }
  
    if(currentMode === "rainbow"){
      color.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    }
  
    if(currentMode === "eraser"){
      color.target.style.backgroundColor = "#FFFFFF"
    }
  }