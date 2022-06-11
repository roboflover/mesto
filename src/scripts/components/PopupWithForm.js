import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    
    constructor(  { selector, handleFormSubmit, popupSelector } ) {
        super(popupSelector);
        this._selector = document.querySelector(selector);
        this._popup = this._selector;
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._selector.querySelectorAll('.form__input');
        this._form = this._selector.querySelector('.form');
        
    }

    close() {
      this._form.reset();
      super.close();
    }

    _getInputValues = () => {
      this._formValues = {  };
      this._inputList.forEach((input, index) => {
        this._formValues[`text${index}`] = input.value;
      })
      return this._formValues;
    }

    handleSubmitButton(state, type) {
      const inactiveButtonClass = 'form__button_inactive';
      const button = this._selector.querySelector('.form__button');

      if(state === 'normal' && type === 'forma') {                   
      button.classList.add(inactiveButtonClass);
      button.setAttribute('disabled', true);
      button.textContent = 'Сохранение...';     
      } else if( state === 'then' && type === 'forma'){    
      button.classList.add(inactiveButtonClass);     
      } else if( state === 'finally' && type === 'forma'){         
      button.textContent = 'Сохранить'
      }

      if(state === 'normal' && type === 'delete') {  
      button.classList.add(inactiveButtonClass);
      button.removeAttribute('disabled');
      button.textContent = 'Удаление...';
      } else if( state === 'then' && type === 'delete'){
      button.classList.add(inactiveButtonClass);
      } else if( state === 'finally' && type === 'delete'){
      button.classList.remove(inactiveButtonClass);  
      button.textContent = 'Да'
      }
      
      if(state === 'normal' && type === 'card') {  
      button.classList.add(inactiveButtonClass);
      button.removeAttribute('disabled');
      button.textContent = 'Создание...';   
      } else if( state === 'then' && type === 'card'){
      button.classList.add(inactiveButtonClass);   
      } else if( state === 'finally' && type === 'card'){
      button.classList.remove(inactiveButtonClass);  
      button.textContent = 'Создать'
      }
    }    

    setEventListeners = () => {

      this._selector.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      })
      super.setEventListeners();
        
    }

}