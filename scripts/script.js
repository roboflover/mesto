let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');

let popUp = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');

// Находим форму в DOM
let formElement =  document.querySelector('.form');// Воспользуйтесь методом querySelector()
let popupCloseButton = popUp.querySelector('.popup__close-icon');
let formSaveButton = formElement.querySelector('.form__button');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.form__caption');// Воспользуйтесь инструментом .querySelector()
nameInput.setAttribute('value', profileName.textContent);
jobInput.setAttribute('value', profileCaption.textContent);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let newJobInfo = jobInput.value;
    let newName = nameInput.value;

    profileName.textContent = newName;
    profileCaption.textContent = newJobInfo;

    closePopup();
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

popUp.classList.add("popup_opened");

function openPopup() {
    if (editButton) {
        popUp.classList.remove("popup_opened");
    } else {
        popUp.classList.add("popup_opened");
    }
    console.log('опен попап');
}

function closePopup() {
    if (popupCloseButton) {
        popUp.classList.add("popup_opened");
    } else {
        popUp.classList.remove("popup_opened");
    }
    console.log('клоз попап');
}

editButton.addEventListener('click', openPopup);
formSaveButton.addEventListener('click', formSubmitHandler);
popupCloseButton.addEventListener('click', closePopup);

console.log(formSaveButton);

//popup_opened