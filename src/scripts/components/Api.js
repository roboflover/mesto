


class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _handleResponse = (res) => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject('Ошибка')
      }

    UserInfo() {
        return fetch(this.url + `/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._handleResponse)
    }

    updateInfo(data) {
        return fetch(this.url + `/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(this._handleResponse)
    }

    getInitialCards() {
        return fetch(this.url + `/cards`, {
            method: 'GET',
            headers: this.headers,
            
        })
        .then(this._handleResponse)        
    }

    createCard(data) {
        return fetch(this.url + `/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(this._handleResponse)
    }

    deleteCard(id) {
        return fetch(this.url + `/cards/` + id, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({id})
        })
        .then(this._handleResponse)
    }

    likeCard(data) {
        const id = data._id
        return fetch(this.url + `/cards/` + id + `/likes/`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify({id})
        })
        .then(this._handleResponse)
    }

    dislikeCard(data) {
        const id = data._id
        return fetch(this.url + `/cards/` + id + `/likes/`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({id})
        })
        .then(this._handleResponse)
    }
    
    updateAvatar(data) {
        return fetch(this.url + `/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(this._handleResponse)
    }

    getAllNeededData() {
        return Promise.all([this.getInitialCards(), this.UserInfo()])
      }



}

export { Api };