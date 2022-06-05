export default class Section {
    constructor({ data, renderer }, selector) {
      this._renderedItems = data;
      this._container = document.querySelector(selector)
      this.renderer = renderer;
    }
  

    renderItems() {
      this._renderedItems.forEach(item => this.renderer(item) );
    }
  
    addItem(element) {
      this._container.append(element);
    }

  }