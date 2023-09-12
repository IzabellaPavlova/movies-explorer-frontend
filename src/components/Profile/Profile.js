import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import InfoPopup from '../InfoPopup/InfoPopup';
import success from '../../images/success.svg';
import reject from '../../images/reject.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [inputErrorName, setInputErrorName] = useState("");
  const [inputErrorEmail, setInputErrorEmail] = useState("");
  const isFormValid = (
    inputErrorName === '' && inputErrorEmail === ''
    && name && email
    && (name !== currentUser.name || email !== currentUser.email)
  );
  const nameErrorClass = (
    `profile__input-error ${inputErrorName === undefined
      ? ''
      : 'profile__input-error_visible'
    }`
  );
  const emailErrorClass = (
    `profile__input-error ${inputErrorEmail === undefined
      ? ''
      : 'profile__input-error_visible'
    }`
  );

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleEditChange() {
    isEdit ? setIsEdit(false) : setIsEdit(true);
  }

  function handleUpdateName(evt) {
    setName(evt.target.value);
    setInputErrorName(evt.target.validationMessage);
  }

  function handleUpdateEmail(evt) {
    setEmail(evt.target.value);
    setInputErrorEmail(evt.target.validationMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      email: email,
    });
    setIsEdit(false);
  }

  return (
    <div className='page'>
      <Header IsloggedIn={props.isLoggedIn}/>
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
            <span className={nameErrorClass}>{inputErrorName}</span>
            <label className="profile__container">
              <span className="profile__text">E-mail</span>
              <input
                className="profile__input"
                name="email"
                placeholder="Введите E-mail"
                value={email}
                type="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                disabled={!isEdit}
                onChange={handleUpdateEmail}
                required
              ></input>
            </label>
            <span className={emailErrorClass}>{inputErrorEmail}</span>
          </form>
          {isEdit
            ? (
              <div className="profile__buttons">
                <button
                  className="profile__save"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                >
                  Сохранить
                </button>
                <button
                  className="profile__button profile__button_type_edit"
                  type="button"
                  onClick={handleEditChange}
                >
                  Отменить
                </button>
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
                  onClick={props.onSignOut}
                >
                  Выйти из аккаунта
                </Link>
              </div>
            )}
          <InfoPopup
            isOpen={props.isInfoPopupOpen}
            image={props.isUpdateUserSuccess ? success : reject}
            title={props.isUpdateUserSuccess ? "Данные обновлены!" : "Что-то пошло не так :("}
            onClose={props.onCloseInfoPopup}
          />
        </section>
      </main >
    </div >
  )
}

export default Profile;
