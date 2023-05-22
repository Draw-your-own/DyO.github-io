const canvas = document.querySelector("#drawing-board");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let eraserWidth = 5;
let selectedColor = "#000";

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);

function startDraw(e) {
    isDrawing = true;
    draw(e);
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

        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopDraw() {
    isDrawing = false;
}

// Restablecer el tamaño del lienzo de dibujo cuando cambie el tamaño de la ventana
window.addEventListener("resize", () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
});

// Establecer el tamaño inicial del lienzo de dibujo
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;
