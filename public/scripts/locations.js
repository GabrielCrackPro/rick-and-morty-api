const locationsContainer = document.querySelector(".locations-container");
let actualPage = 1;
let pagesLimit = 6;
const pageCounter = document.querySelector(".page-counter");
let LOCATIONS_URL = `https://rickandmortyapi.com/api/location?page=${actualPage}`;

const prevoiusPageButton = document.querySelector(".previous-btn");
const nextPageButton = document.querySelector(".next-btn");

const getData = async () => {
  let data = await fetch(LOCATIONS_URL).then((response) => response.json());
  return data;
};
const showLocations = async () => {
  let data = await getData();
  let parsedLocations = data.results;
  parsedLocations.forEach((location) => {
    if (location.dimension === undefined) location.dimension = "unknown";
    locationsContainer.innerHTML += `
    <div class="location-container p-4 border-bottom border-3" id="${location.id}">
    <h1 class="location-name">${location.name} - #${location.id}</h1>
    <h2 class="location-type">Type: ${location.type}</h2>
    <h2 class="location-dimension">Dimension: ${location.dimension}</h2>
    <a href="${location.url}" class="btn btn-dark btn-sm">JSON Format</a>
    </div>
    `;
  });
};
pageCounter.innerHTML = `Page ${actualPage} of ${pagesLimit}`;
nextPageButton.addEventListener("click", () => {
  actualPage += 1;
  LOCATIONS_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
  locationsContainer.innerHTML = "";
  showLocations();
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
    LOCATIONS_URL = `https://rickandmortyapi.com/api/character/?page=${actualPage}`;
    locationsContainer.innerHTML = "";
    showLocations();
    pageCounter.innerHTML = `Page ${actualPage} of ${pagesLimit}`;
  }
});
window.onload = showLocations();
