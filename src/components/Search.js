import Component from './Component.js';
import { loadData, saveData } from '../util/storage.js';
import Debouncer from '../util/debouncer.js';
import Throttler from '../util/throttler.js';

class Search extends Component {
  constructor({
    $target,
    onSearch,
    onRandomSearch,
    onKeywordChange,
    onArrowUp,
    onArrowDown,
  }) {
    super({
      $target,
      tagName: 'section',
      className: 'searching-section',
    });

    const keywords = loadData('keywords');
    this.state = {
      value: '',
      keywords: keywords ? keywords : [],
    };

    this.onSearch = onSearch;
    this.onRandomSearch = onRandomSearch;
    this.onKeywordChange = onKeywordChange;
    this.onArrowUp = onArrowUp;
    this.onArrowDown = onArrowDown;

    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.el.addEventListener('click', this.handleClick);

    this.keyupDebouncer = new Debouncer();
    this.keyupThrottler = new Throttler();

    this.el.innerHTML = `
      <span class="random-btn">🐱</span>
      <div class="search-box-wrapper">
        <input class="search-box" type="text" placeholder="고양이를 검색하세요." value="${this.state.value}" autofocus />
        <div class="recent-keywords"></div>
      </div>
    `;

    this.inputEl = this.el.querySelector('input');
    this.inputEl.addEventListener('keyup', this.handleKeyup);
    this.inputEl.addEventListener('focus', () => {
      if (this.inputEl.value !== '') {
        this.setState({ value: '' });
      }
    });

    this.recentKeywordsEl = this.el.querySelector('.recent-keywords');

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
    if (e.key === 'ArrowLeft') return;
    if (e.key === 'ArrowRight') return;
    if (e.key === 'ArrowUp') {
      this.onArrowUp();
      return;
    }
    if (e.key === 'ArrowDown') {
      this.onArrowDown();
      return;
    }
    this.keyupDebouncer.debounce(
      () => this.onKeywordChange(e.target.value),
      250
    );
  }

  handleClick(e) {
    if (e.target.className === 'keyword') {
      const keyword = e.target.dataset.keyword;
      this.setState({
        value: keyword,
      });
      this.submit(keyword);
    } else if (e.target.className === 'random-btn') {
      this.setState({
        value: '',
      });
      this.onRandomSearch();
    }
  }

  submit(keyword) {
    const newKeywords = [keyword]
      .concat(this.state.keywords.filter((item) => item !== keyword))
      .slice(0, 5);
    this.setState({
      keywords: newKeywords,
    });
    this.onSearch(keyword);
    saveData('keywords', newKeywords);
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

    this.inputEl.value = value;

    this.recentKeywordsEl.innerHTML = `
      ${keywords
        .map(
          (keyword) =>
            `<span class="keyword" data-keyword="${keyword}">${keyword}</span>`
        )
        .join('')}
    `;
  }
}

export default Search;
