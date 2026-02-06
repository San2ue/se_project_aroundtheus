export const initialCards = [
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
export const profileEditBtn = document.querySelector(".profile__edit-button");
export const profileAddBtn = document.querySelector(".profile__add-content");
export const avatarEditBtn = document.querySelector(
  ".profile__avatar-edit-button",
);
export const avatarForm = document.querySelector("edit-avatar");

export const editProfileModal = document.querySelector("#edit-modal");
export const profileForm = document.forms["edit-form"];
export const modalName = editProfileModal.querySelector(".modal__name");
export const modalDescription = editProfileModal.querySelector(
  ".modal__description",
);

export const addForm = document.forms["add-card"];

export const cardList = document.querySelector(".cards__list");

export const config = {
  inputSelector: ".modal__input",
  submitBtnSelector: ".modal__save",
  inactiveBtnClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
