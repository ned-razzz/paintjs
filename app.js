const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d')
const rangeBar = document.getElementById('jsRange')
const colorList = document.getElementsByClassName('jsColor')
const modeBtn = document.getElementById('jsMode')

canvas.width = 800
canvas.height = 600

ctx.strokeStyle = 'black'
ctx.lineWidth = 2.5

let paintState = false
let fillMode = false

function startPaintState() {
	paintState = true
}

function endPaintState() {
	paintState = false
}

function onMouseMove(event) {
	const canvas_x = event.offsetX
	const canvas_y = event.offsetY
	//console.log(canvas_x, canvas_y)

	if (!paintState) {
		ctx.beginPath()
		ctx.moveTo(canvas_x, canvas_y)
	} else {
		ctx.lineTo(canvas_x, canvas_y)
		ctx.stroke()
	}

	console.log(paintState)
}

function onMouseDown(event) {
	startPaintState()
}

function onMouseEnter(event) {
	const canvas_x = event.offsetX
	const canvas_y = event.offsetY
	if (event.buttons == 1) {
		ctx.beginPath()
		ctx.moveTo(canvas_x, canvas_y)
		startPaintState()
	}
}

function onMouseLeave(event) {
	endPaintState()
	console.log('hello')
}	


if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove)
	canvas.addEventListener("mousedown", startPaintState)
	canvas.addEventListener("mouseup", endPaintState)
	canvas.addEventListener("mouseenter", onMouseEnter)
	canvas.addEventListener("mouseleave", onMouseLeave)
}


//색 변경
function handleColorClick(event) {
	const changeColor = event.target.style.backgroundColor
	ctx.strokeStyle = changeColors
	console.log(changeColor)
}

Array.from(colorList).forEach(color => color.addEventListener("click", handleColorClick))

//선 굵기 변경 
function handleRangeChange(event) {
	const strokeSize = event.target.value
	// console.log(event.target.value)
	ctx.lineWidth = strokeSize
}

if (rangeBar) {
	rangeBar.addEventListener("input", handleRangeChange)
}

//모드 변경
function handleModeClick() {
	if (fillMode === true) {
		fillMode = false
		modeBtn.innerText = "Fill"
	} else {
		fillMode = true
		modeBtn.innerText = "Paint"
	}
}

if (modeBtn) {
	modeBtn.addEventListener("click", handleModeClick)
}