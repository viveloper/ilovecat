class Card {
  constructor({ $target, data }) {
    this.state = {
      data,
    };

    this.article = document.createElement('article');
    this.article.className = 'item';
    this.article.addEventListener('click', this.handleClick);
    $target.appendChild(this.article);

    this.render();
  }
  render() {
    const {
      data: { breeds, url, id },
    } = this.state;

    const name = breeds[0]?.name;
    const origin = breeds[0]?.origin;
    const description = breeds[0]?.description;

    this.article.innerHTML = `
      <img src="${url}" />
      ${
        breeds.length > 0
          ? `
            <span>${name}</span>
            <span>${origin}</span>
            <p>${description}</p>
          `
          : ``
      }
    `;

    this.article.dataset.id = id;
  }
}

export default Card;
