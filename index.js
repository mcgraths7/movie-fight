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
const dropdown = document.querySelector('.dropdown');
const movieInput = document.querySelector('input');
const resultsWrapper = document.querySelector('.results');

const createMovieListItem = (movie, resultsWrapper) => {
  const movieItem = document.createElement('a');
  movieItem.classList.add('dropdown-item');
  movieItem.innerHTML = `
        <img src="${movie.Poster}" width="50px" />
        <p>${movie.Title} (${movie.Year})</p>
      `;
  resultsWrapper.appendChild(movieItem);
};

const onInput = debounce(async (e) => {
  dropdown.style.display = 'block';
  const movies = await fetchSeveralMovies(e.target.value);
  for (let movie of movies) {
    createMovieListItem(movie, resultsWrapper);
  }
  dropdown.classList.add('is-active');
});

const onBlur = () => {
  dropdown.classList.remove('is-active');
};

const onFocus = () => {
  const dropdownContent = document.querySelector('.dropdown-content');
  if (dropdownContent.childElementCount > 0) {
    dropdown.classList.add('is-active');
  }
};

// generateAutocompleteWidget('secondAutocomplete');

// movieInputs = document.querySelectorAll('input');

// console.log(movieInputs);
movieInput.addEventListener('input', onInput);
movieInput.addEventListener('blur', onBlur);
movieInput.addEventListener('focus', onFocus);
