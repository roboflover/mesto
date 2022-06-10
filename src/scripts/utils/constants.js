export const cardPopup = document.querySelector('.add-card-popup');
export const cardAddBtn = document.querySelector('.profile__add-button');

export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileCaption = profile.querySelector('.profile__caption');
export const profileAvatar = profile.querySelector('.profile__avatar'); 

export const profilePopup = document.querySelector('.profile-popup');
export const profileEditBtn = document.querySelector('.profile__edit-button');

export const avatarPopup = document.querySelector('.edit-avatar-popup'); 
export const deletePopup = document.querySelector('.delete-popup'); 

export const profileForm = profilePopup.querySelector('#profile-form');
export const nameInput = profileForm.querySelector('#profile-name-input');
export const jobInput = profileForm.querySelector('#profile-caption-input');

export const formEditProfile = profilePopup.querySelector('.form-edit-profile');
export const formAddCard = cardPopup.querySelector('.form-add-card');
export const formAvatar = avatarPopup.querySelector('.form-avatar');
export const formDelete = deletePopup.querySelector('.form-delete');

export const formButton = formEditProfile.querySelector('.form__button');

export const isDeleteCard = false;

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
    deleteClass: '.delete-popup', 
    openImageClass: '.open-image-popup',
    profileClass: '.profile-popup',
    profileForm: '#profile-form',
    avatarClass: '.edit-avatar-popup',

  }

export const deleteType = 'delete';
export const formaType = 'forma';
export const formaCard = 'card';

export const headerAvatar = document.querySelector('.profile__avatar');
export const headerAvaContainer = document.querySelector('.profile__ava-container');

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

export const card = {
  createdAt: '2022-06-02T13:01:34.006Z',
  likes: [],
  link: 'https://cs7.pikabu.ru/post_img/2018/04/12/9/1523545224168637669.jpg',
  name: "racoon",
  owner: {
    about: 'Первый человек в космосе',
    avatar: 'https://papik.pro/uploads/posts/2022-01/1642364365_1-papik-pro-p-gagarin-klipart-1.png',
    cohort: 'cohort-42',
    name: 'Григорян Степан Николаевич',
    _id: '139188094b3fc7ccb55a5d48',
  },
  _id: "",
}
