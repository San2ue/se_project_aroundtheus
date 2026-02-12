import "./index.css";
import Api from "../components/API.js";
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
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7446d4da-3e8b-41bb-a0b1-a7c627f1654f",
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
    userInfo.changeAvatarPicture(userData.avatar);
    cardSection.renderItems(cards);
  })
  .catch(console.error);

//Section
const cardSection = new Section(
  {
    items: initialCards,
    /*having problem when rendering initial cards. The Initial cards have no defined "ID", and therefore
    can not be liked or removed. I think my initial cards need to be loaded with my api so that they 
    post to the server, but not entirely sure. */
    renderer: (data) => {
      cardSection.addItem(getCardElement(data));
    },
  },
  cardList,
);
//cardSection.renderItems();

//new Card
function getCardElement(Data) {
  const card = new Card(
    Data,
    "#card__template",
    handeleHeartCard,
    handleRemoveCard,
    handleZoomImage,
  );

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

//Remove Card Popup
const removeCardPopup = new PopupWithForm(
  "#confirm-delete-modal",
  handleRemoveCard,
);
removeCardPopup.setEventListeners();

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
//Save Profile Info
function saveProfile(data) {
  editProfilePopup.renderLoading(true);
  api
    .updateProfileInfo({ name: data.name, about: data.description })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, description: data.about });
      editProfilePopup.close();
      console.log(data);
    })
    .catch(console.error)
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

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
    .updateProfileAvatar(data.url)
    .then((data) => {
      userInfo.changeAvatarPicture(data.avatar);
      changeAvatarPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      changeAvatarPopup.renderLoading(false);
    });
}

//Card Image Zoom
function handleZoomImage({ name, link }) {
  previewPicture.open({ name, link });
}

function handleRemoveCard(cardData) {
  removeCardPopup.open();
  removeCardPopup.setSubmitHandler(() => {
    removeCardPopup.renderLoading(true);
    api
      .removeCard(cardData.getId())
      .then(() => {
        cardData.removeCard();
        removeCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        removeCardPopup.renderLoading(false);
      });
  });
  console.log(cardData);
}

function handeleHeartCard(card) {
  api
    .likeCard(card.getId(), !card._isLiked)
    .then((data) => {
      card.handleHeart(data.isLiked);
    })
    .catch(console.error);
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
