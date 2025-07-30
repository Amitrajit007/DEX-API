export async function fetchImageData(name) {
  const url = " https://pokeapi.co/api/v2/pokemon/charizard";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.sprites.front_default;
  } catch (error) {
    console.warn(error.message || error);
  }
}

export async function fetchInfoData(name) {
  const url = "https://pokeapi.co/api/v2/pokemon-species/charizard";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status = ${response.status}`);
    }
    const data = await response.json();
    const info = data.flavor_text_entries;
    let flag = 0;
    info.forEach((element) => {
      if (element.language.name === "en") {
        flag++;
        console.log(element.flavor_text);
      }
    });
  } catch (error) {
    console.error("something went wrong : ", error.message || error);
  }
}

// ? console.log(data.sprites.front_default); is the photo horrible tho

/*
? for getting the general info
async function fetchInfoData() {
  const url = "https://pokeapi.co/api/v2/pokemon-species/deoxys";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    const entry = data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    console.log(entry.flavor_text);
  } catch (error) {
    console.warn(error.message || error);
  }
}

*/

/*
?To get the type count and also the types
async function fetchData() {
  const url = " https://pokeapi.co/api/v2/pokemon/pikachu";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    let count = 0;
    const a = data.types;
    a.forEach((element) => {
      count++;
    });
    console.log(count);
  } catch (error) {
    console.warn(error.message || error);
  }
}

*/

// ? console.log(data.abilities[0].ability.name); for the main ability name may be can add the others as well...
// ? console.log(data.weight); for the wight however it is giving 905 instead of 90.5 kg.

// console.log("End flag");
