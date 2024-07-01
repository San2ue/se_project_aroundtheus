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
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const form = modal.querySelector(".modal__form");
const modalTitle = modal.querySelector(".modal__title");
const modalDescription = modal.querySelector(".modal__description");

const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// Functions

function fillProfileModal() {
  modalTitle.value = profileTitle.textContent;
  modalDescription.value = profileDescription.textContent;
}

function toggleEdit() {
  fillProfileModal();
  modal.classList.toggle("modal_open");
}

function saveProfile(event) {
  event.preventDefault();
  profileTitle.textContent = modalTitle.value;
  profileDescription.textContent = modalDescription.value;
  toggleEdit();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  return cardElement;
}

// Listeners

profileEditBtn.addEventListener("click", toggleEdit);
closeButton.addEventListener("click", toggleEdit);
form.addEventListener("submit", saveProfile);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.append(cardElement);
});
