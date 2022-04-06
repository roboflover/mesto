let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');

let popUp = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

let formElement =  popUp.querySelector('.form');
let popupCloseButton = popUp.querySelector('.popup__close-icon');
let formSaveButton = formElement.querySelector('.form__button');

let nameInput = formElement.querySelector('#form__name');
let jobInput = formElement.querySelector('#form__caption');

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
    const songTemplate = document.querySelector('#element-template').content;
    const songElement = songTemplate.querySelector('.element').cloneNode(true);
    songElement.querySelector('.element__image').src = cardImage;
    songElement.querySelector('.element__title').textContent = cardTitle;
  
    cardsContainer.append(songElement);
}

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