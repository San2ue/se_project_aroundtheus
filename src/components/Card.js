//const zoomImage = cardElement.querySelector(".cards__zoom");

export default class Card {
  constructor(data, cardSelector, handleZoomImage) {
    this.name = data.name;
    this.image = data.link;
    this._cardSelector = cardSelector;
    this._handleZoomImage = handleZoomImage;
  }

  _setEventListeners() {
    this._heartBtn.addEventListener("click", () => {
      this._heartBtn.classList.toggle("cards__heart_active");
    });

    this._removeBtn.addEventListener("click", () => {
      this._cardElement.remove();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleZoomImage({ name: this.name, link: this.image });
    });
  }

  generateCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    this._heartBtn = this._cardElement.querySelector(".cards__heart");
    this._removeBtn = this._cardElement.querySelector(".cards__delete");

    this._cardImageElement = this._cardElement.querySelector(".cards__image");
    this._cardImageElement.src = this.image;
    this._cardImageElement.alt = this.name;
    this._cardElement.querySelector(".cards__title").textContent = this.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
