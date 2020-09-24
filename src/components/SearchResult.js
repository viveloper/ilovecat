import Component from './Component.js';
import Card from './Card.js';
import { imageLazyLoad, scrollFetch } from '../util/scroll.js';
import { loadData, saveData } from '../util/storage.js';

class SearchResult extends Component {
  constructor({ $target, onCardClick, onScrollFetch }) {
    super({
      $target,
      tagName: 'section',
      className: 'results-section',
    });

    this.onCardClick = onCardClick;
    this.onScrollFetch = onScrollFetch;

    this.state = {
      loading: false,
      data: loadData('search-result'),
      error: null,
    };

    this.handleCardClick = this.handleCardClick.bind(this);
    this.el.addEventListener('click', this.handleCardClick);

    this.render();
  }

  setResultData(data) {
    this.setState({
      loading: false,
      data,
      error: null,
    });
    saveData('search-result', data);
  }

  addResultData(data) {
    const newData = this.state.data.concat(data);
    this.setState({
      loading: false,
      data: newData,
      error: null,
    });
    saveData('search-result', newData);
  }

  handleCardClick(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      this.onCardClick(e.target.dataset.id);
    }
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

    this.el.innerHTML = ``;

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    data.map((cat) => new Card({ $target: cardContainer, data: cat }));

    const scrollFetchArea = document.createElement('div');
    scrollFetchArea.className = 'scroll-fetch-area';
    scrollFetchArea.style.width = '100%';
    scrollFetchArea.style.height = '8px';

    this.el.appendChild(cardContainer);
    this.el.appendChild(scrollFetchArea);

    this.el.querySelectorAll('.cat-card img.card-image').forEach((imgEl) => {
      imageLazyLoad(imgEl);
    });

    scrollFetch(scrollFetchArea, this.onScrollFetch);
  }
}

export default SearchResult;
