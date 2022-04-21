const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');

const profilePopup = document.querySelector('.profile-popup');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileCloseBtn = profilePopup.querySelector('.profile-popup__close-icon');

const formElement =  profilePopup.querySelector('.form');

const profileForm =  profilePopup.querySelector('#profile-form');
const nameInput = profileForm.querySelector('#profile-name-input');
const jobInput = profileForm.querySelector('#profile-caption-input');

const cardPopup = document.querySelector('.add-card-popup');
const cardAddBtn = document.querySelector('.profile__add-button');
const cardCloseBtn = cardPopup.querySelector('.add-card-popup__close-icon');

const addCardForm = cardPopup.querySelector('#add-card-form');
const addcardNameInput = addCardForm.querySelector('#add-card-name-input');
const addcardImageInput = addCardForm.querySelector('#add-card-image-input');

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
        imageBig.alt = card.name;
        openPopup(imageBigPopup);
      });

    return cardElement;
}

function openPopup(popup) { 
  popup.classList.add('popup_opened');    
  popup.addEventListener('click', (evt) => {    
    if(evt.target.classList[0] === popup.classList[0])  {
      closePopup(popup);
    }
  }); 
  document.addEventListener('keydown', escapeClosePopup);
}



function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function escapeClosePopup(evt) {
  if (evt.code == 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
  document.removeEventListener('keydown', escapeClosePopup);
}  

function renderCard(card) {
  cardsContainer.prepend(createCard(card)); 
}

initialCards.forEach(function (card) {
  renderCard(card);
});

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

function addCardFormSubmitHandler (evt) {
    evt.preventDefault(); 
    
    card.name = addcardNameInput.value;
    card.link = addcardImageInput.value;
    renderCard(card);

    closePopup(cardPopup);
    addcardNameInput.value = '';
    addcardImageInput.value = '';

    const buttonElement = evt.target.querySelector('.form__button');
    buttonElement.classList.add('form__button_inactive');
    buttonElement.removeAttribute('disabled', true);
}

imageBigClose.addEventListener('click', () => {
  closePopup(imageBigPopup);
});
profileEditBtn.addEventListener('click', openEditProfilePopup);
profileForm.addEventListener('submit', profileFormSubmitHandler);
profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});
cardAddBtn.addEventListener('click', () => {
  openPopup(cardPopup);
});
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
cardCloseBtn.addEventListener('click', () => {
  closePopup(cardPopup);
});


