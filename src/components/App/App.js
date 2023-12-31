import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Auth/Login/Login.js';
import Register from '../Auth/Register/Register.js';
import NotFound from '../NotFound/NotFound.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/signin' element={<Login />}/>
        <Route path='/signup' element={<Register />}/>
        <Route path='/' element={<Main />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/saved-movies' element={<SavedMovies />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path="*" element={<Navigate to="/404" replace />}/>
        <Route path="/404" element={<NotFound />}/>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
