let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');

let popUp = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

let formElement =  popUp.querySelector('.form');
let popupCloseButton = popUp.querySelector('.popup__close-icon');
let formSaveButton = formElement.querySelector('.form__button');

let nameInput = formElement.querySelector('#form__name');
let jobInput = formElement.querySelector('#form__caption');


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;

    closePopup();
}

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileCaption.textContent;
    popUp.classList.add("popup_opened");    
}

function closePopup() {
    popUp.classList.remove("popup_opened");
}

editButton.addEventListener('click', openPopup);
formElement.addEventListener('submit', formSubmitHandler);
popupCloseButton.addEventListener('click', closePopup);