import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js'
import { initialCards as initCards }   from './components/cards.js';

const selectorFormObj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const selectorCardObj = {
  elementSelector: '#element-template', 
  cardsContainer: '.elements',
  cardImage: '.element__image'
}

const cardPopup = document.querySelector('.add-card-popup');
const cardAddBtn = document.querySelector('.profile__add-button');
const cardCloseBtn = cardPopup.querySelector('.add-card-popup__close-icon');
const cardElement = cardPopup.querySelector('#add-card-form');
const cardNameInput = cardElement.querySelector('#add-card-name-input');
const cardImageInput = cardElement.querySelector('#add-card-image-input');
const imageBigPopup = document.querySelector('.open-image-popup');
const imageBig = imageBigPopup.querySelector('.open-image-popup__image-big');
const imageBigTitle = imageBigPopup.querySelector('.open-image-popup__title');
const imageBigClose = imageBigPopup.querySelector('.open-image-popup__close-icon');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');

const profilePopup = document.querySelector('.profile-popup');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileCloseBtn = profilePopup.querySelector('.profile-popup__close-icon');

const profileForm =  profilePopup.querySelector('#profile-form');
const nameInput = profileForm.querySelector('#profile-name-input');
const jobInput = profileForm.querySelector('#profile-caption-input');

const cardsContainer = document.querySelector('.elements');

const addCardFormSubmitHandler = (evt) => {
    evt.preventDefault(); 
    const data = {
       name: cardNameInput.value,
       link: cardImageInput.value
     }
     creatingСardLayout(data);
     closePopup(cardPopup)
}

(function addCardSetEventListeners() {

    cardAddBtn.addEventListener('click', () => {
      openPopup(cardPopup);
    });
    cardElement.addEventListener('submit', addCardFormSubmitHandler);
    cardCloseBtn.addEventListener('click', () => {
      closePopup(cardPopup);
    });  

} )();


initCards.forEach((data) => {
  creatingСardLayout(data)
});

function creatingСardLayout(data) {
  const card = new Card( data, selectorCardObj );
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);  
}

const formList = Array.from(document.querySelectorAll(selectorFormObj.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(selectorFormObj, formElement);
    formValidator.enableValidation();
}); 

export function setEventListeners(element) {

  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  element.querySelector('.element__delete').addEventListener('click',  () => {
    element.remove();
  });

  cardAddBtn.addEventListener('click', () => {
    openPopup(cardPopup);
   });

}

export function bigImageOpen (elementImage, name, link) {
  
  elementImage.addEventListener('click', () => {
    imageBig.src = link;
    imageBigTitle.textContent = name;
    imageBig.alt = name;
    openPopup(imageBigPopup);
  });

}

imageBigClose.addEventListener('click', () => {
    closePopup(imageBigPopup);
  });

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
  if(evt.target.className === popupOpened.className)  {
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

