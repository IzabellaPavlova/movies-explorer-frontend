import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Auth/Login/Login.js';
import Register from '../Auth/Register/Register.js';
import NotFound from '../NotFound/NotFound.js';
import * as auth from "../../utils/auth.js";
import api from '../../utils/api.js';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isUpdateUserSuccess, setIsUpdateUserSuccess] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  // auth

  function onRegister(name, email, password) {
    auth.registerUser(name, email, password).then(() => {
      navigate("/signin");
    }).catch((err) => {
      setErrorMessage(err);
      console.log(err);
    })
  }

  function onLogin(email, password) {
    auth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      navigate("/movies");
    }).catch((err) => {
      setErrorMessage(err);
    })
  }

  function onSignOut() {
    console.log("sign-out");
    setIsLoggedIn(false);
    navigate("/signin");
    localStorage.removeItem("jwt");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);

  // UserInfo, SavedMovies

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getSavedMovies()])
        .then(([userData, movies]) => {
          setCurrentUser({ ...userData, isLoggedIn: true });
          setSavedMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [isLoggedIn]);

  // Profile

  function onUpdateUser(data) {
    api.updateUserInfo(data).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      setIsUpdateUserSuccess(true);
    }).catch((err) => {
      setIsUpdateUserSuccess(false);
      console.error(err);
    }).finally(() => {
      setIsInfoPopupOpen(true);
    });
  }

  function onCloseInfoPopup() {
    setIsInfoPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/signin'
          element={
            isLoggedIn
              ? <Navigate to='/movies'/>
              : <Login onLogin={onLogin} errorMessage={errorMessage}/>
            }
        />
        <Route
          path='/signup'
          element={
            isLoggedIn
              ? <Navigate to='/movies' />
              : <Register onRegister={onRegister} errorMessage={errorMessage}/>
            }
          />
        <Route path='/' element={<Main />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/saved-movies' element={<SavedMovies />}/>
        <Route
          path='/profile'
          element={
            <Profile
              onSignOut={onSignOut}
              isLoggedIn={isLoggedIn}
              onUpdateUser={onUpdateUser}
              isInfoPopupOpen={isInfoPopupOpen}
              isUpdateUserSuccess={isUpdateUserSuccess}
              onCloseInfoPopup={onCloseInfoPopup}
            />
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />}/>
        <Route path="/404" element={<NotFound />}/>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
