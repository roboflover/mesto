const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');

const profilePopup = document.querySelector('.profilePopup');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileCloseBtn = profilePopup.querySelector('.profilePopup__close-icon');
const formElement =  profilePopup.querySelector('.form');
const nameInput = formElement.querySelector('#form__name');
const jobInput = formElement.querySelector('#form__caption');

const cardPopup = document.querySelector('.addCardPopup');
const cardAddBtn = document.querySelector('.profile__add-button');
const cardCloseBtn = cardPopup.querySelector('.addCardPopup__close-icon');
const formAddCard = cardPopup.querySelector('.formAddCard');
const nameAddCardInput = formAddCard.querySelector('#formAddCard__name');
const imageAddCardInput = formAddCard.querySelector('#formAddCard__image');

const imageBigPopup = document.querySelector('.openImagePopup');
const imageBig = imageBigPopup.querySelector('.openImagePopup__image-big');
const imageBigTitle = imageBigPopup.querySelector('.openImagePopup__title');
const imageBigClose = imageBigPopup.querySelector('.openImagePopup__close-icon');

const cardsContainer = document.querySelector('.elements');

function createCard(card) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    cardElement.querySelector('.element__image').src = card.link;
    cardElement.querySelector('.element__image').alt = card.name;
    cardElement.querySelector('.element__title').textContent = card.name;
  
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
      });

    cardElement.querySelector('.element__delete').addEventListener('click',  () => {
        cardElement.remove();
    });

    cardElement.querySelector('.element__image').addEventListener('click', () => {
        openPopup(imageBigPopup);
        imageBig.src = card.link;
        imageBigTitle.textContent = card.name;
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

imageBigClose.addEventListener('click', () => {
    closePopup(imageBigPopup);
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

    closePopup(cardPopup)
}

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

