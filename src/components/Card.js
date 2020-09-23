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

    this.article.innerHTML = `
      <img class="lazy" src="src/img/empty.png" data-src="${url}" />
      ${
        breeds.length > 0
          ? `
            <span>${name}</span>
            <span>${origin}</span>
          `
          : ``
      }
    `;
    this.article.dataset.id = id;

    // image lazy loading
    const option = { threshold: 0 };
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      });
    }, option);
    io.observe(this.article.querySelector('img'));
  }
}

export default Card;
