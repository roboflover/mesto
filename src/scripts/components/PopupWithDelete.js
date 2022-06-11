import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor( { selector, popupSelector } ) {
        super(popupSelector)
        this._selector = document.querySelector(selector);
        this._popup = this._selector;   
        //this._handleFormSubmit = handleFormSubmit.bind();
        this._form = this._selector.querySelector('.form');
    }

    setSubmitHandler (callback) {
      this._handleFormSubmit = callback;
      }

    setEventListeners = () => {
        
        this._selector.addEventListener('submit', (evt)=> {
          evt.preventDefault();
          // console.log(evt) 
          this._handleFormSubmit()
        })
        super.setEventListeners();
          
      }

}