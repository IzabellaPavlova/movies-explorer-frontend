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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import * as auth from "../../utils/auth.js";
import api from '../../utils/api.js';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isUpdateUserSuccess, setIsUpdateUserSuccess] = useState(false);

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
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("searchOptions");
    localStorage.removeItem("searchResult");
    navigate("/signin");
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
        <Route path='/' element={<Main isLoggedIn={isLoggedIn}/>}/>
        <Route
          path='/movies'
          element={
            <ProtectedRoute
              element={Movies}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute
              element={Profile}
              isLoggedIn={isLoggedIn}
              onSignOut={onSignOut}
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
