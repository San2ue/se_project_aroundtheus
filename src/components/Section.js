export default class Section {
  constructor({ items, renderer }, classSelector) {
    this._item = items;
    this._renderer = renderer;
    this._classSection = classSelector;
  }

  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._classSection.prepend(element);
  }
}
