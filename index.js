let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let countriesResultEl = document.getElementById("countriesResult");

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountry(country) {
  // Creating and appending countryEl to the resultCountriesEl
  let countryEl = document.createElement("div");
  countryEl.classList.add(
    "country-card",
    "mr-auto",
    "ml-auto",
    "flex",
    "flex-row",
    'items-center',
  );
  countriesResultEl.appendChild(countryEl);

  // Creating and appending countryFlagEl to the countryEl
  let countryFlagEl = document.createElement("img");
  countryFlagEl.src = country.flag;
  countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
  countryEl.appendChild(countryFlagEl);

  // Creating and appending countryInfoEl to the countryEl
  let countryInfoEl = document.createElement("div");
  countryInfoEl.classList.add("flex", "flex-col", "ml-4");
  countryEl.appendChild(countryInfoEl);

  // Creating and appending countryNameEl to the countryInfoEl
  let countryNameEl = document.createElement("p");
  countryNameEl.textContent = country.name;
  countryNameEl.classList.add("country-name");
  countryInfoEl.appendChild(countryNameEl);

  // Creating and appending countryPopulationEl to the countryInfoEl
  let countryPopulationEl = document.createElement("p");
  countryPopulationEl.textContent = country.population;
  countryPopulationEl.classList.add("country-population");
  countryInfoEl.appendChild(countryPopulationEl);
}

function displaySearchResult() {
  for (let country of countriesList) {
    let countryName = country.name;

    if (
      countryName.toLowerCase().includes(searchInputVal.toLocaleLowerCase())
    ) {
      createAndAppendCountry(country);
    }
  }
}

function getCountries() {
  let url = "https://apis.ccbp.in/countries-data";
  let options = {
    method: "GET",
  };

  countriesResultEl.textContent = "";

  spinnerEl.classList.remove("hidden");
  countriesResultEl.classList.add("hidden");

  fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      countriesResultEl.classList.remove("hidden");
      spinnerEl.classList.add("hidden");

      countriesList = jsonData;
      displaySearchResult();
    });
}

function onChangeSearchInput(event) {
  searchInputVal = event.target.value;
  getCountries();
}

getCountries();

searchInputEl.addEventListener("keyup", onChangeSearchInput);
