export class Card {

    constructor({ name, link }, templateSelector, handleCardClick) {
      this._name = name;
      this._link = link;
      this._cardSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.element')
        .cloneNode(true);
      return cardElement;
      }
    
    _setEventListeners() {

      this._element.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
      });
    
      this._element.querySelector('.element__delete').addEventListener('click',  () => {
        this._element.remove();
      });

      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
        });
    
    }

    generateCard() {

      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.element__image'); 
      
      this._element.querySelector('.element__title').textContent = this._name;
      this._cardImage.alt = this._name;
      this._cardImage.src = this._link;

      this._setEventListeners()
      
      return this._element;
                  
      }
  }