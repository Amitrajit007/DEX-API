// ! for the picture

export async function fetchData(key) {
  const url = `https://pokeapi.co/api/v2/pokemon/${key}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();

    // return data.sprites.front_default;
    return {
      image: data.sprites.front_default,
      name: data.name,
      weight: data.weight / 10,
      ability: data.abilities[0].ability.name,
    };
  } catch (error) {
    console.warn(error.message || error);
  }
}

// ! for info
export async function fetchInfoData(name) {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status = ${response.status}`);
    }
    const data = await response.json();
    const info = data.flavor_text_entries;

    const INFO = info.filter((element) => element.language.name === "en");

    return INFO.length ? INFO : "No data found sorry";
  } catch (error) {
    console.error("something went wrong : ", error.message || error);
  }
}
// ! for types
export async function fetchType(key) {
  const url = `https://pokeapi.co/api/v2/pokemon/${key}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    const a = data.types;
    return {
      types: a,
      countofTypes: a.length,
    };
  } catch (error) {
    console.warn(error.message || error);
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

// ? console.log(data.abilities[0].ability.name); for the main ability name may be can add the others as well...
// ? console.log(data.weight); for the wight however it is giving 905 instead of 90.5 kg.

// console.log("End flag");
