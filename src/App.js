import Search from './components/Search.js';
import SearchResult from './components/SearchResult.js';
import DetailModal from './components/DetailModal.js';
import { fetchCats, fetchCat, fetchRandomCats } from './api/index.js';
import Loading from './components/Loading.js';

class App {
  constructor($target) {
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleRandomSearch = this.handleRandomSearch.bind(this);

    this.Search = new Search({
      $target,
      onSearch: this.handleSearch,
      onRandomSearch: this.handleRandomSearch,
    });
    this.SearchResult = new SearchResult({
      $target,
      onCardClick: this.handleCardClick,
    });
    this.DetailModal = new DetailModal({ $target });
    this.Loading = new Loading({ $target });
  }

  async handleSearch(keyword) {
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
}

export default App;
