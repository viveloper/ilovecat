import Search from './components/Search.js';
import SearchResult from './components/SearchResult.js';
import { fetchCats } from './api/index.js';

class App {
  constructor($target) {
    this.handleSearch = this.handleSearch.bind(this);

    this.Search = new Search({
      $target,
      onSearch: this.handleSearch,
    });
    this.SearchResult = new SearchResult({ $target });
  }
  async handleSearch(keyword) {
    const { isError, data } = await fetchCats(keyword);
    if (!isError) {
      this.SearchResult.setResultData(data);
    } else {
      console.error(data);
    }
  }
}

export default App;
