export class FormValidator {
    constructor(selectorObj, formElement) {
        this._formElement = formElement;
        this._selectorObj = selectorObj;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorObj.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectorObj.submitButtonSelector);
      }

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', function () {
            this.toggleButtonState();   
            this._checkInputValidity(inputElement);
          }.bind(this));
        });
      };

    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
          this._buttonElement.classList.add(this._selectorObj.inactiveButtonClass);
          this._buttonElement.setAttribute('disabled', true);
        } else {
          this._buttonElement.classList.remove(this._selectorObj.inactiveButtonClass);
          this._buttonElement.removeAttribute('disabled', true);
        }
    }; 

    _hasInvalidInput(inputList)  {
        return inputList.some((inputElement) => {
    
          return !inputElement.validity.valid;
        })
      };  

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._selectorObj.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectorObj.errorClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._selectorObj.inputErrorClass);
        errorElement.classList.remove(this._selectorObj.errorClass);
        errorElement.textContent = '';
    }

    enableValidation () {
        this._setEventListeners();
    }     
}
