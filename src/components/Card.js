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

    const name = breeds.length > 0 ? breeds[0].name : '정보없음';
    const origin = breeds.length > 0 ? breeds[0].origin : '정보없음';
    const description = breeds.length > 0 ? breeds[0].description : '정보없음';

    this.article.innerHTML = `
      <img src="${url}" />
      <span>${name}</span>
      <span>${origin}</span>
      <p>${description}</p>
    `;

    this.article.dataset.id = id;
  }
}

export default Card;
