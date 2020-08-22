// Helper Functions
const debounce = (callback, delay = 350) => {
  return (...args) => {
    const timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, delay);
    clearInterval(timeoutId - 1);
  };
};

// API Calls
const fetchSeveralMovies = async (queryString) => {
  const resp = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '219263fc',
      s: queryString,
      type: 'movie',
    },
  });
  if (resp.data.Error) {
    return [];
  }
  return resp.data.Search;
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
