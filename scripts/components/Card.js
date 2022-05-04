const cardsContainer = document.querySelector('.elements');
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

export class Card {

    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content.querySelector('.element')
          .cloneNode(true);
        return cardElement;
      }

    _openPopup = (popup) => { 
        popup.classList.add('popup_opened');    
        popup.addEventListener('click', this._overlayClosePopup);   
        document.addEventListener('keydown', this._escapeClosePopup);
      }
      
    _closePopup = (popup) => {
        document.removeEventListener('keydown', this._escapeClosePopup);
        popup.removeEventListener('click', this._overlayClosePopup);   
        popup.classList.remove('popup_opened');
      }

    _overlayClosePopup = (evt) => {
      const popupOpened = document.querySelector('.popup_opened')
      if(evt.target.classList[0] === popupOpened.classList[0])  {
        this._closePopup(popupOpened);
      }
    }
    
    _escapeClosePopup = (evt) => {     
      if (evt.code == 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        this._closePopup(popupOpened);
      }
    } 

    _setEventListeners() {
      const elementImage = this._element.querySelector('.element__image');  
      this._element.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
      });

      this._element.querySelector('.element__delete').addEventListener('click',  () => {
        this._element.remove();
      });

      elementImage.addEventListener('click', () => {
        imageBig.src = this._link;
        imageBigTitle.textContent = this._name;
        imageBig.alt = this._name;
        this._openPopup(imageBigPopup);
      });

      imageBigClose.addEventListener('click', () => {
        this._closePopup(imageBigPopup);
      });
      
    }

    generateCard() {

      this._element = this._getTemplate();
      this._setEventListeners();

      this._element.querySelector('.element__title').textContent = this._name;
      this._element.querySelector('.element__image').src = this._link;
      
      return this._element;
                
      }
}

export class AddCard extends Card {

  constructor (cardSelector) {
    super(cardSelector);
  }

  _addCardFormSubmitHandler = (evt) => {
    evt.preventDefault(); 
 
    const item = {
      name: addcardNameInput.value,
      link: addcardImageInput.value
    }

    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);

    this._closePopup(cardPopup);
    addcardNameInput.value = '';
    addcardImageInput.value = '';

    const buttonElement = evt.target.querySelector('.form__button');
    buttonElement.classList.add('form__button_inactive');
    buttonElement.setAttribute('disabled', true);
}

  addCardComplete() {

    cardAddBtn.addEventListener('click', () => {
      this._openPopup(cardPopup);
    });
    addCardForm.addEventListener('submit', this._addCardFormSubmitHandler);
    cardCloseBtn.addEventListener('click', () => {
      this._closePopup(cardPopup);
    });  
  }

}




