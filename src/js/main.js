// ! Imports
import { fetchImageData, fetchInfoData } from "./fetch.js";
import { fetchList } from "../data/pokemonList.js";
import { suggestionfunc } from "./suggestion.js";
// ! DOMS

const input = document.querySelector(".js_inputArea");
const submitBtn = document.querySelector(".js_submitBtn");
const image = document.querySelector(".js_image");
const suggestion = document.querySelector(".js_suggest");

// ! variables

// ! Main code base...........................

// ?Data fetch

async function updateImage(name) {
  const imageSource = await fetchImageData(name);
  image.src = imageSource;
}

// ! eventListeners
// ?suggestions
fetchList().then((pokemonList) => {
  suggestionfunc(input, suggestion, pokemonList);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const key = input.value.toLowerCase();
    updateImage(key);
  }
});
submitBtn.addEventListener("click", () => {
  const key = input.value.toLowerCase();
  updateImage(key);
});
