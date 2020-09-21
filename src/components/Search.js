class Search {
  constructor({ $target, onRandomClick, onSubmit }) {
    this.$target = $target;
    this.onRandomClick = onRandomClick;
    this.onSubmit = onSubmit;

    this.section = document.createElement('div');
    this.section.className = 'search';
    this.$target.appendChild(this.section);

    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    this.render();
  }
  handleRandomClick() {
    this.onRandomClick();
  }
  handleKeyup(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
      this.onSubmit(e.target.value);
    }
  }
  render() {
    const randomBtn = document.createElement('span');
    randomBtn.className = 'random-btn';
    randomBtn.innerText = '🐱';
    randomBtn.addEventListener('click', this.handleRandomClick);

    const searchInput = document.createElement('input');
    searchInput.className = 'search-input';
    searchInput.type = 'text';
    searchInput.placeholder = '검색어를 입력하세요';
    searchInput.addEventListener('keyup', this.handleKeyup);

    this.section.appendChild(randomBtn);
    this.section.appendChild(searchInput);
  }
}

export default Search;
