class DetailModal {
  constructor({ $target, data = null }) {
    console.log($target);
    console.log(data);

    this.state = {
      data,
    };

    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    this.container = document.createElement('div');
    this.container.className = 'modal-container hidden';
    this.container.addEventListener('click', this.handleClick);

    $target.appendChild(this.container);

    document.addEventListener('keyup', this.handleKeyup);

    this.render();
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
  handleClick(e) {
    if (
      e.target.className === 'close-btn' ||
      e.target.className === 'overlay'
    ) {
      this.close();
    }
  }
  handleKeyup(e) {
    if (e.keyCode === 27 && !!this.state.data) {
      this.close();
    }
  }
  close() {
    this.setState({
      data: null,
    });
  }
  render() {
    this.container.innerHTML = '';

    const { data } = this.state;
    console.log(data);
    if (!data) {
      this.container.classList.add('hidden');
      return;
    }
    this.container.classList.remove('hidden');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const { breeds, url } = data;

    const name = breeds[0]?.name;
    const origin = breeds[0]?.origin;
    const description = breeds[0]?.description;

    const content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = `
      <div class="modal-content-header">
        <span class="close-btn">X</span>
      </div>
      <img src="${url}" />
      ${
        breeds.length > 0
          ? `
            <div class="title">${name} (${origin})</div>
            <p>${description}</p>
          `
          : ``
      }
      
    `;

    this.container.appendChild(overlay);
    this.container.appendChild(content);
  }
}

export default DetailModal;
