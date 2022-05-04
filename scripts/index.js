import { Card } from './components/Card.js';
import { AddCard } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js'
import { initialCards as initCards }   from './components/cards.js';

const selectorObj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const cardsContainer = document.querySelector('.elements');

initCards.forEach((item) => {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});

const addCard = new AddCard('#element-template');
addCard.addCardComplete();
const formList = Array.from(document.querySelectorAll(selectorObj.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(selectorObj, formElement);
  formValidator.enableValidation();
  const buttonElement = formElement.querySelector(selectorObj.submitButtonSelector);
  buttonElement.classList.add(selectorObj.inactiveButtonClass);
}); 

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');

const profilePopup = document.querySelector('.profile-popup');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileCloseBtn = profilePopup.querySelector('.profile-popup__close-icon');

const profileForm =  profilePopup.querySelector('#profile-form');
const nameInput = profileForm.querySelector('#profile-name-input');
const jobInput = profileForm.querySelector('#profile-caption-input');

function openPopup(popup) { 
  popup.classList.add('popup_opened');    
  popup.addEventListener('click', overlayClosePopup);   
  document.addEventListener('keydown', escapeClosePopup);
}

function closePopup(popup) {
  document.removeEventListener('keydown', escapeClosePopup);
  popup.removeEventListener('click', overlayClosePopup);   
  popup.classList.remove('popup_opened');
}

function overlayClosePopup(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if(evt.target.classList[0] === popupOpened.classList[0])  {
    closePopup(popupOpened);
  }
}

function escapeClosePopup(evt) {
  if (evt.code == 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}  

function profileFormSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;

    closePopup(profilePopup);
}

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileCaption.textContent;
    openPopup(profilePopup);    
}

profileEditBtn.addEventListener('click', openEditProfilePopup);
profileForm.addEventListener('submit', profileFormSubmitHandler);
profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

