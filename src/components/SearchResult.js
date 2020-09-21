class SearchResult {
  constructor({ $target }) {
    this.state = {
      data: [],
    };

    this.section = document.createElement('section');
    this.section.className = 'search-result';
    $target.appendChild(this.section);

    this.render();
  }
  setState(state) {
    this.state = state;
    this.render();
  }
  render() {
    console.log('render SearchResult Component');

    this.section.innerHTML = '';

    const { data } = this.state;
    console.log(data);

    const container = document.createElement('div');
    container.className = 'container';

    data.map((item) => {
      const article = document.createElement('article');
      article.className = 'item';
      article.innerText = item.breeds[0].name;
      container.appendChild(article);
    });

    this.section.appendChild(container);
  }
}

export default SearchResult;
