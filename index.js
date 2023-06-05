const apiKey = "fel0a5a6-bcd-410e-a138-c43f99b62ce5"; // Reemplaza con tu propia clave de API

const finishDrawingButton = document.querySelector("#finish-drawing");
const canvas = document.querySelector("#drawing-board");

finishDrawingButton.addEventListener("click", () => {
    const canvasData = canvas.toDataURL("image/png");
    applyDeepAiStyle(canvasData);
});

function applyDeepAiStyle(imageData) {
    fetch("https://api.deepai.org/api/deepart-cubism", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Api-Key": apiKey
        },
        body: `image=${encodeURIComponent(imageData)}`
    })
        .then(response => response.json())
        .then(data => {
            displayStyledImage(data.output_url);
        })
        .catch(error => {
            console.error(error);
        });
}

function displayStyledImage(imageUrl) {
    const styledImage = document.createElement("img");
    styledImage.src = imageUrl;
    styledImage.classList.add("styled-image");
    document.body.appendChild(styledImage);
}
