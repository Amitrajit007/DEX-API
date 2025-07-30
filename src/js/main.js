// ! Imports
import { fetchImageData, fetchInfoData } from "./script.js";
// ! DOMS

const input = document.querySelector(".js_inputArea");
const submitBtn = document.querySelector(".js_submitBtn");
const image = document.querySelector(".js_image");

// ! variables

let imageSource = "";

// ! Main code base...........................

// ?Data fetch

async function updateImage() {
  const imageSource = await fetchImageData();
  image.src = imageSource;
}

// ! eventListeners
submitBtn.addEventListener("click", () => {
  updateImage();
});
