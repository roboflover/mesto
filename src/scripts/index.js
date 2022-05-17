import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js'
import { initialCards as initCards }   from './components/cards.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

const formObj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

const сardObj = {
  elementSelector: '#element-template', 
  cardsContainer: '.elements',
  cardImageClass: '.element__image'
}

const popupObj = {
  addCardClass: '.add-card-popup', 
  openImageClass: '.open-image-popup',
  profileClass: '.profile-popup',
  profileForm: '#profile-form'
}

import {
  cardAddBtn, profileName, profileCaption, profileEditBtn, 
  nameInput, jobInput, formEditProfile, formAddCard
} from './utils/constants.js'

const popup = new Popup(popupObj.openImageClass);
popup.setEventListeners(); 

const profileValidation = new FormValidator(formObj, formEditProfile);
const newCardValidation = new FormValidator(formObj, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();  

const sectionCard = new Section({
  data: initCards,
  renderer: (item) => {
    const card = new Card( item, сardObj.elementSelector, handleCardClick );
    const cardElement = card.generateCard();
    sectionCard.addItem(cardElement);
  }}, сardObj.cardsContainer);
sectionCard.renderItems();

const addCardClass = popupObj.addCardClass;  
const addCardFormPopup = new PopupWithForm({ 
    selector: addCardClass, 
    handleFormSubmit: (input) => { 
      const name = input.text0;
      const link = input.text1;
      const card = new Card( { name: name, link: link }, сardObj.elementSelector, handleCardClick );
      const cardElement = card.generateCard();
      sectionCard.addItem(cardElement);
      addCardFormPopup.close(); 
    }
  });
addCardFormPopup.setEventListeners();

function formAddCardPopup(){
  newCardValidation.toggleButtonState();
  addCardFormPopup.open();
} 

const userInfoProfile = new UserInfo(profileName, profileCaption)

const profileClass = popupObj.profileClass;
const editFormPopup = new PopupWithForm({
  selector: profileClass, 
  handleFormSubmit: (input) => { 

    userInfoProfile.setUserInfo(input.text0, input.text1);
    editFormPopup.close(); 
  }
});
editFormPopup.setEventListeners();

function formProfilePopup() {
  
  const infoObj = userInfoProfile.getUserInfo()
  nameInput.value = infoObj.name;
  jobInput.value = infoObj.caption; 
  profileValidation.enableValidation();
  editFormPopup.open();
}

profileEditBtn.addEventListener('click', formProfilePopup);
cardAddBtn.addEventListener('click', formAddCardPopup);

function handleCardClick(name, link) {
  const popupImage = new PopupWithImage( name, link );
  popupImage.open();
  const imageBigPopup = document.querySelector('.open-image-popup');
  imageBigPopup.classList.add('popup_opened');    
}






