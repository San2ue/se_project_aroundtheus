import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._popupElement.querySelector(".modal__save");
    this._submitBtnText = this._submitBtn.textcontent;
  }

  handleDeleteConfirm(callback) {
    this._handleConfirmDelete = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleConfirmDelete();
    });
  }
  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
