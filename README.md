# Movie Fight

## Goal

- User should be able to search for two movies, one in each search bar

- When the button is pressed, two requests are fired off (to open movie db), ideally in parallel

- Detailed results from each movie should be displayed on the page

- Input fields will be autocompleting inputs (fuzzy search)

## Challenges

- Fetch info about movies

  - Use Axios to fetch movie data from an API
  - OMDb has an endpoint for fetching details when we know the title or ID, which can be gathered from the search endpoint

- Making the autocompleting text input

  - List rules that govern how the autocomplete should work
  - OMDb has a search endpoint which would suit this nicely

- Making the app look nice (styling)

  - We are using BulmaCSS for styling
