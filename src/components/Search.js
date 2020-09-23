import Component from './Component.js';

class Search extends Component {
  constructor({ $target, onSearch }) {
    super({
      $target,
      tagName: 'section',
      className: 'searching-section',
    });

    this.state = {
      value: '',
    };

    this.onSearch = onSearch;

    this.handleKeyup = this.handleKeyup.bind(this);

    this.render();
  }

  handleKeyup(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
      this.onSearch(e.target.value);
      return;
    }
  }

  setKeyword(keyword) {
    this.setState({
      value: keyword,
    });
  }

  render() {
    console.log('render Search Component');

    this.el.innerHTML = `
      <span class="random-btn">🐱</span>
      <div class="search-box-wrapper">
        <input class="search-box" type="text" placeholder="고양이를 검색하세요." value="${this.state.value}" autofocus />
        <div class="recent-keywords"></div>
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
