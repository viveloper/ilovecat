import Search from './components/Search.js';
import SearchResult from './components/SearchResult.js';
import DetailModal from './components/DetailModal.js';
import { fetchCats, fetchCat } from './api/index.js';

class App {
  constructor($target) {
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);

    this.Search = new Search({
      $target,
      onSearch: this.handleSearch,
    });
    this.SearchResult = new SearchResult({
      $target,
      onCardClick: this.handleCardClick,
    });
    this.DetailModal = new DetailModal({ $target });
  }
  async handleSearch(keyword) {
    const { isError, data } = await fetchCats(keyword);
    if (!isError) {
      this.SearchResult.setResultData(data);
    } else {
      console.error(data);
    }
  }
  async handleCardClick(id) {
    const { isError, data } = await fetchCat(id);
    if (!isError) {
      this.DetailModal.setCatInfo(data);
    } else {
      console.error(data);
    }
  }
}

export default App;
