import Component from './Component.js';
import Card from './Card.js';

class SearchResult extends Component {
  constructor({ $target }) {
    super({
      $target,
      tagName: 'section',
      className: 'results-section',
    });
    this.state = {
      loading: false,
      data: null,
      error: null,
    };
    this.render();
  }
  setResultData(data) {
    this.setState({
      loading: false,
      data,
      error: null,
    });
  }
  render() {
    console.log('render SearchResult Component');

    const { loading, data, error } = this.state;

    if (!data) {
      this.el.innerHTML = ``;
      return;
    }

    if (data.length === 0) {
      this.el.innerHTML = `
        <div class="notice-section">
          <h2 class="notice">검색 결과가 없습니다.</h2>
          <img class="notice-image" src="src/img/emptybox.png" />
        </div>
      `;
      return;
    }

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    data.map((cat) => new Card({ $target: cardContainer, data: cat }));

    this.el.appendChild(cardContainer);
  }
}

export default SearchResult;
