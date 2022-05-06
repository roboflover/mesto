import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js'
import { initialCards as initCards }   from './components/cards.js';
import { card as emptyCard }   from './components/cards.js';


const selectorFormObj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

const selectorCardObj = {
  elementSelector: '#element-template', 
  cardsContainer: '.elements',
  cardImageClass: '.element__image'
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

const profileForm = profilePopup.querySelector('#profile-form');
const nameInput = profileForm.querySelector('#profile-name-input');
const jobInput = profileForm.querySelector('#profile-caption-input');

const formEditProfile = profilePopup.querySelector('.form-edit-profile');
const formAddCard = cardPopup.querySelector('.form-add-card');
const profileValidation = new FormValidator(selectorFormObj, formEditProfile);
const newCardValidation = new FormValidator(selectorFormObj, formAddCard);

const cardsContainer = document.querySelector('.elements');

const addCardFormSubmitHandler = (evt) => {
    evt.preventDefault(); 
    
    const data = {
       name: cardNameInput.value,
       link: cardImageInput.value
     }

    const cardElement = creatingСardLayout(data);    
    cardsContainer.prepend(cardElement);  

    cardNameInput.value = emptyCard.name;
    cardImageInput.value = emptyCard.link;
     

    closePopup(cardPopup);
}

initCards.forEach((data) => {
  const cardElement = creatingСardLayout(data);
  cardsContainer.prepend(cardElement);
});

function creatingСardLayout(data) {
  const card = new Card( data, selectorCardObj.elementSelector, openBigImage );
  return card.generateCard();
}

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
    profileValidation.enableValidation();

    nameInput.value = profileName.textContent;
    jobInput.value = profileCaption.textContent;
    openPopup(profilePopup);    
}

function openBigImage (name, link) {
    imageBig.src = link;
    imageBigTitle.textContent = name;
    imageBig.alt = name;
    openPopup(imageBigPopup);
}

cardAddBtn.addEventListener('click', () => {
  newCardValidation.enableValidation();  
  openPopup(cardPopup);
});
cardElement.addEventListener('submit', addCardFormSubmitHandler);
cardCloseBtn.addEventListener('click', () => {
  closePopup(cardPopup);
});  

imageBigClose.addEventListener('click', () => {
  closePopup(imageBigPopup);
});
profileEditBtn.addEventListener('click', openEditProfilePopup);
profileForm.addEventListener('submit', profileFormSubmitHandler);
profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

