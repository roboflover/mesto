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

headerAvatar.src = 'https://i.pinimg.com/736x/54/ee/27/54ee2732c224d39ee86a79aeb3b9fb20.jpg';

const popupImage = new PopupWithImage(popupObj.openImageClass);
popupImage.setEventListeners();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '53064e8b-1eab-4709-a686-d494c78cd7ae',
    'Content-Type': 'application/json',
  }
}); 

api.getInitialCards()
  .then(data => {
    const sectionCard = new Section({
      data: data,
      renderer: (item) => {
        const cardElement = createCard(item);
        sectionCard.addItem(cardElement);
      }}, сardObj.cardsContainer);
    sectionCard.renderItems();
  })

api.UserInfo()
  .then(data => {
    profileName.textContent = data.name
    profileCaption.textContent = data.about
  })

function createCard(item) {
  const card = new Card( item, сardObj.elementSelector, handleCardClick, handleDeleteCard, handleLikeCard, handleDislikeCard, userId);
  const cardElement = card.generateCard();
  return cardElement
}

const handleLikeCard = (item) => {
  api.likeCard(item)
    .then((res) => {  
      const number = item._element.querySelector('.element__num-like'); 
      number.textContent = res.likes.length;
  })
}

const handleDislikeCard = (item) => {
  api.dislikeCard(item)
    .then((res) => {   
      const number = item._element.querySelector('.element__num-like'); 
      number.textContent = res.likes.length;
  })
}

const profileValidation = new FormValidator(formObj, formEditProfile);
const newCardValidation = new FormValidator(formObj, formAddCard);
const editAvatarValidation = new FormValidator(formObj, formAvatar);
const deleteValidation = new FormValidator(formObj, formDelete);

profileValidation.enableValidation();
newCardValidation.enableValidation();  
editAvatarValidation.enableValidation();
deleteValidation.enableValidation();

const handleDeleteCard = (item) => {
    const deleteClass = popupObj.deleteClass;  
    const deleteFormPopup = new PopupWithDelete({ selector: deleteClass, handleFormSubmit: () => {
      const id = item._id;
      deleteFormPopup.handleSubmitButton('normal', deleteType); 
      api.deleteCard(id)
        .then(() => {
          item._element.remove();
          deleteFormPopup.close()
          deleteFormPopup.handleSubmitButton('then', deleteType); 
        })
        .catch((err) => console.log(err))
        .finally( _ => {        
          deleteFormPopup.close(); 
          deleteFormPopup.handleSubmitButton('finally', deleteType);
        })   
      } 
    });
    deleteFormPopup.open();
    deleteFormPopup.setEventListeners();

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
          const sectionCard = new Section({
            data: data,
            renderer: (data) => {
              const cardElement = createCard(data);
              sectionCard.prependItem(cardElement);
            }}, сardObj.cardsContainer);
          sectionCard.renderItem();
          addCardFormPopup.handleSubmitButton('then', formaCard);             
        })
        .catch((err) => console.log(err))
        .finally( _ => {        
          addCardFormPopup.close(); 
          addCardFormPopup.handleSubmitButton('finally', formaCard);
        })        
    }
  });

addCardFormPopup.setEventListeners();

function openAddCardPopup(){
  newCardValidation.toggleButtonState();
  addCardFormPopup.open();
} 

const userInfoProfile = new UserInfo(profileName, profileCaption)
const profileClass = popupObj.profileClass;
const avatarClass = popupObj.avatarClass;

const editFormPopup = new PopupWithForm({
  selector: profileClass, 
  handleFormSubmit: (input) => { 
    input.name = input.text0;
    input.about = input.text1;
    editFormPopup.handleSubmitButton('normal', formaType);
    api.updateInfo(input)
    .then((res) => {
      userInfoProfile.setUserInfo(res.name, res.about);
      editFormPopup.handleSubmitButton('then', formaType);
    })
    .finally(() => {
      editFormPopup.handleSubmitButton('finally', formaType);
      editFormPopup.close(); 
    })    
  }
});

editFormPopup.setEventListeners();

function openProfilePopup() {
  const infoObj = userInfoProfile.getUserInfo()
  nameInput.value = infoObj.name;
  jobInput.value = infoObj.caption; 
  profileValidation.enableValidation();
  editFormPopup.open();
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
      .then((res) => {  
        profileAvatar.src = res.avatar
        editAvatarPopup.handleSubmitButton('then', formaType);
    })    
      .finally(() => {
        editAvatarPopup.handleSubmitButton('finally', formaType);
        editAvatarPopup.close(); 
    })    
  }
});
editAvatarPopup.setEventListeners();

function openAvatarPopup() {
  editAvatarValidation.enableValidation();
  editAvatarPopup.open();
}

api.UserInfo()
.then((res) => {  
  profileAvatar.src = res.avatar
})    

let userId;
// Здесь должен обрабатываться Promise.all 
api.getAllNeededData() 
   .then(( [cards, userData] ) => {
     //console.log(userData._id)
     userInfo.setUserInfo(userData)
     userId = userData._id
     //console.log(userId)
     sectionCard.renderItems(cards);
     cardList.render(cards)
   })

profileEditBtn.addEventListener('click', openProfilePopup);
cardAddBtn.addEventListener('click', openAddCardPopup);
headerAvaContainer.addEventListener('click', openAvatarPopup);





