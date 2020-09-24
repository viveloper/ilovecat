class Debouncer {
  constructor() {
    this.prevTimer = null;
  }
  debounce(handler, time) {
    if (this.prevTimer) clearTimeout(this.prevTimer);
    this.prevTimer = setTimeout(() => {
      handler();
      this.prevTimer = null;
    }, time);
  }
}

export default Debouncer;
