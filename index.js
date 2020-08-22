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
  `;
};

generateAutocompleteWidget('firstAutocomplete');
const root = document.querySelector('.autocomplete');
const dropdown = document.querySelector('.dropdown');
const movieInput = document.querySelector('input');
const resultsWrapper = document.querySelector('.results');

const createMovieListItem = (movie, resultsWrapper) => {
  const movieItem = document.createElement('a');
  movieItem.classList.add('dropdown-item');
  const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
  movieItem.innerHTML = `
    <img src="${imgSrc}" />
    ${movie.Title} (${movie.Year})
  `;
  resultsWrapper.appendChild(movieItem);
};

const onInput = debounce(async (e) => {
  const movies = await fetchSeveralMovies(e.target.value);
  resultsWrapper.innerHTML = ``;
  for (let movie of movies) {
    createMovieListItem(movie, resultsWrapper);
  }
  dropdown.classList.add('is-active');
});

const onFocus = () => {
  const dropdownContent = document.querySelector('.dropdown-content');
  if (dropdownContent.childElementCount > 0) {
    dropdown.classList.add('is-active');
  }
};

document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});
movieInput.addEventListener('input', onInput);
movieInput.addEventListener('focus', onFocus);
