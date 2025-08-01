// ! Imports
import { fetchImageData, fetchInfoData } from "./fetch.js";
import { fetchList } from "../data/pokemonList.js";
import { suggestionfunc } from "./suggestion.js";
// ! DOMS

const input = document.querySelector(".js_inputArea");
const image = document.querySelector(".js_image");
const nameDisplay = document.querySelector(".js_name");
const suggestion = document.querySelector(".js_suggest");
const generalInfo = document.querySelector(".js_generalInfo");
const submitBtn = document.querySelector(".js_submitBtn");
const readmore = document.querySelector(".js_readmoreBtn");

// ! variables

// ! Main code base...........................

// ?Data fetch

// got the images
async function updateImage(name) {
  const imageSource = await fetchImageData(name);
  image.src = imageSource.image;
}
// updateName()

async function updateName(key) {
  const name1 = await fetchImageData(key);
  nameDisplay.innerText = name1.name;
}
//getting the info from the api

async function getGeneralInfo(name) {
  const generalData = await fetchInfoData(name);

  // console.log(generalData);
  generalInfo.innerText = generalData
    .map((e) => {
      const text = e.flavor_text.replace(/[\n\f]/g, " ");
      return `${text}`;
    })
    .join(" ");
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
  }
});
submitBtn.addEventListener("click", () => {
  const key = input.value.toLowerCase();
  updateImage(key);
  updateName(key);
  getGeneralInfo(key);
});
