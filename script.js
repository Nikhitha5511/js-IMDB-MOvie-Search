

function getMovie(movieTitle) {
  return fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=d1bb3140`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

const container = document.querySelector(".container");
const searchPage = document.querySelector(".searchPageContainer");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".input-search-bar");


const spinner = document.createElement("div");
spinner.classList.add("spinner");
searchPage.appendChild(spinner);
spinner.style.display = "none";

let debounceTimer;

function initiateSearch() {
 
  spinner.style.display = "block";
  const inputValue = searchInput.value.trim();
  console.log("Typing...");
  clearTimeout(debounceTimer);
  
  debounceTimer = setTimeout(async () => {
    console.log(inputValue);
    let res = await fetch(`https://www.omdbapi.com/?t=${inputValue}&apikey=d1bb3140`);
    let json = await res.json();
    
    if (json && json.Title) {
      let movieDiv = renderMovie(json);
      searchPage.innerHTML = '';
      searchPage.appendChild(movieDiv);
      
      const movieDetails = document.getElementById("movieDetails");
      movieDetails.innerHTML = '';
    } else {
      searchPage.innerHTML = ''; 

    let notFoundMessage = document.createElement("p");
    notFoundMessage.innerText = "Movie details not found";
    notFoundMessage.classList.add("not-found-message");
    searchPage.appendChild(notFoundMessage);

    spinner.style.display = "none";
    }
  }, 1000); 
}

searchInput.addEventListener("input", initiateSearch);

searchBtn.addEventListener("click", async (e) => {

  e.preventDefault();
  await initiateSearch();
});

function renderMovie(json) {
  
  let movieDiv = document.createElement("div");
  movieDiv.classList.add("movie-container");

  let title = document.createElement("h4");
  title.innerText = json.Title;

  let rating = document.createElement("p");
  rating.innerText = `IMDb Rating: ${json.imdbRating || 'N/A'}`;

  let posterImg = document.createElement("img");
  posterImg.src = json.Poster !== 'N/A' ? json.Poster : 'placeholder_image_url.jpg';
  posterImg.alt = json.Title;

  let moreDetailsButton = document.createElement("button");
  moreDetailsButton.classList.add('showMoreButton')
  moreDetailsButton.innerText = "Show More Details";
  moreDetailsButton.addEventListener("click", async () => {
    const detailedInfo = await fetchDetailedInfo(json.imdbID);
    displayMovieDetails(detailedInfo);
  });

  movieDiv.appendChild(title);
  movieDiv.appendChild(rating);
  movieDiv.appendChild(posterImg);
  movieDiv.appendChild(moreDetailsButton);

  const movieDetails = document.getElementById("movieDetails");
  movieDetails.innerHTML = '';

  return movieDiv;
}


async function fetchDetailedInfo(movieId) {
  const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=d1bb3140`);
  const movieDetails = await response.json();
  return movieDetails;
}

function displayMovieDetails(detailedInfo) {
 
  const movieDetails = document.getElementById("movieDetails");
  movieDetails.innerHTML = '';

  const plot = document.createElement('p');
  plot.classList.add('plot-description');
  plot.textContent = `Plot: ${detailedInfo.Plot || 'Not available'}`;

  const cast = document.createElement('p');
  cast.classList.add('cast-details');
  cast.textContent = `Cast: ${detailedInfo.Actors || 'Not available'}`;

  const releaseDate = document.createElement('p');
  releaseDate.classList.add('releaseDate');
  releaseDate.textContent = `Release Date: ${detailedInfo.Released || 'Not available'}`;

  const ratings = document.createElement('p');
  ratings.classList.add('ratings');
  ratings.textContent = `Ratings: ${detailedInfo.imdbRating || 'Not available'}`;

 movieDetails.innerHTML='';
  movieDetails.appendChild(plot);
  movieDetails.appendChild(cast);
  movieDetails.appendChild(releaseDate);
  movieDetails.appendChild(ratings);
}

