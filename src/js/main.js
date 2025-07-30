// ! Imports
import { fetchImageData, fetchInfoData } from "./fetch.js";
// ! DOMS

const input = document.querySelector(".js_inputArea");
const submitBtn = document.querySelector(".js_submitBtn");
const image = document.querySelector(".js_image");
const suggestion = document.querySelector(".js_suggest");

// ! variables
const pokemonList = [
  "Pikachu",
  "Charmander",
  "Bulbasaur",
  "Squirtle",
  "Charizard",
  "Pidgey",
  "Snorlax",
  "Mew",
  "Eevee",
  "Jigglypuff",
  "Meowth",
];
// ! Main code base...........................

// ?Data fetch

async function updateImage(name) {
  const imageSource = await fetchImageData(name);
  image.src = imageSource;
}

// ! eventListeners

input.addEventListener("input", () => {
  const value = input.value.toLowerCase();
  console.log(value);
  suggestion.innerHTML = "";
  if (value === "") return;
  const filterData = pokemonList.filter((pokemon) => {
    return pokemon.toLowerCase().startsWith(value);
  });
  filterData.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("suggestions");
    div.textContent = data;
    div.addEventListener("click", () => {
      input.value = data;
      suggestion.innerHTML = "";
    });
    suggestion.appendChild(div);
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".js_inputContainer")) {
    suggestion.innerHTML = "";
  }
});
submitBtn.addEventListener("click", () => {
  const key = input.value.toLowerCase();
  updateImage(key);
});
