import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileEditBtn,
  profileAddBtn,
  profileForm,
  modalName,
  modalDescription,
  addForm,
  modalTitle,
  modalLink,
  cardList,
  config,
} from "../utils/constants.js";

//imports
function getCardElement(Data) {
  const card = new Card(Data, "#card__template", handleZoomImage);

  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardSection.addItem(getCardElement(data));
    },
  },
  cardList,
);
cardSection.renderItems();

//Edit Profile Popup
const editProfilePopup = new PopupWithForm("#edit-modal", saveProfile);
editProfilePopup.setEventListeners();

//Add New Card Popup
const newCardPopup = new PopupWithForm("#add-modal", saveCards);
newCardPopup.setEventListeners();

//Preview Image
const previewPicture = new PopupWithImage("#picture-modal");
previewPicture.setEventListeners();

//UserInfo
const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
});

// Functions

//Card Image Zoom
function handleZoomImage({ name, link }) {
  previewPicture.open({ name, link });
}

function saveProfile(profiledata) {
  const name = profiledata.name;
  const description = profiledata.description;
  userInfo.setUserInfo({ name, description });
  editProfilePopup.close();
  console.log(profiledata);
}

function saveCards(data) {
  const name = data.Title;
  const link = data.url;
  cardSection.addItem(getCardElement({ name, link }));
  newCardPopup.close();
  cardFormValidator.resetValidation();
  console.log(data);
}

// Listeners

profileEditBtn.addEventListener("click", () => {
  const userInput = userInfo.getUserInfo();
  modalName.value = userInput.name;
  modalDescription.value = userInput.description;
  editProfilePopup.open();
  editFormValidator.resetValidation();
});

profileAddBtn.addEventListener("click", () => {
  newCardPopup.open();
  cardFormValidator.toggleButtonState();
});

//validators
const editFormValidator = new FormValidator(config, profileForm);

const cardFormValidator = new FormValidator(config, addForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
