"use strict";

// Dohvaćanje html elemenata
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");
const resultsTable = document.getElementById("resultsTable");
const resultsBody = document.getElementById("resultsBody");
const noResultsMessage = document.getElementById("noResultsMessage");

// Dodavanje event listenera za pretragu pritiskom na tipku Enter
searchInput.addEventListener("keydown", handleSearch);

function handleSearch(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    performSearch();
  }
}

function performSearch() {
  const searchTerm = searchInput.value.trim();

  // Brisanje prethodnih rezultata
  resultsBody.innerHTML = "";
  noResultsMessage.classList.add("hidden");

  if (searchTerm === "") {
    hideResults();
    return;
  }

  showLoader();

  // Simulacija kašnjenja s setTimeout funkcijom
  setTimeout(() => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&entity=song`;

    // Slanje HTTP zahtjeva za pretragu preko API-ja
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length === 0) {
          showNoResultsMessage();
          hideLoader();
          hideResults();
          return;
        }

        // Prikaz rezultata pretrage
        for (const result of data.results) {
          const row = document.createElement("tr");
          const nameCell = document.createElement("td");
          const artistCell = document.createElement("td");

          nameCell.textContent = result.trackName;
          artistCell.textContent = result.artistName;

          row.appendChild(nameCell);
          row.appendChild(artistCell);

          resultsBody.appendChild(row);
        }

        showResults();
        hideLoader();
      })
      .catch((error) => {
        hideResults();
        hideLoader();
        console.error(error);
      });
  }, 1500); // Kašnjenje od 1.5 sekunde prije prikaza rezultata
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function showResults() {
  resultsTable.classList.remove("hidden");
}

function hideResults() {
  resultsTable.classList.add("hidden");
}

function showNoResultsMessage() {
  noResultsMessage.classList.remove("hidden");
}
