const canvas = document.querySelector("#drawing-board");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let eraserWidth = 5;
let selectedColor = "#000";
let capturedImage = null;

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

const takePhotoButton = document.querySelector(".take-photo");

takePhotoButton.addEventListener("click", () => {
    capturePhoto();
});

function capturePhoto() {
    const video = document.createElement("video");

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((error) => {
            console.log("Error al acceder a la cámara: ", error);
        });

    video.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        capturedImage = new Image();
        capturedImage.src = canvas.toDataURL("image/png");

        canvas.remove();
        video.pause();
        video.srcObject = null;
    });
}

function drawCapturedImage() {
    if (capturedImage) {
        ctx.drawImage(capturedImage, 0, 0, canvas.width, canvas.height);
    }
}

function animate() {
    requestAnimationFrame(animate);
    drawCapturedImage();
}

animate();

// Añade este código al final de tu archivo JavaScript existente

const deepArtApiKey = 'fel0a5a6-bcd-410e-a138-c43f99b62ce5; // Reemplaza 'TU_API_KEY' con tu clave de API de DeepArt.io

async function transformDrawingToCubism() {
  const canvasDataUrl = canvas.toDataURL(); // Obtiene los datos de la imagen del canvas
  const response = await fetch(`https://api.deepai.org/api/style-transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Api-Key': deepArtApiKey,
    },
    body: new URLSearchParams({
      content: canvasDataUrl,
      style: 'cubism',
    }).toString(),
  });

  const result = await response.json();
  const transformedImageUrl = result.output_url;

  const transformedImage = new Image();
  transformedImage.src = transformedImageUrl;

  transformedImage.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(transformedImage, 0, 0, canvas.width, canvas.height);
  };
}

const finishDrawingButton = document.querySelector("#finish-drawing");
finishDrawingButton.addEventListener("click", transformDrawingToCubism);


