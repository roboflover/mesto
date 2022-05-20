import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._imageBigPopup = document.querySelector('.open-image-popup');
        this._imageBig = this._imageBigPopup.querySelector('.open-image-popup__image-big');
        this._imageBigTitle = this._imageBigPopup.querySelector('.open-image-popup__title');
    }

    open(name, link) {
        
        this._imageBig.src = link;
        this._imageBigTitle.textContent = name;
        this._imageBig.alt = name;
        super.open();
    }

}