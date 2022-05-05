import { bigImageOpen, 
         setEventListeners } from '../index.js';

export class Card {

    constructor(data, selectorObj) {
      this._name = data.name;
      this._link = data.link;
      this._cardImage = selectorObj.cardImage
      this._cardSelector = selectorObj.elementSelector;
      this._setEventListeners = setEventListeners;
      this._bigImageOpen = bigImageOpen;
    }

    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.element')
        .cloneNode(true);
      return cardElement;
      }

    generateCard() {

      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector(this._cardImage); 
      this._setEventListeners(this._element);
      this._bigImageOpen (this._cardImage,this._name, this._link);
      this._element.querySelector('.element__title').textContent = this._name;
      this._cardImage.alt = this._name;
      this._cardImage.src = this._link;
      
      return this._element;
                  
      }
  }