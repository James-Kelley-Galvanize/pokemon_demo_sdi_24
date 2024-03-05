let URL = `https://pokeapi.co/api/v2/pokemon/ditto`;

let results = document.querySelector("#results");

function getPokemon() {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let newElement = document.createElement("h2"); // create element
      newElement.innerHTML = data.name;
      results.appendChild(newElement);

      let abilityArray = data.abilities.map((abilityObj) => {
        return fetch(abilityObj.ability.url).then((res) => res.json());
      });

      return Promise.all(abilityArray);
    })
    .then((abilityData) => {
      // console.log(abilityData);

      let abilityListElement = document.createElement("ul"); // create element

      abilityData.forEach((item) => {
        let abilityEntryElement = document.createElement("li"); // create element

        abilityEntryElement.innerHTML = item.flavor_text_entries[0].flavor_text;
        abilityListElement.appendChild(abilityEntryElement);
      });
      results.appendChild(abilityListElement);
    });
}

getPokemon();
