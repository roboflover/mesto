export const cardPopup = document.querySelector('.add-card-popup');
export const cardAddBtn = document.querySelector('.profile__add-button');

export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileCaption = profile.querySelector('.profile__caption');

export const profilePopup = document.querySelector('.profile-popup');
export const profileEditBtn = document.querySelector('.profile__edit-button');

export const profileForm = profilePopup.querySelector('#profile-form');
export const nameInput = profileForm.querySelector('#profile-name-input');
export const jobInput = profileForm.querySelector('#profile-caption-input');

export const formEditProfile = profilePopup.querySelector('.form-edit-profile');
export const formAddCard = cardPopup.querySelector('.form-add-card');

export const formObj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
  }

export const сardObj = {
    elementSelector: '#element-template', 
    cardsContainer: '.elements',
    cardImageClass: '.element__image'
  }
  
export const popupObj = {
    addCardClass: '.add-card-popup', 
    openImageClass: '.open-image-popup',
    profileClass: '.profile-popup',
    profileForm: '#profile-form'
  }

export const initCards = [
      {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      }
    ]; 