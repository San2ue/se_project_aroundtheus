import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-content");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const closeModalBtn = document.querySelectorAll(".modal__close");

const editProfileModal = document.querySelector("#edit-modal");
const profileForm = document.forms["edit-form"];
const modalName = editProfileModal.querySelector(".modal__name");
const modalDescription = editProfileModal.querySelector(".modal__description");

const addCardModal = document.querySelector("#add-modal");
const addForm = document.forms["add-card"];
const modalTitle = addForm.querySelector(".modal__title");
const modalLink = addForm.querySelector(".modal__url");

const pictureModal = document.querySelector("#picture-modal");
const modalImageTitle = pictureModal.querySelector(".modal__image-title");
const modalImage = pictureModal.querySelector(".modal__image");
const cardList = document.querySelector(".cards__list");

const config = {
  inputSelector: ".modal__input",
  submitBtnSelector: ".modal__save",
  inactiveBtnClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Functions

function openModal(modal) {
  modal.classList.add("modal_open");
  modal.addEventListener("mousedown", closeOverlay);
  document.addEventListener("keydown", closeModalEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_open");
  modal.removeEventListener("mousedown", closeOverlay);
  document.removeEventListener("keydown", closeModalEsc);
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = modalName.value;
  profileDescription.textContent = modalDescription.value;
  closeModal(editProfileModal);
}

function saveCards(event) {
  event.preventDefault();
  const name = modalTitle.value;
  const link = modalLink.value;
  const cardData = { name, link };
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
  closeModal(addCardModal);
  event.target.reset();
  cardFormValidator.resetValidation();
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});

function handleZoomImage(data) {
  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalImageTitle.textContent = data.name;
  openModal(pictureModal);
}

function getCardElement(Data) {
  const card = new Card(Data, "#card__template", handleZoomImage);

  return card.generateCard();
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_open");
    closeModal(modalOpened);
  }
}

function closeOverlay(evt) {
  if (evt.target.classList.contains("modal_open")) {
    closeModal(evt.target);
  }
}

const editFormValidator = new FormValidator(config, profileForm);

const cardFormValidator = new FormValidator(config, addForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

// Listeners

profileEditBtn.addEventListener("click", () => {
  modalName.value = profileName.textContent;
  modalDescription.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openModal(editProfileModal);
});

profileForm.addEventListener("submit", saveProfile);

profileAddBtn.addEventListener("click", () => openModal(addCardModal));
addForm.addEventListener("submit", saveCards);

closeModalBtn.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});
