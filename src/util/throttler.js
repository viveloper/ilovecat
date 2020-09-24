class Throttler {
  constructor() {
    this.prevTimer = null;
  }
  throttle(handler, time) {
    if (this.prevTimer) return;
    this.prevTimer = setTimeout(() => {
      handler();
      this.prevTimer = null;
    }, time);
  }
}

export default Throttler;
