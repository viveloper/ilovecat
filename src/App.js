import Search from './components/Search.js';
import SearchResult from './components/SearchResult.js';
import * as api from './api';

class App {
  constructor($target) {
    new Search({
      $target,
      onRandomClick: this.searchRandom,
      onSubmit: this.search,
    });
    new SearchResult({ $target });
  }
  async searchRandom() {
    console.log('search random');
    const { isError, data } = await api.fetchRandomCats();
    if (!isError) {
      console.log(data);
    } else {
      // error!
      console.error(data);
    }
  }
  search(keyword) {
    console.log(keyword);
  }
}

export default App;
