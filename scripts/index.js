const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');

const profilePopup = document.querySelector('.profile-popup');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileCloseBtn = profilePopup.querySelector('.profile-popup__close-icon');
const formElement =  profilePopup.querySelector('.form');
const nameInput = formElement.querySelector('#form__name');
const jobInput = formElement.querySelector('#form__caption');

const cardPopup = document.querySelector('.add-card-popup');
const cardAddBtn = document.querySelector('.profile__add-button');
const cardCloseBtn = cardPopup.querySelector('.add-card-popup__close-icon');
const formAddCard = cardPopup.querySelector('.formAddCard');
const nameAddCardInput = formAddCard.querySelector('#formAddCard__name');
const imageAddCardInput = formAddCard.querySelector('#formAddCard__image');

const imageBigPopup = document.querySelector('.open-image-popup');
const imageBig = imageBigPopup.querySelector('.open-image-popup__image-big');
const imageBigTitle = imageBigPopup.querySelector('.open-image-popup__title');
const imageBigClose = imageBigPopup.querySelector('.open-image-popup__close-icon');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image')

    elementImage.src = card.link;
    elementImage.alt = card.name;
    cardElement.querySelector('.element__title').textContent = card.name;
  
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
      });

    cardElement.querySelector('.element__delete').addEventListener('click',  () => {
        cardElement.remove();
    });

    elementImage.addEventListener('click', () => {
        imageBig.src = card.link;
        imageBigTitle.textContent = card.name;
        openPopup(imageBigPopup);
      });
    
    return cardElement;
    //cardsContainer.prepend(cardElement);    
}

function openPopup(popup) {
  popup.classList.add('popup_opened');    
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function renderCard(card) {
  cardsContainer.prepend(createCard(card)); 
}

initialCards.forEach(function (card) {
  renderCard(card);
});

function formSubmitHandler (evt) {
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

function formAddCardSubmitHandler (evt) {
    evt.preventDefault(); 
    
    card.name = nameAddCardInput.value;
    card.link = imageAddCardInput.value;
    renderCard(card);

    closePopup(cardPopup);
    nameAddCardInput.value = '';
    imageAddCardInput.value = '';
}

imageBigClose.addEventListener('click', () => {
  closePopup(imageBigPopup);
});

profileEditBtn.addEventListener('click', openEditProfilePopup);
formElement.addEventListener('submit', formSubmitHandler);
profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});
cardAddBtn.addEventListener('click', () => {
  openPopup(cardPopup)
});
formAddCard.addEventListener('submit', formAddCardSubmitHandler);
cardCloseBtn.addEventListener('click', () => {
  closePopup(cardPopup);
});

