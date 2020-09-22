import Card from './Card.js';

class SearchResult {
  constructor({ $target, onCardClick }) {
    this.onCardClick = onCardClick;

    this.state = {
      data: [],
    };

    this.section = document.createElement('section');
    this.section.className = 'search-result';
    $target.appendChild(this.section);

    this.handleCardClick = this.handleCardClick.bind(this);

    this.render();
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
  handleCardClick(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      const id = e.target.parentNode.dataset.id;
      const catInfo = this.state.data.find((cat) => cat.id === id);
      this.onCardClick(catInfo);
    }
  }
  render() {
    console.log('render SearchResult Component');

    this.section.innerHTML = '';

    const { data } = this.state;
    console.log(data);

    const container = document.createElement('div');
    container.className = 'container';
    container.addEventListener('click', this.handleCardClick);

    data.map((cat) => new Card({ $target: container, data: cat }));

    this.section.appendChild(container);
  }
}

export default SearchResult;
