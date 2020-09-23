import { saveData, loadData } from '../util/storage.js';
import Card from './Card.js';

class SearchResult {
  constructor({ $target, onCardClick, onScrollEnd }) {
    this.onCardClick = onCardClick;
    this.onScrollEnd = onScrollEnd;

    const data = loadData('search-result');

    this.state = {
      loading: false,
      data,
      error: null,
    };

    this.section = document.createElement('section');
    this.section.className = 'search-result';
    $target.appendChild(this.section);

    this.handleCardClick = this.handleCardClick.bind(this);
    this.setSearchResult = this.setSearchResult.bind(this);
    this.addSearchResult = this.addSearchResult.bind(this);

    this.render();
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
  setSearchResult(data) {
    console.log(data);
    this.setState({
      loading: false,
      data,
      error: null,
    });
    saveData('search-result', data);
  }
  addSearchResult(data) {
    console.log(data);
    this.setState({
      loading: false,
      data: [...this.state.data, ...data],
      error: null,
    });
  }
  startLoading() {
    this.setState({
      loading: true,
      error: null,
    });
  }
  setError(error) {
    this.setState({
      loading: false,
      data: null,
      error,
    });
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

    const { loading, data, error } = this.state;
    console.log(this.state);

    if (loading) {
      const loadingMsg = document.createElement('h2');
      loadingMsg.style.textAlign = 'center';
      loadingMsg.innerText = '검색중...';
      this.section.appendChild(loadingMsg);
      return;
    }
    if (error) {
      const errorMsg = document.createElement('h2');
      errorMsg.style.textAlign = 'center';
      errorMsg.innerText = error;
      this.section.appendChild(errorMsg);
      return;
    }
    if (!data) {
      return;
    }
    if (data.length === 0) {
      const emptyMsg = document.createElement('h2');
      emptyMsg.style.textAlign = 'center';
      emptyMsg.innerText = '검색 결과가 없습니다.';
      this.section.appendChild(emptyMsg);
      return;
    }

    const container = document.createElement('div');
    container.className = 'container';
    container.addEventListener('click', this.handleCardClick);

    data.map((cat) => new Card({ $target: container, data: cat }));

    const scrollObserver = document.createElement('div');
    scrollObserver.className = 'scroll-observer';

    // infinitt scroll
    const option = { threshold: 0 };
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onScrollEnd();
        }
      });
    }, option);
    io.observe(scrollObserver);

    this.section.appendChild(container);
    this.section.appendChild(scrollObserver);
  }
}

export default SearchResult;
