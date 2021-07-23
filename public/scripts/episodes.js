const episodesContainer = document.querySelector(".episodes-container");
const pageCounter = document.querySelector(".page-counter");
let actualPage = 1;
let pagesLimit = 20;
let EPISODES_URL = `https://rickandmortyapi.com/api/episode?page=${actualPage}`;

const prevoiusPageButton = document.querySelector(".previous-btn");
const nextPageButton = document.querySelector(".next-btn");

const getData = async () => {
  let data = await fetch(EPISODES_URL).then((response) => response.json());
  return data;
};
const showEpisodes = async () => {
  let data = await getData();
  let parsedEpisodes = data.results;
  parsedEpisodes.forEach((episode) => {
    episodesContainer.innerHTML += `
      <div class="episode-container d-flex flex-column p-4 border-bottom border-3" id="${
        episode.id
      }">
      <h1 class="episode-title">${episode.name} - #${episode.id}</h1>
      <div class="episode-info">
      <h2 class="episode-air-date">Air Date: ${new Date(
        episode.air_date
      ).toLocaleDateString()}</h2>
        <h2>Inserted At: ${new Date(episode.created).toLocaleDateString()}</h2>
      <a href="${
        episode.url
      }" target="_blank" class="episode-link btn btn-dark btn-sm">JSON Format</a>
      </div>
      </div>
      `;
  });
};
pageCounter.innerHTML = `Page ${actualPage} of ${pagesLimit}`;
nextPageButton.addEventListener("click", () => {
  actualPage += 1;
  EPISODES_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
  episodesContainer.innerHTML = "";
  showEpisodes();
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
    EPISODES_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
    episodesContainer.innerHTML = "";
    showCharacters();
    pageCounter.innerHTML = `Page ${actualPage} of ${pagesLimit}`;
  }
});
window.onload = showEpisodes();
