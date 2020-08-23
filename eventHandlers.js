// Helper Functions
const debounce = (callback, delay = 350) => {
  return (...args) => {
    const timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
    clearInterval(timeoutId - 1);
  };
};

const onMovieSelected = async (selectedMovie) => {
  movieInput.value = selectedMovie.Title;
  dropdown.classList.remove('is-active');
  const movieDetails = await fetchSingleMovie(selectedMovie.imdbID);
  return movieDetails;
};

const onInput = debounce(async (e) => {
  const movies = await fetchSeveralMovies(e.target.value);
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }
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
