export class Card {

    constructor( {name, link, _id, owner, likes}, 
      templateSelector, 
      handleCardClick, handleDeleteCard, handleLikeCard, handleDislikeCard, userId) {
      this._name = name;
      this._link = link;
      this._id = _id;
      this._owner = owner;
      this._likes = likes;
      this._cardSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLikeCard = handleLikeCard;
      this._handleDislikeCard = handleDislikeCard;
      this._switchLike = false;
      this._userId = userId
    }

    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.element')
        .cloneNode(true);
      return cardElement;
      }
    
    _setEventListeners() {
      this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like_active');
            if (!this._switchLike){
              this._handleLikeCard( this )
              this._switchLike = true;
            } else {
              this._handleDislikeCard( this )
              this._switchLike = false;
            }            
        });      

        this._element.querySelector('.element__delete').addEventListener('click',  () => {
          this._handleDeleteCard( this )
      });

      this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
        });    
    
      }

    generateCard() {

      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.element__image'); 
      
      this._element.querySelector('.element__title').textContent = this._name;
      this._element.querySelector('.element__num-like').textContent = this._likes.length;
      this._cardImage.alt = this._name;
      this._cardImage.src = this._link;
      this._cardImage.id = this._id;
      this._cardImage.owner = this._owner._id;

      this._likeSelector = this._element.querySelector('.element__like');
        this._likes.forEach(element => {
          if(element._id === this._userId){
            this._switchLike = true;
            this._likeSelector.classList.toggle('element__like_active');
          }
        });

      if( this._owner._id === this._userId ){
        this._element.querySelector('.element__delete').classList.add('element_delete-active')
      } 

      this._setEventListeners()
      
      return this._element;
                  
      }
  }