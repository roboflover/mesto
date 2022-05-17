import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    
    constructor(  { selector, handleFormSubmit, popupSelector } ) {
        super(popupSelector);
        this._selector = document.querySelector(selector);
        this._popupSelector = this._selector;
        this._handleFormSubmit = handleFormSubmit;
        
    }

    open() {
      super.open()
    }

    close() {

      this._inputList = this._selector.querySelectorAll('.form__input');
      this._inputList.forEach((input) => {
        input.value = '';
      })
      
      super.close();
    }

    _getInputValues = () => {
      
      this._inputList = this._selector.querySelectorAll('.form__input');
      this._formValues = {  };
      this._inputList.forEach((input, index) => {
        this._formValues[`text${index}`] = input.value;
      })
      return this._formValues;
    }

    setEventListeners = () => {

      this._selector.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());

      })

      super.setEventListeners();
        
    }

}