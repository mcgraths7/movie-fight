const generateAutocompleteWidget = (id) => {
  const autocompleteDiv = document.getElementById(id);

  const movieInput = document.createElement('input');
  movieInput.classList.add('movieSearchField');

  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown-menu');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('dropdown-content');

  autocompleteDiv.appendChild(movieInput);
  autocompleteDiv.appendChild(dropdown);
  dropdown.appendChild(contentDiv);
};

const onInput = debounce(async (e) => {
  const dropdown = document.querySelector('.dropdown-menu');
  dropdown.style.display = 'block';
  const contentDiv = document.querySelector('.dropdown-content');
  const movies = await fetchSeveralMovies(e.target.value);
  for (let movie of movies) {
    createMovieListItem(movie, contentDiv);
  }
});

const onBlur = () => {
  const dropdown = document.querySelector('.dropdown-menu');
  dropdown.style.display = 'none';
};

const onFocus = () => {
  const dropdown = document.querySelector('.dropdown-menu');
  const dropdownContent = document.querySelector('.dropdown-content');
  if (dropdownContent.childElementCount > 0) {
    dropdown.style.display = 'block';
  }
};

const createMovieListItem = (movie, contentDiv) => {
  const movieItem = document.createElement('a');
  movieItem.classList.add('dropdown-item');
  movieItem.innerHTML = `
        <img src="${movie.Poster}" width="50px" />
        <p>${movie.Title} (${movie.Year})</p>
      `;
  contentDiv.appendChild(movieItem);
};

generateAutocompleteWidget('firstAutocomplete');
// generateAutocompleteWidget('secondAutocomplete');

// movieInputs = document.querySelectorAll('input');
const movieInput = document.querySelector('input');
// console.log(movieInputs);
movieInput.addEventListener('input', onInput);
movieInput.addEventListener('blur', onBlur);
movieInput.addEventListener('focus', onFocus);
