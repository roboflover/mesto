import '../pages/index.css';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js'
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

import {
  cardAddBtn, profileName, profileCaption, profileEditBtn, 
  nameInput, jobInput, formEditProfile, formAddCard, 
  formObj, сardObj, popupObj, initCards
} from './utils/constants.js'


const popupImage = new PopupWithImage(popupObj.openImageClass);
popupImage.setEventListeners();

function createCard(item) {
  const card = new Card( item, сardObj.elementSelector, handleCardClick );
  const cardElement = card.generateCard();
  return cardElement
}

const profileValidation = new FormValidator(formObj, formEditProfile);
const newCardValidation = new FormValidator(formObj, formAddCard);
profileValidation.enableValidation();
newCardValidation.enableValidation();  

const sectionCard = new Section({
  data: initCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    sectionCard.addItem(cardElement);
  }}, сardObj.cardsContainer);
sectionCard.renderItems();

const addCardClass = popupObj.addCardClass;  
const addCardFormPopup = new PopupWithForm({ 
    selector: addCardClass, 
    handleFormSubmit: (input) => { 
      const name = input.text0;
      const link = input.text1;
      const cardElement = createCard({name, link});
      sectionCard.addItem(cardElement);
      addCardFormPopup.close(); 
    }
  });
addCardFormPopup.setEventListeners();

function openAddCardPopup(){
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

function openProfilePopup() {
  
  const infoObj = userInfoProfile.getUserInfo()
  nameInput.value = infoObj.name;
  jobInput.value = infoObj.caption; 
  profileValidation.enableValidation();
  editFormPopup.open();
}

profileEditBtn.addEventListener('click', openProfilePopup);
cardAddBtn.addEventListener('click', openAddCardPopup);

function handleCardClick(name, link) {
  popupImage.open(name, link);
}






