export default class UserInfo {
    constructor( selectorName, selectorCaption ) {
        this._selectorName = selectorName;
        this._selectorInfo = selectorCaption;
    }

    getUserInfo() {
        this._infoObj = {};
        this._infoObj.name = this._selectorName.textContent;
        this._infoObj.caption = this._selectorInfo.textContent;   
        return this._infoObj;    
    }

    setUserInfo(name, caption) {
        this._selectorName.textContent = name;
        this._selectorInfo.textContent = caption;
    }
}