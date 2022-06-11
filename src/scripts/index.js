import '../pages/index.css';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js'
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithDelete from './components/PopupWithDelete.js';

import UserInfo from './components/UserInfo.js';
import { Api } from './components/Api.js';

import {
  cardAddBtn, profileName, profileCaption, profileEditBtn, 
  nameInput, jobInput, formEditProfile, formAddCard, 
  formObj, сardObj, popupObj, card, profileAvatar, formAvatar, 
  headerAvatar, headerAvaContainer, deleteType, formaType, formDelete, formaCard,
} from './utils/constants.js'

const profileClass = popupObj.profileClass;
const avatarClass = popupObj.avatarClass;

headerAvatar.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Circle-icons-loading.svg/2048px-Circle-icons-loading.svg.png';

const popupImage = new PopupWithImage(popupObj.openImageClass);
popupImage.setEventListeners();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '53064e8b-1eab-4709-a686-d494c78cd7ae',
    'Content-Type': 'application/json',
  }
}); 

const deleteClass = popupObj.deleteClass;  
const deleteFormPopup = new PopupWithDelete({ selector: deleteClass });
deleteFormPopup.setEventListeners();

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formObj);

const sectionCard = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    sectionCard.addItem(cardElement);
  }}, сardObj.cardsContainer);

function createCard(item) {
  const card = new Card( item, сardObj.elementSelector, handleCardClick, handleDeleteCard, handleLikeCard, handleDislikeCard, userId);
  const cardElement = card.generateCard();
  return cardElement
}

const handleDeleteCard = (item) => {
    deleteFormPopup.setSubmitHandler( _ => {
      const id = item._id;  
      deleteFormPopup.handleSubmitButton('normal', deleteType);       
        api.deleteCard(id)
          .then(() => {
            item._element.remove();
            deleteFormPopup.close()
            deleteFormPopup.handleSubmitButton('then', deleteType); 
          })
          .finally( _ => {        
            deleteFormPopup.handleSubmitButton('finally', deleteType);
          })   
          .catch((err) => console.log(err))
    })
  deleteFormPopup.open();
}

const handleLikeCard = (item) => {
  api.likeCard(item)
    .then((res) => {  
      item._element.querySelector('.element__like').classList.toggle('element__like_active');
      const number = item._element.querySelector('.element__num-like'); 
      number.textContent = res.likes.length;
  })
    .catch((err) => console.log(err))
}

const handleDislikeCard = (item) => {
  api.dislikeCard(item)
    .then((res) => {  
      item._element.querySelector('.element__like').classList.toggle('element__like_active'); 
      const number = item._element.querySelector('.element__num-like'); 
      number.textContent = res.likes.length;
  })
    .catch((err) => console.log(err))
}
const userInfoProfile = new UserInfo( profileName, profileCaption, profileAvatar )

const editFormPopup = new PopupWithForm({
  selector: profileClass, 
  handleFormSubmit: (input) => { 
    input.name = input.text0;
    input.about = input.text1;
    editFormPopup.handleSubmitButton('normal', formaType);
    api.updateInfo(input)
    .then((res) => {
      userInfoProfile.setUserInfo(res.name, res.about, res.avatar);
      editFormPopup.handleSubmitButton('then', formaType);
      editFormPopup.close();
    })
    .finally(() => {
      editFormPopup.handleSubmitButton('finally', formaType); 
    })   
    .catch((err) => console.log(err)) 
  }
});

editFormPopup.setEventListeners();

function openProfilePopup() {
  const infoObj = userInfoProfile.getUserInfo()
  nameInput.value = infoObj.name;
  jobInput.value = infoObj.caption; 
  formValidators['form-edit-profile'].enableValidation();
  editFormPopup.open();
}

const addCardClass = popupObj.addCardClass;  
const addCardFormPopup = new PopupWithForm({ 
    selector: addCardClass, 
    handleFormSubmit: (input) => { 
      card.name = input.text0;
      card.link = input.text1;
      addCardFormPopup.handleSubmitButton('normal', formaCard);
      api.createCard(card)
        .then((data) => {
          sectionCard.renderItem(data);
          addCardFormPopup.handleSubmitButton('then', formaCard);     
          addCardFormPopup.close();        
        })
        .finally( _ => {        
          addCardFormPopup.handleSubmitButton('finally', formaCard);
        })     
        .catch((err) => console.log(err))   
    }
  });

addCardFormPopup.setEventListeners();

function openAddCardPopup(){
  formValidators['form-add-card'].toggleButtonState();
  addCardFormPopup.open();
} 

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const editAvatarPopup = new PopupWithForm({
  selector: avatarClass, 
  handleFormSubmit: (input) => {     
    const json = { avatar: input.text0 }
    editAvatarPopup.handleSubmitButton('normal', formaType);  
    api.updateAvatar(json)
      .then((userData) => {  
        userInfoProfile.setUserInfo( userData.name, userData.about, userData.avatar );
        editAvatarPopup.handleSubmitButton('then', formaType);
        editAvatarPopup.close(); 
    })    
      .finally(() => {
        editAvatarPopup.handleSubmitButton('finally', formaType);       
    })
      .catch((err) => console.log(err))    
  }
});
editAvatarPopup.setEventListeners();

function openAvatarPopup() {
  editAvatarPopup.open();
}

let userId;

api.getAllNeededData() 
   .then(( [cards, userData] ) => {  
    userId = userData._id
    sectionCard.renderItems(cards);
    userInfoProfile.setUserInfo( userData.name, userData.about, userData.avatar );
   })
   .catch((err) => console.log(err))

profileEditBtn.addEventListener('click', openProfilePopup);
cardAddBtn.addEventListener('click', openAddCardPopup);
headerAvaContainer.addEventListener('click', openAvatarPopup);





