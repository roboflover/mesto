export class FormValidator {
    constructor(selectorObj, formElement) {
        this._formElement = formElement;
        this._selectorObj = selectorObj;
        

      }

    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._selectorObj.inputSelector));
        const buttonElement = this._formElement.querySelector(this._selectorObj.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        //this._toggleButtonState.bind(this)
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
            this._toggleButtonState(inputList, buttonElement);   
            this._checkInputValidity(inputElement);
          }.bind(this));
        });
      };

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._selectorObj.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this._selectorObj.inactiveButtonClass);
            buttonElement.removeAttribute('disabled', true);
        }
    }; 

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
    
          return !inputElement.validity.valid;
        })
      };  

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      };

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._selectorObj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectorObj.errorClass);
    }
    
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._selectorObj.inputErrorClass);
        errorElement.classList.remove(this._selectorObj.errorClass);
        errorElement.textContent = '';
    }

    enableValidation () {
        this._setEventListeners(this._selectorObj, this._formElement);
    }     
}
