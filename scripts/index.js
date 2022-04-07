const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');

const popUp = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popUp.querySelector('.popup__close-icon');
const formElement =  popUp.querySelector('.form');
const nameInput = formElement.querySelector('#form__name');
const jobInput = formElement.querySelector('#form__caption');

const addCardPopup = document.querySelector('.addCardPopup');
const addButton = document.querySelector('.profile__add-button');
const addCardCloseButton = addCardPopup.querySelector('.addCardPopup__close-icon');
const formAddCard = addCardPopup.querySelector('.formAddCard');
const nameAddCardInput = formAddCard.querySelector('#formAddCard__name');
const imageAddCardInput = formAddCard.querySelector('#formAddCard__image');

const openImagePopup = document.querySelector('.openImagePopup');
const openPopupImageBig = openImagePopup.querySelector('.openImagePopup__image-big');
const openPopupImageTitle = openImagePopup.querySelector('.openImagePopup__title');
const openPopupImageClose = openImagePopup.querySelector('.openImagePopup__close-icon');


const initialCards = [
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

const cardsContainer = document.querySelector('.elements');

function addCard(cardTitle, cardImage) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__image').src = cardImage;
    cardElement.querySelector('.element__image').alt = cardTitle;
    cardElement.querySelector('.element__title').textContent = cardTitle;
  
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
      });

    cardElement.querySelector('.element__delete').addEventListener('click',  () => {
        cardElement.remove();
    });

    cardElement.querySelector('.element__image').addEventListener('click', () => {
        openImagePopup.classList.add('openImagePopup_opened'); 
        openPopupImageBig.src = cardImage;
        openPopupImageTitle.textContent = cardTitle;
    });
    
    cardsContainer.prepend(cardElement);    
}

openPopupImageClose.addEventListener('click', () => {
    openImagePopup.classList.remove('openImagePopup_opened');
});

initialCards.forEach(function (item) {
    addCard(item.name, item.link);
})

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;

    closePopup();
}

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileCaption.textContent;
    popUp.classList.add("popup_opened");    
}

function closePopup() {
    popUp.classList.remove("popup_opened");
}

editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
popupCloseButton.addEventListener('click', closePopup);

function formAddCardSubmitHandler (evt) {
    evt.preventDefault(); 
    
    addCard(nameAddCardInput.value, imageAddCardInput.value);

    closeAddCardPopup();
}

function openAddCardsPopup() {
    addCardPopup.classList.add("addCardPopup_opened");    
}

function closeAddCardPopup() {
    addCardPopup.classList.remove("addCardPopup_opened");
}

addButton.addEventListener('click', openAddCardsPopup);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);
addCardCloseButton.addEventListener('click', closeAddCardPopup);