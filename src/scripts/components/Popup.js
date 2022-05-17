export default class Popup {
    
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');    
    }

    close() {   
        this._popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose(){
        document.addEventListener('keydown', (evt) => {
            if (evt.code == 'Escape') {
                this.close();
              }
        });

    }

    setEventListeners(){
        this._handleEscClose();
       
        this._popupSelector.addEventListener('mousedown', (evt) => {
            
            if (evt.target.classList.contains('popup') 
            || evt.target.classList.contains('profile-popup__close-icon') 
            || evt.target.classList.contains('add-card-popup__close-icon') 
            || evt.target.classList.contains('open-image-popup__close-icon')) 
            {
            this.close();
            }            
        }); 
        
        
    }
}

