let actualPage = 1;
let pagesLimit = 34;

let CHARACTERS_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
let EPISODES_URL = "https://rickandmortyapi.com/api/episode";

const charactersContainer = document.querySelector(".character-container");
const nextPageButton = document.querySelector(".next-btn");
const prevoiusPageButton = document.querySelector(".previous-btn");

const pageCounter = document.querySelector(".page-counter");
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
    console.log(characters[0]);
    characters.forEach((character) => {
      charactersContainer.innerHTML += `
        <div class="character-container d-flex p-4 border-bottom border-3" id="${
          character.id
        }">
        <img class="character-image justify-content-center align-items-center" src="${
          character.image
        }" width="100" height="120">
        <div class="character-info p-4">
        <h1> ${character.name} - #${character.id} </h1>
        <h2>${character.species} - ${character.gender}</h2>
        <h3><span class="fw-bold">Last Known Location:</span> ${
          character.location.name
        }</h3> 
        <h3><span class="fw-bold">Appears in</span> ${
          character.episode.length
        } episodes</h3> 
        <h3><span class="fw-bold">Origin:</span> ${character.origin.name}</h3> 
        <h3><span class="fw-bold">Inserted  At:</span> ${new Date(
          character.created
        ).toLocaleDateString()}</h3>
        <h3><span class="fw-bold">Status:</span><span class="status-circle p-4 rounded-circle alive"></span></h3>
        <a href="${
          character.episode[0]
        }" target="_blank" class="btn btn-dark btn-sm">First Apparition</a>
        <a href="${
          character.url
        }" target="_blank" class="btn btn-dark btn-sm">JSON Format</a>
        </div>
        </div>
      `;
      const statusCircle = document.querySelector(".status-circle");
      if (character.status === "alive") {
        statusCircle.classList.add("alive");
      } else {
        statusCircle.classList.add("dead");
      }
    });
  });
};
pageCounter.innerHTML = `Page ${actualPage} of ${pagesLimit}`;
nextPageButton.addEventListener("click", () => {
  actualPage += 1;
  CHARACTERS_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
  charactersContainer.innerHTML = "";
  showCharacters();
  pageCounter.innerHTML = `Page ${actualPage} of ${pagesLimit}`;
});

if (actualPage === 1) {
  prevoiusPageButton.style.cursor = "not-allowed";
}
if (actualPage == pagesLimit) {
  nextPageButton.classList.add("disabled");
}
prevoiusPageButton.addEventListener("click", () => {
  if (actualPage > 1) {
    actualPage -= 1;
    CHARACTERS_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
    charactersContainer.innerHTML = "";
    showCharacters();
    pageCounter.innerHTML = `Page ${actualPage} of ${pagesLimit}`;
  }
});

window.onload = showCharacters;
