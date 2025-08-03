// ! Imports
import { fetchData, fetchInfoData, fetchType } from "./fetch.js";
import { fetchList } from "../data/pokemonList.js";
import { suggestionfunc } from "./suggestion.js";
// ! DOMS

const input = document.querySelector(".js_inputArea");
const image = document.querySelector(".js_image");
const nameDisplay = document.querySelector(".js_name");
const suggestion = document.querySelector(".js_suggest");
const generalInfo = document.querySelector(".js_generalInfo");
const typeofPokemon = document.querySelector(".Type");
const abilityofPokemon = document.querySelector(".Abilities");
const weightofPokemon = document.querySelector(".Weight");
const submitBtn = document.querySelector(".js_submitBtn");
const readmore = document.querySelector(".js_readmoreBtn");

// ! variables

// ! Main code base...........................

// ?Data fetch

// got the images
async function updateImage(name) {
  const imageSource = await fetchData(name);
  image.src = imageSource.image;
}
// updated the name

async function updateName(key) {
  const name1 = await fetchData(key);
  nameDisplay.innerText = name1.name;
}
//getting the info

async function getGeneralInfo(name) {
  if (name.includes("deoxys")) {
    name = "deoxys";
  }
  const generalData = await fetchInfoData(name);
  if (!generalData) {
    generalInfo.innerText = "No data found sorry. ";
    readmore.classList.add("remove");
    return;
  } else {
    readmore.classList.remove("remove");
  }
  generalInfo.innerText = generalData
    .map((e) => {
      const text = e.flavor_text.replace(/[\n\f]/g, " ");
      return `${text}`;
    })
    .join(" ");
  console.log(generalData);
  generalInfo.innerText = generalData
    .slice(0, 3)
    .map((e) => e.flavor_text.replace(/[\n\f]/g, " "))
    .join(" ");
  let isExpanded = false;
  readmore.onclick = () => {
    isExpanded = !isExpanded;
    if (isExpanded) {
      generalInfo.innerHTML = generalData
        .map((e) => e.flavor_text.replace(/[\n\f]/g, " "))
        .join("");

      readmore.innerText = "Show less..";
      readmore.classList.add("translucent-btn");
    } else {
      generalInfo.innerHTML = generalData
        .slice(0, 3)
        .map((e) => e.flavor_text.replace(/[\n\f]/g, " "))
        .join("");

      readmore.classList.remove("translucent-btn");
      readmore.innerText = "•••••";
    }
  };
}

// Types

async function getType(name) {
  const fortype = await fetchType(name);
  const rawtypeData = fortype.types;
  const type1 = rawtypeData.map((e) => e.type.name);

  let HTML = `<p class="font-bold">Type: </p>`;
  const typeColors = {
    normal: "#d1d5db", // gray-300
    fire: "#f87171", // red-400
    water: "#60a5fa", // blue-400
    grass: "#22c55e", // green-500
    electric: "#facc15", // yellow-400
    ice: "#67e8f9", // cyan-300
    fighting: "#b91c1c", // red-700
    poison: "#a855f7", // purple-500
    ground: "#d97706", // amber-600
    flying: "#f3f4f6", // gray-100
    psychic: "#f472b6", // pink-400
    bug: "#84cc16", // lime-500
    rock: "#facc15", // yellow-700
    ghost: "#9333ea", // purple-600
    dragon: "#4f46e5", // indigo-600
    dark: "#1f2937", // gray-800
    steel: "#9ca3af", // gray-400
    fairy: "#f9a8d4", // pink-300
  };
  type1.forEach((element, index) => {
    if (index != 0) {
      HTML += `<p>&<p>`;
    }

    const colortoken = typeColors[element] || "gray";
    const fontColor = colortoken === "#f3f4f6" ? "black" : "white";
    HTML += `<p class="py-1 px-3 rounded-xl text-${fontColor} capitalize" style="background-color: ${colortoken}">${element}</p>`;
  });
  HTML += "</div>";
  typeofPokemon.innerHTML = HTML;
}

// special ability

async function getSpecialAbilty(name) {
  const ability = await fetchData(name);
  abilityofPokemon.innerHTML = `<p ><span class= "font-bold"> Special Ability : </span> ${ability.ability}</p>`;
}

// updated the weight

async function getWeight(name) {
  const weight = await fetchData(name);
  weightofPokemon.innerHTML = `<p class="font-normal"><span class="font-bold">Weight: </span>${weight.weight} kg </p>`;
}

// ! eventListeners
// ?suggestions
fetchList().then((pokemonList) => {
  suggestionfunc(input, suggestion, pokemonList, submitBtn);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const key = input.value.toLowerCase();
    updateImage(key);
    updateName(key);
    getGeneralInfo(key);
    getSpecialAbilty(key);
    getWeight(key);
    getType(key);
  }
});
submitBtn.addEventListener("click", () => {
  const key = input.value.toLowerCase();
  updateImage(key);
  updateName(key);
  getGeneralInfo(key);
  getSpecialAbilty(key);
  getWeight(key);
  getType(key);
  if (!readmore.innerText === "Show less..") {
    return;
  } else {
    readmore.classList.remove("translucent-btn");
    readmore.innerText = "•••••";
  }
});

input.addEventListener("keydown", () => {
  if (!readmore.innerText === "Show less..") {
    return;
  } else {
    readmore.classList.remove("translucent-btn");
    readmore.innerText = "•••••";
  }
});
