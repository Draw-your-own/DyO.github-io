const canvas = document.querySelector("#drawing-board");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let eraserWidth = 5;
let selectedColor = "#000";

document.addEventListener("mousedown", startDraw);
document.addEventListener("mousemove", drawing);
document.addEventListener("mouseup", stopDraw);
document.addEventListener("mouseout", stopDraw);

function startDraw(e) {
    if (e.target === canvas) {
        isDrawing = true;
        draw(e);
    }
}

function drawing(e) {
    if (!isDrawing) return;
    draw(e);
}

function draw(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.lineWidth = selectedTool === "eraser" ? eraserWidth : brushWidth;
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;

        if (isDrawing) {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

function stopDraw() {
    if (isDrawing) {
        ctx.beginPath();
    }
    isDrawing = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveImage() {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "drawing.png";
    link.click();
}

const brushBtn = document.querySelector("#brush");
const eraserBtn = document.querySelector("#eraser");
const brushSizeSlider = document.querySelector("#bs-slider");
const eraserSizeSlider = document.querySelector("#er-slider");
const colorPicker = document.querySelector("#col");
const clearButton = document.querySelector(".clear-canvas");
const saveButton = document.querySelector(".save-image");

brushBtn.addEventListener("click", () => {
    selectedTool = "brush";
});

eraserBtn.addEventListener("click", () => {
    selectedTool = "eraser";
});

brushSizeSlider.addEventListener("input", () => {
    brushWidth = brushSizeSlider.value;
});

eraserSizeSlider.addEventListener("input", () => {
    eraserWidth = eraserSizeSlider.value;
});

colorPicker.addEventListener("input", () => {
    selectedColor = colorPicker.value;
});

clearButton.addEventListener("click", () => {
    clearCanvas();
});

saveButton.addEventListener("click", () => {
    saveImage();
});

function adjustCanvasSize() {
    const drawingBoard = document.querySelector(".drawing-board");
    const canvas = document.querySelector("#drawing-board");
    canvas.width = drawingBoard.clientWidth;
    canvas.height = drawingBoard.clientHeight;
}

adjustCanvasSize();
window.addEventListener("resize", adjustCanvasSize);
