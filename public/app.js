let actualPage = 1;

let CHARACTERS_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
let EPISODES_URL = "https://rickandmortyapi.com/api/episode";

const charactersContainer = document.querySelector(".character-container");
const nextPageButton = document.querySelector(".next-btn");
const prevoiusPageButton = document.querySelector(".previous-btn");

const getData = async () => {
  let data = await fetch(CHARACTERS_URL).then((response) => response.json());
  return data;
};
const getEpisodes = async () => {
  let data = await fetch(EPISODES_URL).then((response) => response.json());
  return data.results;
};
const showCharacters = async () => {
  await getData().then((data) => {
    const characters = data.results;
    characters.forEach((character) => {
      charactersContainer.innerHTML += `
        <div class="character-container d-flex p-4 border-bottom border-3" id="${character.id}">
        <img class="character-image justify-content-center align-items-center" src="${character.image}" width="100" height="120">
        <div class="character-info p-4">
        <h1><i class="fas fa-user"></i> ${character.name}</h1>
        <h2>${character.species}</h2>
        <h3><span class="fw-bold">Last Known Location:</span> ${character.location.name}</h3>
        </div>
        </div>
      `;
    });
  });
};

nextPageButton.addEventListener("click", () => {
  actualPage += 1;
  CHARACTERS_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
  charactersContainer.innerHTML = "";
  showCharacters();
});

if (actualPage === 1) {
  prevoiusPageButton.classList.add("disabled");
}
prevoiusPageButton.addEventListener("click", () => {
  if (actualPage > 1) {
    actualPage -= 1;
    CHARACTERS_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
    charactersContainer.innerHTML = "";
    showCharacters();
  }
});
window.onload = showCharacters;
