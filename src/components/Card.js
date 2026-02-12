//const zoomImage = cardElement.querySelector(".cards__zoom");

export default class Card {
  constructor(
    data,
    cardSelector,
    handleHeartImage,
    handleRemoveImage,
    handleZoomImage,
  ) {
    this.name = data.name;
    this.image = data.link;
    this._id = data._id;
    this._isliked = data.isliked;
    this._cardSelector = cardSelector;
    this._handleHeartImage = handleHeartImage;
    this._handleZoomImage = handleZoomImage;
    this._handleRemoveImage = handleRemoveImage;
  }

  getId() {
    return this._id;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._heartBtn.addEventListener("click", () => {
      this._handleHeartImage(this);
    });

    this._removeBtn.addEventListener("click", () => {
      this._handleRemoveImage(this);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleZoomImage({ name: this.name, link: this.image });
    });
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateHearts() {
    if (this._isLiked) {
      this._heartBtn.classList.add("cards__heart_active");
    } else {
      this._heartBtn.classList.remove("cards__heart_active");
    }
  }

  handleHeart(isLiked) {
    this._isLiked = isLiked;
    this.updateHearts();
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._heartBtn = this._cardElement.querySelector(".cards__heart");
    this._removeBtn = this._cardElement.querySelector(".cards__delete");
    this._cardImageElement = this._cardElement.querySelector(".cards__image");
    this._cardImageElement.src = this.image;
    this._cardImageElement.alt = this.name;
    this._cardElement.querySelector(".cards__title").textContent = this.name;
    this.updateHearts();

    this._setEventListeners();
    return this._cardElement;
  }
}
