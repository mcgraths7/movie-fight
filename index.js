const fetchSeveralMovies = async (queryString) => {
  const resp = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '219263fc',
      s: queryString,
      type: 'movie',
    },
  });
  console.log(resp.data.Search);
};

const fetchSingleMovie = async (queryString) => {
  const resp = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '219263fc',
      i: queryString,
    },
  });
  console.log(resp.data);
};

const firstMovieInput = document.querySelector('#firstMovieSearch');
firstMovieInput.addEventListener('input', (e) => {
  fetchSeveralMovies(e.target.value);
});
