import Component from './Component.js';

class Keywords extends Component {
  constructor({ $target, onKeywordClick, onIndexChange }) {
    super({
      $target,
      tagName: 'div',
      className: 'keywords',
    });

    this.onKeywordClick = onKeywordClick;
    this.onIndexChange = onIndexChange;

    this.state = {
      keywords: [],
      selectedIndex: -1,
    };

    this.handleClick = this.handleClick.bind(this);

    this.el.addEventListener('click', this.handleClick);

    this.render();
  }

  setKeywords(keywords) {
    this.setState({
      keywords,
      selectedIndex: -1,
    });
  }

  handleClick(e) {
    if (e.target.tagName.toLowerCase() === 'li') {
      this.onKeywordClick(e.target.dataset.keyword);
    }
  }

  increaseIndex() {
    const { selectedIndex, keywords } = this.state;
    const newSelectedIndex =
      selectedIndex + 1 < keywords.length ? selectedIndex + 1 : selectedIndex;
    this.setState({
      selectedIndex: newSelectedIndex,
    });
    if (keywords[newSelectedIndex])
      this.onIndexChange(keywords[newSelectedIndex]);
  }

  decreaseIndex() {
    const { selectedIndex, keywords } = this.state;
    const newSelectedIndex =
      selectedIndex >= 0 ? selectedIndex - 1 : selectedIndex;
    this.setState({
      selectedIndex: newSelectedIndex,
    });
    if (keywords[newSelectedIndex])
      this.onIndexChange(keywords[newSelectedIndex]);
  }

  clearKeywords() {
    this.setState({
      keywords: [],
      selectedIndex: -1,
    });
  }

  render() {
    console.log('render Keywords Component');
    const { keywords, selectedIndex } = this.state;
    if (keywords.length === 0) {
      this.el.innerHTML = '';
      this.el.style.display = 'none';
      return;
    }

    this.el.innerHTML = `
      <ul>
        ${keywords
          .map(
            (keyword, index) =>
              `<li class="${
                selectedIndex === index
                  ? 'recommend-keyword active'
                  : 'recommend-keyword'
              }" data-keyword="${keyword}">${keyword}</li>`
          )
          .join('')}
      </ul>
    `;
    this.el.style.display = 'block';
  }
}

export default Keywords;
