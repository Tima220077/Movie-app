// Titles: https://omdbapi.com/?s=thor&page=1&apikey=e12b3f65
// details: http://www.omdbapi.com/?i=tt3896198&apikey=e12b3f65

const API_KEY = "e12b3f65"
const API_URL = "https://www.omdbapi.com/"
//apis

let divEl = document.getElementById("images")
const searchEl = document.getElementById("input-el")
const searchBtn = document.getElementById("search-btn")
const divDetails = document.getElementById("result-grid")
//variables

async function display() {
    const response = await fetch(`${API_URL}?s=${searchEl.value}&page=1&apikey=${API_KEY}`)
    var data = await response.json()
    console.log(data)
    if(data.Response == "True") itemDisplay(data.Search)
    //getting data
}
function itemDisplay(movies){
  resetState()
  let tt = ""
  for (let i = 0; i < movies.length; i++) {
    //setting text and images
    let movieListItem = document.createElement('div')
    movieListItem.dataset.id = movies[i].imdbID
    //getting ID
    movieListItem.classList.add('div-im')
      movieListItem.innerHTML = `<figure>
<div class="div-im">
<img class="mmm" src="${movies[i].Poster}" alt="name">
<figcaption>
<p class="name-movie">${movies[i].Title}</p>

<div class="details">
  <p class="janr-movie">type: ${movies[i].Type}</p>
  <p class="rating-movie">${movies[i].Year} year</p>
</div>
</figcaption>
</div>
</figure>`
      divEl.appendChild(movieListItem)
  }
  loadMovieDetails()
}

function loadMovieDetails(){
  const searchListMovies = divEl.querySelectorAll('.div-im')
  searchListMovies.forEach(movie =>{
    movie.addEventListener("click", async ()=>{
      resetState()
      const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${API_KEY}`)
      //getting data with details
      const movieDetailts = await result.json()
      
      detailsDisplay(movieDetailts)
    })
  })
  
}

function detailsDisplay(item){
  divDetails.innerHTML = ""
  console.log(item)
  divDetails.innerHTML = `<div class="movie-poster">
  <img src="${item.Poster}">
</div><div class="movie-info">
<h3 class="details-name">${item.Title}</h3>
<ul class= "movie-misc-info">
  <li class="year">Year: ${item.Year}</li>
  <li class="rated">Ratings: ${item.imdbRating}</li>
  <li class="released">Released: ${item.Released}</li>
</ul>
<p class = "genre"><b>Genre:</b> ${item.Genre}</p>
  <p class = "runtime"><b>Runtime:</b> ${item.Runtime}</p>
  <p class = "writer"><b>Writer:</b> ${item.Writer}</p>
  <p class = "actors"><b>Actors: </b>${item.Actors}</p>
  <p class = "plot"><b>Plot:</b> ${item.Plot}</p>
  <p class = "language"><b>Language:</b> ${item.Language}</p>
  <p class = "awards"><b><i class = "fas fa-award"></i></b> ${item.Awards}</p>          
</div>`
}


function resetState(){
  divEl.innerHTML = ""
}

searchBtn.addEventListener("click", () =>{
    
    divDetails.innerHTML = ""
    display()
    searchEl.value = ""
    
})
async function autoDisplay(){
  const res = await fetch(`${API_URL}?s=spider&page=1&apikey=${API_KEY}`)
  var resData = await res.json()
  console.log(resData)
  itemDisplay(resData.Search)
}
autoDisplay()



