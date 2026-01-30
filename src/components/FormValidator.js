export default class FormValidator {
  constructor(options, formElement) {
    this._inputSelector = options.inputSelector;
    this._submitBtnSelector = options.submitBtnSelector;
    this._inactiveBtnClass = options.inactiveBtnClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._form = formElement;

    this._inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElements = this._form.querySelector(this._submitBtnSelector);
  }

  _showInputError(inputElement) {
    const errorMsgElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorMsgElement.textContent = inputElement.validationMessage;
    errorMsgElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElements) {
    if (!inputElements.validity.valid) {
      return this._showInputError(inputElements);
    } else {
      this._hideInputError(inputElements);
    }
  }

  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElements) => inputElements.validity.valid
    );
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElements.classList.add(this._inactiveBtnClass);
      this._buttonElements.disabled = true;
    } else {
      this._buttonElements.classList.remove(this._inactiveBtnClass);
      this._buttonElements.disabled = false;
    }
  }

  resetValidation() {
    this.toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
