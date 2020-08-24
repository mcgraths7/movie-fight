const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '219263fc',
        s: searchTerm,
        type: 'movie',
      },
    });

    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  },
  typeOfData: 'Movie',
};

createAutoComplete({
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    const summary = document.querySelector('#left-summary');
    onMovieSelect(movie, 'left', summary);
  },
  ...autoCompleteConfig,
});
createAutoComplete({
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    const summary = document.querySelector('#right-summary');
    onMovieSelect(movie, 'right', summary);
  },
  ...autoCompleteConfig,
});

let leftResults, rightResults;

const onMovieSelect = async (movie, movieSide, summaryElement) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '219263fc',
      i: movie.imdbID,
    },
  });
  const tutorial = document.querySelector('.tutorial');
  if (tutorial) {
    tutorial.classList.add('is-hidden');
  }
  summaryElement.innerHTML = movieTemplate(response.data);
  if (movieSide === 'left') {
    leftResults = parseMovieStats(response.data);
  } else if (movieSide === 'right') {
    rightResults = parseMovieStats(response.data);
  }
  if (leftResults && rightResults) {
    compareMovies(leftResults, rightResults);
  }
};

const movieTemplate = (movieDetail) => {
  const movieStats = parseMovieStats(movieDetail);
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article data-value=${movieStats.awardScore} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${movieStats.boxOfficeDollars} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${movieStats.metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${movieStats.imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${movieStats.imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};

const parseMovieStats = (movie) => {
  const boxOfficeDollars = movie.BoxOffice.replace(/\$/g, '').replace(/,/g, '');
  const metascore = parseInt(movie.Metascore);
  const imdbRating = parseFloat(movie.imdbRating);
  const imdbVotes = parseInt(movie.imdbVotes.replace(/,/g, ''));

  let awardWins = 0;
  let awardNominations = 0;
  let oscarWins = 0;
  let oscarNominations = 0;
  let categories = movie.Awards.split('.');
  let oscarString, otherString;
  if (categories.length > 2) {
    oscarString = categories[0];
    otherString = categories[1];
  } else {
    oscarString = '';
    otherString = categories[0];
  }
  let otherAwardsAndNominations = otherString.split(' ').filter((word) => word == parseInt(word));
  awardWins = parseInt(otherAwardsAndNominations[0]);
  awardNominations = parseInt(otherAwardsAndNominations[1]);
  let oscarWinsOrNominations = parseInt(
    oscarString.split(' ').filter((word) => word == parseInt(word))[0]
  );
  if (oscarString.includes('Nominated')) {
    oscarNominations = oscarWinsOrNominations;
  }
  if (oscarString.includes('Won')) {
    oscarWins = oscarWinsOrNominations;
  }
  let awardScore = 5 * oscarWins + oscarNominations + awardWins + 0.25 * awardNominations;
  return {
    awardScore: parseFloat(awardScore),
    boxOfficeDollars: parseInt(boxOfficeDollars),
    metascore: parseInt(metascore),
    imdbRating: parseFloat(imdbRating),
    imdbVotes: parseInt(imdbVotes),
  };
};

const compareMovies = () => {
  const leftSummaryArticles = document.querySelectorAll('#left-summary .notification');
  const rightSummaryArticles = document.querySelectorAll('#right-summary .notification');

  leftSummaryArticles.forEach((leftArticle, index) => {
    const rightArticle = rightSummaryArticles[index];
    if (parseFloat(leftArticle.dataset.value) > parseFloat(rightArticle.dataset.value)) {
      leftArticle.classList.remove('is-primary', 'is-warning', 'is-success', 'is-danger');
      leftArticle.classList.add('is-success');
      rightArticle.classList.remove('is-primary', 'is-warning', 'is-success', 'is-danger');
      rightArticle.classList.add('is-danger');
    } else if (parseFloat(leftArticle.dataset.value) < parseFloat(rightArticle.dataset.value)) {
      leftArticle.classList.remove('is-primary', 'is-warning', 'is-success', 'is-danger');
      leftArticle.classList.add('is-danger');
      rightArticle.classList.remove('is-primary', 'is-warning', 'is-success', 'is-danger');
      rightArticle.classList.add('is-success');
    } else {
      leftArticle.classList.remove('is-primary', 'is-warning', 'is-success', 'is-danger');
      leftArticle.classList.add('is-warning');
      rightArticle.classList.remove('is-primary', 'is-warning', 'is-success', 'is-danger');
      rightArticle.classList.add('is-warning');
    }
  });
};
