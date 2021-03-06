const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
  typeOfData,
}) => {
  root.innerHTML = `
    <label>
      <b>Search for a ${typeOfData}</b>
      <input class="input" />
    </label>
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector('.input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    resultsWrapper.innerHTML = '';

    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    dropdown.classList.add('is-active');
    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };
  input.addEventListener('input', debounce(onInput, 500));
  input.addEventListener('focus', () => {
    if (!resultsWrapper.childElementCount === 0) {
      dropdown.classList.add('is-active');
    }
  });

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
