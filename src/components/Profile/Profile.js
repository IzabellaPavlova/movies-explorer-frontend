import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile() {
  // const currentUser = useContext(CurrentUserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru'
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setLoggedIn(true);
  }, []);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleEditChange() {
    setIsEdit(true);
  }

  function handleUpdateName(event) {
    setName(event.target.value);
  }

  function handleUpdateEmail(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCurrentUser({
      name: name,
      email: email,
    });
    setIsEdit(false);
  }

  return (
    <div className='page'>
      <Header loggedIn={loggedIn}/>
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form">
            <label className="profile__container">
              <span className="profile__text">Имя</span>
              <input
                className="profile__input"
                name="name"
                placeholder="Введите Имя"
                value={name || ""}
                type="text"
                minLength={2}
                maxLength={20}
                disabled={!isEdit}
                onChange={handleUpdateName}
                required
              ></input>
            </label>
            <label className="profile__container">
              <span className="profile__text">E-mail</span>
              <input
                className="profile__input"
                name="email"
                placeholder="Введите E-mail"
                value={email}
                type="email"
                disabled={!isEdit}
                onChange={handleUpdateEmail}
                required
              ></input>
            </label>
          </form>
          {isEdit
            ? (
              <div className="profile__buttons">
                <button className="profile__save" type="submit" onClick={handleSubmit}>Сохранить</button>
              </div>
            )
            : (
              <div className="profile__buttons">
                <button
                  className="profile__button profile__button_type_edit"
                  type="button"
                  onClick={handleEditChange}
                >
                  Редактировать
                </button>
                <Link
                  to="/signin"
                  className="profile__button profile__button_type_exit"
                  type="button"
                >
                  Выйти из аккаунта
                </Link>
              </div>
            )}
        </section>
      </main >
    </div >
  )
}

export default Profile;
