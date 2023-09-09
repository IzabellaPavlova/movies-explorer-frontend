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

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // auth

  function onRegister(name, email, password) {
    auth.registerUser(name, email, password).then(() => {
      navigate("/signin");
    }).catch((err) => {
      console.log(err);
    })
  }

  function onLogin(email, password) {
    auth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      navigate("/movies");
    }).catch((err) => {
      console.log(err);
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/signin'
          element={
            isLoggedIn
              ? <Navigate to='/movies'/>
              : <Login onLogin={onLogin}/>
            }
        />
        <Route
          path='/signup'
          element={
            isLoggedIn
              ? <Navigate to='/movies' />
              : <Register onRegister={onRegister}/>
            }
          />
        <Route path='/' element={<Main />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/saved-movies' element={<SavedMovies />}/>
        <Route path='/profile' element={<Profile onSignOut={onSignOut}/>}/>
        <Route path="*" element={<Navigate to="/404" replace />}/>
        <Route path="/404" element={<NotFound />}/>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
