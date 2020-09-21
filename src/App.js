import Search from './components/Search.js';
import SearchResult from './components/SearchResult.js';
import * as api from './api/index.js';

class App {
  constructor($target) {
    this.searchRandom = this.searchRandom.bind(this);
    this.search = this.search.bind(this);
    this.Search = new Search({
      $target,
      onRandomClick: this.searchRandom,
      onSubmit: this.search,
    });
    this.SearchResult = new SearchResult({ $target });
  }
  async searchRandom() {
    console.log('search random');
    const { isError, data } = await api.fetchRandomCats();
    if (!isError) {
      console.log(data);
    } else {
      console.error(data);
    }
  }
  async search(keyword) {
    console.log(`search: ${keyword}`);
    const { isError, data } = await api.fetchCats(keyword);
    if (!isError) {
      this.SearchResult.setState({ data });
    } else {
      console.error(data);
    }
  }
}

export default App;
