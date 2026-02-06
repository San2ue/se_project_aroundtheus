import "./index.css";
import API from "../components/API.js";
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
  avatarEditBtn,
  profileForm,
  avatarForm,
  modalName,
  modalDescription,
  addForm,
  cardList,
  config,
} from "../utils/constants.js";

//imports
const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5af52474-de0d-4418-ae3a-e40f7fe67743",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.changeAvatar({ avatar: userData.avatar });
    cardSection.renderItems(cards);
  })
  .catch(console.error);

//Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardSection.addItem(getCardElement(data));
    },
  },
  cardList,
);
//cardSection.renderItems();

//new Card
function getCardElement(Data) {
  const card = new Card(Data, "#card__template", handleZoomImage);

  return card.generateCard();
}

//Edit Profile Popup
const editProfilePopup = new PopupWithForm("#edit-modal", saveProfile);
editProfilePopup.setEventListeners();

//Edit Avatar Popup
const changeAvatarPopup = new PopupWithForm("#avatar-modal", changeAvatar);
changeAvatarPopup.setEventListeners();

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
  avatar: ".avatar__picture",
});

// Functions

//Card Image Zoom
function handleZoomImage({ name, link }) {
  previewPicture.open({ name, link });
}

/*function saveProfile(profiledata) {
  const name = profiledata.name;
  const description = profiledata.description;
  userInfo.setUserInfo({ name, description });
  editProfilePopup.close();
  console.log(profiledata);
} */
//Save Profile Info
function saveProfile(data) {
  editProfilePopup.renderLoading(true);
  api
    .updateProfileInfo({ name: data.name, description: data.description })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, description: data.about });
      editProfilePopup.close();
      console.log(profiledata);
    })
    .catch(console.error)
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

/*function saveCards(data) {
  const name = data.Title;
  const link = data.url;
  cardSection.addItem(getCardElement({ name, link }));
  newCardPopup.close();
  cardFormValidator.resetValidation();
  console.log(data);
}*/

//Add New Card
function saveCards(data) {
  newCardPopup.renderLoading(true);
  api
    .addCard({ name: data.Title, link: data.url })
    .then((data) => {
      cardSection.addItem(getCardElement(data));
      newCardPopup.close();
      cardFormValidator.resetValidation();
      console.log(data);
    })
    .catch(console.error)
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
}

//Change Avatar
function changeAvatar(data) {
  changeAvatarPopup.renderLoading(true);
  api
    .updateProfileAvatar(data.link)
    .then((data) => {
      userInfo.changeAvatarPicture(res);
      changeAvatarPopup.close;
    })
    .catch(console.error)
    .finally(() => {
      changeAvatarPopup.renderLoading(false);
    });
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

avatarEditBtn.addEventListener("click", () => {
  changeAvatarPopup.open();
  avatarFormValidator.toggleButtonState();
});

//validators
const editFormValidator = new FormValidator(config, profileForm);

const cardFormValidator = new FormValidator(config, addForm);

const avatarFormValidator = new FormValidator(config, avatarForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
