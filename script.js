function getMovie(movieTitle) {
  return fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=d1bb3140`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}


/*Movie Class*/
class Movie {
constructor(data){
  Object.assign(this, data);
  }
  
  renderMovie() {
    return ` 
    <div class="movie-container">
    <div class="image-container">
           <img src='${this.Poster}'/>
    </div>
    <div class="movie-content-container">
      <div class="title">
        <h4>${this.Title}</h4>
        <p>${this.imdbRating}</p>
      </div>
      <div class="movie-details">
        <p>${this.Runtime}</p>
        <p>${this.Genre}</p>
        <button class="add-watchlist-btn">Watchlist</button>
      </div>
      <div class="movie-desc">
        <p>${this.Plot}</p>
      </div>
    </div>
    </div>
  `;
  }
}

const container = document.querySelector(".container");
const searchPage = document.querySelector(".searchPageContainer");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".input-search-bar");

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let res = await fetch(`https://www.omdbapi.com/?t=${searchInput.value}&apikey=d1bb3140`);
  let json = await res.json();
  
  if (json && json.Title) {
    let movieDiv = renderMovie(json);
    searchPage.innerHTML = ''; 
    searchPage.appendChild(movieDiv);
  } else {
   
    searchPage.innerText = "Movie details not found";
  }
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

  // let button = document.createElement("button");
  // button.innerText = "Add to Watchlist";
  // button.style.margin="20px auto";
  // button.addEventListener("click", () => {
  //    console.log("added to watchlist");
  // });

  movieDiv.appendChild(title);
  movieDiv.appendChild(rating);
  movieDiv.appendChild(posterImg);
  //movieDiv.appendChild(button);

  return movieDiv;
}