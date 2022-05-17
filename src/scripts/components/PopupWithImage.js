import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor( name, link, popupSelector) {
        super(popupSelector)
        this._text = name;
		this._image = link;
    }

    open() {
        const imageBigPopup = document.querySelector('.open-image-popup');
        const imageBig = imageBigPopup.querySelector('.open-image-popup__image-big');
        const imageBigTitle = imageBigPopup.querySelector('.open-image-popup__title');
        imageBig.src = this._image;
        imageBigTitle.textContent = this._text;
        imageBig.alt = this._text;
    }

}