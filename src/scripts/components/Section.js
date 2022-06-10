export default class Section {
    constructor({data, renderer }, selector) {
      this._renderedItems = data;
      this._container = document.querySelector(selector)
      this.renderer = renderer;
    }
  

    renderItems(array) {
     array.slice().reverse().forEach(item => this.renderer(item) );
    }

    renderItem() {
      this.renderer(this._renderedItems);
    }

    addItem(element) {
      this._container.prepend(element);
    }

  }