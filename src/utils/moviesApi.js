const { MOVIES_BASE_URL } = require('./constants');

class MoviesApi {
  constructor( {baseUrl} ) {
    this._baseUrl = baseUrl;
  }

  _getHeaders() {
    return {
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

  getMovies() {
    return fetch(this._baseUrl, {
      headers: this._getHeaders()
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({ baseUrl: MOVIES_BASE_URL })

export default moviesApi;
