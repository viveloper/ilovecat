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

    // this.el.innerHTML = '';

    // const randomBtn = document.createElement('span');
    // randomBtn.className = 'random-btn';
    // randomBtn.innerText = '🐱';

    // const searchBoxWrapper = document.createElement('div');
    // searchBoxWrapper.className = 'search-box-wrapper';

    // const searchBox = document.createElement('input');
    // searchBox.className = 'search-box';
    // searchBox.type = 'text';
    // searchBox.placeholder = '고양이를 검색하세요.';
    // searchBox.autofocus = true;
    // searchBox.value = this.state.value;
    // searchBox.addEventListener('keyup', this.handleKeyup);

    // const recentKeywords = document.createElement('div');
    // recentKeywords.className = 'recent-keywords';

    // searchBoxWrapper.appendChild(searchBox);
    // searchBoxWrapper.appendChild(recentKeywords);
    // this.el.appendChild(randomBtn);
    // this.el.appendChild(searchBoxWrapper);
  }
}

export default Search;
