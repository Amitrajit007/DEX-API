export function suggestionfunc(input, suggestion, pokemonList, submitBtn) {
  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    suggestion.innerHTML = "";
    if (value === "") return;
    let data1 = [];
    let filterRawData = pokemonList.filter((pokemon) => {
      data1 = pokemon.toLowerCase().startsWith(value);
      return data1;
    });
    if (filterRawData.length === 0) {
      //*   console.log("he");
      filterRawData = pokemonList.filter((pokemon) => {
        data1 = pokemon.toLowerCase().includes(value);
        return data1;
      });
    }
    const filterData = filterRawData.slice(0, 4);
    filterData.forEach((data) => {
      const div = document.createElement("div");
      div.classList.add("suggestions");
      div.textContent = data;
      div.addEventListener("click", () => {
        input.value = data;
        submitBtn.click();
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
}
