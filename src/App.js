import Search from './components/Search.js';
import SearchResult from './components/SearchResult.js';
import DetailModal from './components/DetailModal.js';
import * as api from './api/index.js';

class App {
  constructor($target) {
    this.searchRandom = this.searchRandom.bind(this);
    this.search = this.search.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);

    this.Search = new Search({
      $target,
      onRandomClick: this.searchRandom,
      onSubmit: this.search,
    });
    this.SearchResult = new SearchResult({
      $target,
      onCardClick: this.handleCardClick,
    });
    this.DetailModal = new DetailModal({
      $target,
    });
  }
  async searchRandom() {
    console.log('search random');
    this.SearchResult.startLoading();
    const { isError, data } = await api.fetchRandomCats();
    if (!isError) {
      this.SearchResult.setSearchResult(data);
    } else {
      this.SearchResult.setError(data);
    }
  }
  async search(keyword) {
    console.log(`search: ${keyword}`);
    this.SearchResult.startLoading();
    const { isError, data } = await api.fetchCats(keyword);
    if (!isError) {
      this.SearchResult.setSearchResult(data);
    } else {
      this.SearchResult.setError(data);
    }
  }
  handleCardClick(data) {
    this.DetailModal.setDetailData(data);
  }
}

export default App;
