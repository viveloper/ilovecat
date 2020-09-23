class Component {
  constructor({ $target, tagName, className }) {
    this.el = document.createElement(tagName);
    this.el.className = className;
    $target.appendChild(this.el);
  }
  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
}

export default Component;
