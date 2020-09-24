import Component from './Component.js';

class Loading extends Component {
  constructor({ $target }) {
    super({
      $target,
      tagName: 'div',
      className: 'spinner-wrapper',
    });
    this.state = {
      isShow: false,
    };
    this.render();
  }
  showLoading() {
    this.setState({
      isShow: true,
    });
  }
  hiddenLoading() {
    this.setState({
      isShow: false,
    });
  }
  render() {
    console.log('render Loading Component');

    const { isShow } = this.state;
    if (isShow) {
      this.el.classList.remove('hidden');
    } else {
      this.el.classList.add('hidden');
    }
    this.el.innerHTML = `
      <img class="spinner-image" src="src/img/loading.gif" />
    `;
  }
}

export default Loading;
