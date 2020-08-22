const generateAutocompleteWidget = (id) => {
  const autocompleteDiv = document.getElementById(id);
  autocompleteDiv.innerHTML = `
    <label>
      <strong>Search for a Movie</strong>
      <input class='input' />
    </label>
    <div class="dropdown">
      <div class='dropdown-menu'>
        <div class='dropdown-content results'></div>
      </div>
    </div>
    <div class="movie-details"></div>
  `;
};

generateAutocompleteWidget('firstAutocomplete');
const root = document.querySelector('.autocomplete');
const dropdown = document.querySelector('.dropdown');
const movieInput = document.querySelector('input');
const resultsWrapper = document.querySelector('.results');
const detailsWrapper = document.querySelector('.movie-details');

const createMovieListItem = (movie, resultsWrapper) => {
  const movieItem = document.createElement('a');
  movieItem.classList.add('dropdown-item');
  const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

  movieItem.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title} (${movie.Year})
  `;

  movieItem.addEventListener('click', async () => {
    const movieDetails = await onMovieSelected(movie);
    createMovieDetail(movieDetails);
  });

  resultsWrapper.appendChild(movieItem);
};

const createMovieDetail = (details) => {
  detailsWrapper.innerHTML = `
    <p>${details.Title} (${details.Year})</p>
    <p>Director: ${details.Director}</p>
    <p>Box Office: ${details.BoxOffice}</p>
    <p>IMDb Rating: ${details.imdbRating}</p>
  `;
};

document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});
movieInput.addEventListener('input', onInput);
movieInput.addEventListener('focus', onFocus);
