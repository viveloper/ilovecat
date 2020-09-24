import Component from './Component.js';

class Card extends Component {
  constructor({ $target, data }) {
    super({
      $target,
      tagName: 'article',
      className: 'cat-card',
    });
    this.state = {
      data,
    };
    this.render();
  }
  render() {
    console.log('render Card Component');

    const { url, breeds, id } = this.state.data;
    const { name, origin } =
      breeds.length > 0 ? breeds[0] : { name: '정보없음', origin: '정보없음' };

    this.el.innerHTML = `
      <img class="card-image lazy" data-id="${id}" data-src="${url}" />
      <div class="card-info">
        <p class="cat-name">${name}</p>
        <p class="cat-origin">${origin}</p>
      </div>
    `;
  }
}

export default Card;
