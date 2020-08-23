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
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${details.Poster}" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h2>${details.Title} (${details.Year})</h2>
            <h4>${details.Genre}</h4>
            <p>${details.Plot}</p>
          </div>
        </div>
    </article>
    <article class="notification is-primary>
      <p class="title">${details.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary>
      <p class="title">${details.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary>
      <p class="title">${details.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary>
      <p class="title">${details.imdbRating}</p>
      <p class="subtitle">IMDb Rating</p>
    </article>
    <article class="notification is-primary>
      <p class="title">${details.imdbVotes}</p>
      <p class="subtitle">IMDb Votes</p>
    </article>

  `;
  console.log(details);
};

document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});
movieInput.addEventListener('input', onInput);
movieInput.addEventListener('focus', onFocus);
