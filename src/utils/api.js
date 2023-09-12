const { BASE_URL } = require('./constants');

class Api {
  constructor( {baseUrl} ) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    return {
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    };
  }

  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    else {
      return Promise.reject(`${result.status} Error: ${result.statusText}`);
    }
  }

  getUserInfo() {
    const requestUrl = this._baseUrl + '/users/me';
    return fetch(requestUrl, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  updateUserInfo({ name, email}) {
    const requestUrl = this._baseUrl + '/users/me';
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    const requestUrl = this._baseUrl + '/movies';
    return fetch(requestUrl, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  addSavedMovie(movie) {
    const requestUrl = this._baseUrl + '/movies';
    return fetch(requestUrl, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(movie),
    }).then(this._checkResponse);
  }

  removeMovie(movieId) {
    const requestUrl = this._baseUrl + `/movies/${movieId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }
}

const api = new Api({ baseUrl: BASE_URL })

export default api;