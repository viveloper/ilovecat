class SearchResult {
  constructor({ $target }) {
    this.$target = $target;
    this.render();
  }
  render() {
    console.log('render SearchResult Component');
  }
}

export default SearchResult;
