import { saveData, loadData } from '../util/index.js';

class Search {
  constructor({ $target, onRandomClick, onSubmit }) {
    this.onRandomClick = onRandomClick;
    this.onSubmit = onSubmit;

    const history = loadData('history');

    this.state = {
      value: '',
      history: history ? history : [],
    };

    this.section = document.createElement('section');
    this.section.className = 'search';
    $target.appendChild(this.section);

    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleHistoryClick = this.handleHistoryClick.bind(this);
    this.search = this.search.bind(this);

    this.render();
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
  handleRandomClick() {
    this.onRandomClick();
  }
  handleKeyup(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
      this.setState({
        value: e.target.value,
      });
      this.search(e.target.value);
    }
  }
  handleFocus(e) {
    if (e.target.value) {
      e.target.value = '';
    }
  }
  handleHistoryClick(e) {
    if (e.target.className === 'history-item') {
      const keyword = e.target.dataset.keyword;
      this.setState({
        value: keyword,
      });
      this.search(keyword);
    }
  }
  search(keyword) {
    this.onSubmit(keyword);
    const newHistory = [keyword]
      .concat(this.state.history.filter((value) => value !== keyword))
      .slice(0, 5);

    this.setState({
      history: newHistory,
    });
    saveData('history', newHistory);
  }
  render() {
    this.section.innerHTML = '';

    const randomBtn = document.createElement('span');
    randomBtn.className = 'random-btn';
    randomBtn.innerText = '🐱';
    randomBtn.addEventListener('click', this.handleRandomClick);

    const searchInput = document.createElement('input');
    searchInput.className = 'search-input';
    searchInput.type = 'text';
    searchInput.placeholder = '검색어를 입력하세요';
    searchInput.autofocus = true;
    searchInput.value = this.state.value;
    searchInput.addEventListener('keyup', this.handleKeyup);
    searchInput.addEventListener('focus', this.handleFocus);

    const history = document.createElement('div');
    history.className = 'history';
    history.innerHTML = this.state.history
      .map(
        (keyword) => `
          <span class="history-item" data-keyword="${keyword}">${keyword}</span>
        `
      )
      .join('');
    history.addEventListener('click', this.handleHistoryClick);

    this.section.appendChild(randomBtn);
    this.section.appendChild(searchInput);
    this.section.appendChild(history);
  }
}

export default Search;
