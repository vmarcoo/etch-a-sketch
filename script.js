// Global variables ------------------------------------------------------------------------------------------------------------

const colorBtn = document.getElementById("colorBtn")
const rainbowBtn = document.getElementById("rainbowBtn")
const grayBtn = document.getElementById("grayBtn")
const eraserBtn = document.getElementById("eraserBtn")
const clearBtn = document.getElementById("clearBtn")
const container = document.querySelector("#container")
const dimensionText = document.querySelector("#dimensionText")
const range = document.querySelector("#range")
const colorPicker = document.querySelector("#colorPicker")
const downloadButton = document.querySelector("#downloadBtn")

let startColor = "#000000"
let currentMode = "color"
let mouseBtnPressed = false

// Event listeners -------------------------------------------------------------------------------------------------------------

window.addEventListener("load", () => setStartMode())

window.addEventListener("mousedown", () => mouseBtnPressed = true)

window.addEventListener("mouseup", () => mouseBtnPressed = false)

colorBtn.addEventListener("click", () => setCurrentMode("color"))

rainbowBtn.addEventListener("click", () => setCurrentMode("rainbow"))

grayBtn.addEventListener("click", () => setCurrentMode("gray"))

eraserBtn.addEventListener("click", () => setCurrentMode("eraser"))

clearBtn.addEventListener("click", () => setCurrentMode("clear"))

downloadButton.addEventListener("click", () => screenshot())

colorPicker.addEventListener("input", (e)=> colorSelection(e.target.value))

range.addEventListener("input", (e)=> setGrid(e.target.value))

range.addEventListener("input", (event) => dimensionText.textContent = event.target.value+" x "+event.target.value)

dimensionText.textContent = range.value+" x "+range.value

// Functions -------------------------------------------------------------------------------------------------------------------

function setStartMode () {
  setCurrentMode("color")
  setGrid(25)
  range.value = 25
  dimensionText.textContent = range.value+" x "+range.value
}

function setCurrentMode (mode) {
  if (mode === "color") {
    colorBtn.classList.add("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    grayBtn.classList.remove("activeBtn")
    eraserBtn.classList.remove("activeBtn")
    currentMode = "color"
  }

  if (mode === "rainbow") {
    colorBtn.classList.remove("activeBtn")
    rainbowBtn.classList.add("activeBtn")
    grayBtn.classList.remove("activeBtn")
    eraserBtn.classList.remove("activeBtn")
    currentMode = "rainbow"
  } 

  if (mode === "gray") {
    colorBtn.classList.remove("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    grayBtn.classList.add("activeBtn")
    eraserBtn.classList.remove("activeBtn")
    currentMode = "gray"
  }

  if (mode === "eraser") {
    colorBtn.classList.remove("activeBtn")
    rainbowBtn.classList.remove("activeBtn")
    grayBtn.classList.remove("activeBtn")
    eraserBtn.classList.add("activeBtn")
    currentMode = "eraser"
  }
  
  if (mode === "clear") {
    clearGrid()
  }
}

function setGrid (size) {

  container.innerHTML = ""
  let dimension = size * size

  for (i = 0; i < dimension; i++) {

    const block = document.createElement("div")
    block.classList.add("white")
    block.addEventListener("mouseover", (event) => draw(event))
    block.addEventListener("mousedown", (event) => draw(event))
    block.addEventListener("mouseover", (event) => grayScale(event))
    block.addEventListener("mousedown", (event) => grayScale(event))
    const divSize = 500/size+"px"
    block.style.minHeight = divSize
    block.style.maxHeight = divSize
    block.style.minWidth = divSize
    block.style.maxWidth = divSize
    container.appendChild(block)
    
  }
}

function clearGrid () {
  container.innerHTML=""
  setGrid(range.value)
}

function colorSelection(color){
  startColor = color
}

function draw (color) {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  
  if (color.type === "mouseover" && !mouseBtnPressed) return
  
  if (currentMode === "color") {
    color.target.className = ''
    color.target.classList.add("white")
    color.target.style.backgroundColor = startColor
  }
  
  if (currentMode === "rainbow") {
    color.target.className = ''
    color.target.classList.add("white")
    color.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
  }
  
  if (currentMode === "gray") {
    if (color.target.classList.contains("lighter")) return color.target.style.backgroundColor = `rgb(${214}, ${214}, ${214})`
    if (color.target.classList.contains("light")) return color.target.style.backgroundColor = `rgb(${181}, ${181}, ${181})`
    if (color.target.classList.contains("neutral")) return color.target.style.backgroundColor = `rgb(${143}, ${143}, ${143})`
    if (color.target.classList.contains("dark")) return color.target.style.backgroundColor = `rgb(${92}, ${92}, ${92})`
    if (color.target.classList.contains("darker")) return color.target.style.backgroundColor = `rgb(${61}, ${61}, ${61})`
    if (color.target.classList.contains("black")) return color.target.style.backgroundColor = `rgb(${0}, ${0}, ${0})`
  }

  if (currentMode === "eraser") {
    color.target.className = ''
    color.target.classList.add("white")
    color.target.style.backgroundColor = "#FFFFFF"
  }
}

function grayScale (block) {

  if (block.type === "mouseover" && !mouseBtnPressed) return

  if (block.target.classList.contains("white")) {
    block.target.classList.remove("white")
    block.target.classList.add("lighter")
    return draw(block)
  }

  if (block.target.classList.contains("lighter")) {
    block.target.classList.remove("lighter")
    block.target.classList.add("light")
    return draw(block)
  }
  
  if (block.target.classList.contains("light")) {
    block.target.classList.remove("light")
    block.target.classList.add("neutral")
    return draw(block)
  }

  if (block.target.classList.contains("neutral")) {
    block.target.classList.remove("neutral")
    block.target.classList.add("dark")
    return draw(block)
  }

  if (block.target.classList.contains("dark")) {
    block.target.classList.remove("dark")
    block.target.classList.add("darker")
    return draw(block)
  }

  if (block.target.classList.contains("darker")) {
    block.target.classList.remove("darker")
    block.target.classList.add("black")
    return draw(block)
  }
}

function screenshot () {
  html2canvas(container).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");
    downloadButton.setAttribute("href", imageData);
  })
}