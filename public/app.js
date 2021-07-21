const form = document.querySelector("form");
const CHARACTERS_URL = "https://rickandmortyapi.com/api/character";

form.addEventListener("submit", (e) => {
  const searchData = new FormData(form);
  const name = searchData.get("name");
  fetch(`${CHARACTERS_URL}/${name}`)
    .then((response) => {
      response.json();
    })
    .then((response) => {
      console.log(response);
    });
  e.preventDefault();
});
