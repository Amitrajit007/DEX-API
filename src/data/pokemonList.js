let pokemonList = [];

export async function fetchList() {
  if (pokemonList > 0) return pokemonList;
  try {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("A new not a new error found good job");
    }
    const data1 = await response.json();
    const dataArray = data1.results;
    pokemonList = dataArray.map((Element) => Element.name);
  } catch (error) {
    console.error("Error found: ", error.message || error);
  }
  return pokemonList;
}
