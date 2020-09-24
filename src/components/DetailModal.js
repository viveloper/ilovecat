import Component from './Component.js';

class DetailModal extends Component {
  constructor({ $target }) {
    super({
      $target,
      tagName: 'div',
      className: 'modal-wrapper',
    });

    this.state = {
      loading: false,
      data: null,
      error: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    this.el.addEventListener('click', this.handleClick);

    this.render();
  }

  setCatInfo(data) {
    this.setState({
      data,
    });
  }

  handleClick(e) {
    if (
      e.target.className === 'overlay' ||
      e.target.className === 'close-btn'
    ) {
      this.close();
    }
  }

  handleKeyup(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }

  close() {
    this.setState({ data: null });
    document.removeEventListener('keyup', this.handleKeyup);
  }

  render() {
    console.log('render DetailModal Component');

    const { loading, data, error } = this.state;

    if (!data) {
      this.el.classList.add('hidden');
      return;
    }

    this.el.classList.remove('hidden');

    const { url } = data;
    const { name, origin, temperament } =
      data.breeds && data.breeds[0]
        ? data.breeds[0]
        : { name: '정보없음', origin: '정보없음', temperament: '정보없음' };
    const { imperial, metric } =
      data.breeds && data.breeds[0]
        ? data.breeds[0].weight
        : { imperial: '정보없음', metric: '정보없음' };

    this.el.innerHTML = `
      <div class="overlay"></div>
      <section class="modal-contents">
        <header class="modal-header">
          <p class="modal-title">${name}</p>
          <span class="close-btn">X</span>
        </header>
        <img class="modal-image" src="${url}" />
        <article class="modal-info">
          <p class="cat-origin">${origin}</p>
          <p class="cat-temperament">${temperament}</p>
          <p class="cat-width">${imperial} (imperial) / ${metric} (metric)</p>
        </article>
      </section>
    `;

    document.addEventListener('keyup', this.handleKeyup);
  }
}

export default DetailModal;
