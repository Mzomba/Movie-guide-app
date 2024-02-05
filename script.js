let movies = [
  {
    title: "Dark knight",
    img: "images/dark knight.jpg",
  },
  {
    title: "Sonic 2",
    img: "images/sonic2.jpg",
  },
  {
    title: "Need For Speed",
    img: "images/Need For Speed.jpg",
  },
  {
    title: "Grimcutty",
    img: "images/grimcutty.jpg",
  },
  {
    title: "Mr Bean's holiday",
    img: "images/bean.jpg",
  },
];

let container1 = document.getElementById("container1");
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let results = document.getElementById("results");
let movieCards = document.getElementById("movie-cards");
let backBtn = document.getElementsByClassName("back")[0];
let cartigory = document.getElementsByClassName("cartigory")[0];

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  container1.classList.add("hide");
  cartigory.classList.add("hide");
  movieCards.classList.remove("hide");
  if (movieName == "") {
    results.innerHTML = `<h3 class="msg">Enter a Movie!!!!!</h3>`;
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response == "True") {
          results.innerHTML = `<div class="info">
                            <img src="${data.Poster}" class="poster" />
                             <div>
                              <h2>${data.Title}</h2>
                               <div class="rating">
                                <img src="rating.svg">
                                  <h4>${data.imdbRating}</h4>
                                    </div>
                                      <div class="details">
                            <span>${data.Rated}</span>
                          <span>${data.Year}</span>
                        <span>${data.RunTime}</span>
                      </div>
                    <div class="genre">
                  <div>${data.Genre.split(",").join("</div><div>")}</div>
            </div>
          </div>
        </div>
        <h3>Plot:</h3>
        <p>${data.Plot}</p>
        <h3>Cast:</h3>
        <p>${data.Actors}</p>

        <br>
          <button class="back"><img class="back-img"src="back.svg"></button>
        `;
          let backBtnElement = document.getElementsByClassName("back");
          for (i = 0; i < backBtnElement.length; i++) {
            let button = backBtnElement[i];
            button.addEventListener("click", goBack);
          }
        } else {
          results.innerHTML = `<div class="msg"><h3>${data.Error}</h3></div>`;
        }
      })
      .catch(() => {
        results.innerHTML = `<div class="msg"><h3>Error occured 500</h3></div>`;
      });
  }
};

let moviesForCard = () => {
  Array.from(movies).forEach((element) => {
    let movieDetails = `
    <img src="${element.img}"class="movie-img">
      <span class="movie-title">${element.title}</span>`;
    let movieDisplay = document.createElement("div");
    movieDisplay.classList.add("container");
    movieDisplay.innerHTML = movieDetails;

    container1.appendChild(movieDisplay);
  });
};

function goBack() {
  let cartigory = document.getElementsByClassName("cartigory")[0];
  movieCards.classList.add("hide");
  container1.classList.remove("hide");
  cartigory.classList.remove("hide");
}

function getMovieByCardTitle(e) {
  let clickedMovieName = e.target;

  let movieName = clickedMovieName.textContent;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  container1.classList.add("hide");
  cartigory.classList.add("hide");
  movieCards.classList.remove("hide");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      results.innerHTML = `<div class="info">
                        <img src="${data.Poster}" class="poster" />
                         <div>
                          <h2>${data.Title}</h2>
                           <div class="rating">
                            <img src="rating.svg">
                              <h4>${data.imdbRating}</h4>
                                </div>
                                  <div class="details">
                        <span>${data.Rated}</span>
                      <span>${data.Year}</span>
                    <span>${data.RunTime}</span>
                  </div>
                <div class="genre">
              <div>${data.Genre.split(",").join("</div><div>")}</div>
        </div>
      </div>
    </div>
    <h3>Plot:</h3>
    <p>${data.Plot}</p>
    <h3>Cast:</h3>
    <p>${data.Actors}</p>
      <br>
      <button class="back"><img class="back-img"src="back.svg"></button>
    `;
      let backBtnElement = document.getElementsByClassName("back");
      for (i = 0; i < backBtnElement.length; i++) {
        let button = backBtnElement[i];
        button.addEventListener("click", goBack);
      }
    })
    .catch(() => {
      results.innerHTML = `<div class="msg"><h3>Error occured</h3></div>`;
    });
}

function getLatest() {
  while (container1.hasChildNodes()) {
    container1.removeChild(container1.firstChild);
  }

  moviesForCard();
  let movieTitleElement = document.getElementsByClassName("movie-title");
  for (i = 0; i < movieTitleElement.length; i++) {
    let movieTitle = movieTitleElement[i];

    movieTitle.addEventListener("click", getMovieByCardTitle);
  }
}
setTimeout(function () {
  getLatest();
}, 2000);
searchBtn.addEventListener("click", getMovie);
