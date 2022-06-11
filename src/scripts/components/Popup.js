export default class Popup {
    
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);    
    }

    close() {   
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if(evt)        
            if (evt.code === 'Escape') {
                this.close();
            }
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
  
    // setSubmitHandler(callback){
    //     console.log(callback)
    // }

    setEventListeners(){
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup') 
            || evt.target.classList.contains('popup__close'))
            {              
            this.close();
            }            
        });         
    }
}

