const showInputError = (selectorObj, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(selectorObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectorObj.errorClass);
}

const hideInputError = (selectorObj, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(selectorObj.inputErrorClass);
    errorElement.classList.remove(selectorObj.errorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (selectorObj, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(selectorObj, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(selectorObj, formElement, inputElement);
    }
  };

const setEventListeners = (selectorObj, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(selectorObj.inputSelector));
    const buttonElement = formElement.querySelector(selectorObj.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        toggleButtonState(selectorObj, inputList, buttonElement);   
        checkInputValidity(selectorObj, formElement, inputElement);
      });
    });
  };

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {

      return !inputElement.validity.valid;
    })
  };   

const toggleButtonState = (selectorObj, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(selectorObj.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(selectorObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  }; 
  

function enableValidation(selectorObj){
    const formList = Array.from(document.querySelectorAll(selectorObj.formSelector));
    formList.forEach((formElement) => {
      const buttonElement = formElement.querySelector(selectorObj.submitButtonSelector);
      buttonElement.classList.add(selectorObj.inactiveButtonClass);
      setEventListeners(selectorObj, formElement);
    });
  };  

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 