export default class UserInfo {
    constructor( selectorName, selectorCaption, selectorAvatar ) {
        this._selectorName = selectorName;
        this._selectorInfo = selectorCaption;
        this._selectorAvatar = selectorAvatar;
    }

    getUserInfo() {
        this._infoObj = {
            name: this._selectorName.textContent,
            caption: this._selectorInfo.textContent,  
            avatar: this._selectorInfo.src,
        }; 
        return this._infoObj;    
    }

    setUserInfo(name, caption, avatar) {
        this._selectorName.textContent = name;
        this._selectorInfo.textContent = caption;
        this._selectorAvatar.src = avatar;
    }
}