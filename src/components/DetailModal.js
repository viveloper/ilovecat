class DetailModal {
  constructor({ $target, data = null }) {
    console.log($target);
    console.log(data);

    this.state = {
      data,
    };

    this.container = document.createElement('div');
    this.container.className = 'modal-container hidden';
    $target.appendChild(this.container);

    this.render();
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
  render() {
    const { data } = this.state;
    console.log(data);
    if (!data) {
      this.container.classList.add('hidden');
      return;
    }
    this.container.classList.remove('hidden');

    const modal = document.createElement('div');
    modal.className = 'detail-modal';

    this.container.appendChild(modal);
  }
}

export default DetailModal;
