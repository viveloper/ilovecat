import Search from './components/Search.js';
import Keywords from './components/Keywords.js';
import SearchResult from './components/SearchResult.js';
import DetailModal from './components/DetailModal.js';
import {
  fetchCats,
  fetchCat,
  fetchRandomCats,
  fetchKeywords,
} from './api/index.js';
import Loading from './components/Loading.js';

class App {
  constructor($target) {
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleRandomSearch = this.handleRandomSearch.bind(this);
    this.handleScrollFetch = this.handleScrollFetch.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleRecommendKeywordClick = this.handleRecommendKeywordClick.bind(
      this
    );
    this.handleArrowUp = this.handleArrowUp.bind(this);
    this.handleArrowDown = this.handleArrowDown.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);

    this.Search = new Search({
      $target,
      onSearch: this.handleSearch,
      onRandomSearch: this.handleRandomSearch,
      onKeywordChange: this.handleKeywordChange,
      onArrowUp: this.handleArrowUp,
      onArrowDown: this.handleArrowDown,
    });
    this.Keywords = new Keywords({
      $target,
      onKeywordClick: this.handleRecommendKeywordClick,
      onIndexChange: this.handleIndexChange,
    });
    this.SearchResult = new SearchResult({
      $target,
      onCardClick: this.handleCardClick,
      onScrollFetch: this.handleScrollFetch,
    });
    this.DetailModal = new DetailModal({ $target });
    this.Loading = new Loading({ $target });

    this.handleClick = this.handleClick.bind(this);
    $target.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (e.target.className !== 'recommend-keyword') {
      this.Keywords.clearKeywords();
    }
  }

  async handleKeywordChange(keyword) {
    if (keyword !== '') {
      const { isError, data } = await fetchKeywords(keyword);
      if (!isError) {
        console.log(data);
        this.Keywords.setKeywords(data);
      } else {
        console.error(data);
      }
    } else {
      this.Keywords.clearKeywords();
    }
  }

  handleArrowDown() {
    this.Keywords.increaseIndex();
  }

  handleArrowUp() {
    this.Keywords.decreaseIndex();
  }

  handleIndexChange(keyword) {
    console.log(keyword);
    this.Search.setKeyword(keyword);
  }

  async handleSearch(keyword) {
    this.Keywords.clearKeywords();
    this.Loading.showLoading();
    const { isError, data } = await fetchCats(keyword);
    if (!isError) {
      this.SearchResult.setResultData(data);
      this.Loading.hiddenLoading();
    } else {
      console.error(data);
      this.Loading.hiddenLoading();
    }
  }

  async handleCardClick(id) {
    this.Loading.showLoading();
    const { isError, data } = await fetchCat(id);
    if (!isError) {
      this.DetailModal.setCatInfo(data);
      this.Loading.hiddenLoading();
    } else {
      console.error(data);
      this.Loading.hiddenLoading();
    }
  }

  async handleRandomSearch() {
    this.Loading.showLoading();
    const { isError, data } = await fetchRandomCats();
    if (!isError) {
      this.SearchResult.setResultData(data);
      this.Loading.hiddenLoading();
    } else {
      console.error(data);
      this.Loading.hiddenLoading();
    }
  }

  async handleScrollFetch() {
    const keyword = this.Search.currentKeyword;
    if (!keyword) return;
    this.Loading.showLoading();
    const { isError, data } = await fetchCats(keyword);
    if (!isError) {
      this.SearchResult.addResultData(data);
      this.Loading.hiddenLoading();
    } else {
      console.error(data);
      this.Loading.hiddenLoading();
    }
  }

  handleRecommendKeywordClick(keyword) {
    this.Search.setKeyword(keyword);
    this.Keywords.clearKeywords();
    this.handleSearch(keyword);
  }
}

export default App;
