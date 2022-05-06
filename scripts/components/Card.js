export class Card {

    constructor(data, templateSelector, openBigImage) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = templateSelector;
      this._openBigImage = openBigImage;
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
        this._openBigImage (this._name, this._link);
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