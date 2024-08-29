function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMsgElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMsgElement.textContent = inputEl.validationMessage;
  errorMsgElement.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMsgElement = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(errorMsgElement);
  inputEl.classList.remove(inputErrorClass);
  errorMsgElement.textContent = "";
  errorMsgElement.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(
  inputElements,
  buttonElements,
  { inactiveBtnClass }
) {
  if (hasInvalidInput(inputElements)) {
    buttonElements.classList.add(inactiveBtnClass);
    buttonElements.disabled = true;
  } else {
    buttonElements.classList.remove(inactiveBtnClass);
    buttonElements.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const inputElements = Array.from(
    formEl.querySelectorAll(options.inputSelector)
  );
  const buttonElements = formEl.querySelector(options.submitBtnSelector);
  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputElements, buttonElements, options);
    });
  });
}

function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitBtnSelector: ".modal__save",
  inactiveBtnClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
