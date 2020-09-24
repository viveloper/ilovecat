import Component from './Component.js';

class Search extends Component {
  constructor({ $target, onSearch, onRandomSearch }) {
    super({
      $target,
      tagName: 'section',
      className: 'searching-section',
    });

    this.state = {
      value: '',
      keywords: [],
    };

    this.onSearch = onSearch;
    this.onRandomSearch = onRandomSearch;

    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.el.addEventListener('click', this.handleClick);

    this.render();
  }

  handleKeyup(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
      const keyword = e.target.value;
      this.setState({
        value: keyword,
      });
      this.submit(keyword);
      return;
    }
  }

  handleClick(e) {
    if (e.target.className === 'keyword') {
      const keyword = e.target.dataset.keyword;
      this.setState({
        value: keyword,
      });
      this.submit(keyword);
    } else if (e.target.className === 'random-btn') {
      this.onRandomSearch();
    }
  }

  submit(keyword) {
    this.setState({
      keywords: [keyword]
        .concat(this.state.keywords.filter((item) => item !== keyword))
        .slice(0, 5),
    });
    this.onSearch(keyword);
  }

  setKeyword(keyword) {
    this.setState({
      value: keyword,
    });
  }

  get currentKeyword() {
    return this.state.value;
  }

  render() {
    console.log('render Search Component');

    const { value, keywords } = this.state;

    this.el.innerHTML = `
      <span class="random-btn">🐱</span>
      <div class="search-box-wrapper">
        <input class="search-box" type="text" placeholder="고양이를 검색하세요." value="${value}" autofocus />
        <div class="recent-keywords">
          ${keywords
            .map(
              (keyword) =>
                `<span class="keyword" data-keyword="${keyword}">${keyword}</span>`
            )
            .join('')}
        </div>
      </div>
    `;

    const inputEl = this.el.querySelector('input');
    inputEl.addEventListener('keyup', this.handleKeyup);
    inputEl.addEventListener('focus', () => {
      if (inputEl.value !== '') {
        this.setState({ value: '' });
      }
    });
  }
}

export default Search;
