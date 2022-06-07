import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor( { selector, handleFormSubmit, popupSelector } ) {
        super(popupSelector)
        this._selector = document.querySelector(selector);
        this._popup = this._selector;   
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._selector.querySelector('.form');
    }

    open() {
        super.open();
    }

    close() {
        this._form.reset();
        super.close();
      }

    setEventListeners = () => {
        
        this._selector.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit();
        })
        super.setEventListeners();
          
      }

}