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

const cardswrap = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Functions

function toggleModal(modal) {
  modal.classList.toggle("modal_open");
  modal.addEventListener("mousedown", closeOverlay);
  document.addEventListener("keydown", closeModalEsc);
}

function generateCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = modalName.value;
  profileDescription.textContent = modalDescription.value;
  toggleModal(editProfileModal);
}

function saveCards(event) {
  event.preventDefault();
  const name = modalTitle.value;
  const link = modalLink.value;
  generateCard({ name, link }, cardswrap);
  toggleModal(addCardModal);
  event.target.reset();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");
  const heartButton = cardElement.querySelector(".cards__heart");
  const removeCard = cardElement.querySelector(".cards__delete");
  const zoomImage = cardElement.querySelector(".cards__zoom");

  zoomImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalImageTitle.textContent = cardData.name;
    toggleModal(pictureModal);
  });

  heartButton.addEventListener("click", () => {
    heartButton.classList.toggle("cards__heart_active");
  });
  removeCard.addEventListener("click", () => cardElement.remove());

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_open");
    toggleModal(modalOpened);
  }
}

function closeOverlay(evt) {
  if (evt.target.classList.contains("modal_open")) {
    const modalOpened = document.querySelector(".modal_open");
    toggleModal(modalOpened);
  }
}

// Listeners

profileEditBtn.addEventListener("click", () => {
  modalName.value = profileName.textContent;
  modalDescription.value = profileDescription.textContent;
  toggleModal(editProfileModal);
});

profileForm.addEventListener("submit", saveProfile);

profileAddBtn.addEventListener("click", () => toggleModal(addCardModal));
addForm.addEventListener("submit", saveCards);

closeModalBtn.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => toggleModal(popup));
});

initialCards.forEach((cardData) => generateCard(cardData, cardswrap));
