import { Link } from 'react-router-dom';
import { useState } from "react";
import Logo from '../../Logo/Logo'

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputErrorName, setInputErrorName] = useState("");
  const [inputErrorEmail, setInputErrorEmail] = useState("");
  const [inputErrorPassword, setInputErrorPassword] = useState("");
  const isFormValid = (
    inputErrorName === '' && inputErrorEmail === '' && inputErrorPassword === ''
    && name && email && password
  );

  const nameErrorClass = (
    `auth__input-error ${inputErrorName === undefined
      ? ''
      : 'auth__input-error_visible'
    }`
  );
  const emailErrorClass = (
    `auth__input-error ${inputErrorEmail === undefined
      ? ''
      : 'auth__input-error_visible'
    }`
  );
  const passwordErrorClass = (
    `auth__input-error ${inputErrorPassword === undefined
      ? ''
      : 'auth__input-error_visible'
    }`
  );
  const authErrorClass = (
    `auth__catch-error ${props.errorMessage === undefined
      ? ''
      : 'auth__catch-error_visible'
    }`
  );

  function catchBackendError() {
    if (props.errorMessage.includes("400")) {
      return "Введены некорректные данные";
    }
    if (props.errorMessage.includes("409")) {
      return "Пользователь с таким email уже существует";
    }
    return "";
  }

  function handleNameInput(evt) {
    setName(evt.target.value);
    setInputErrorName(evt.target.validationMessage);
  }

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
    setInputErrorEmail(evt.target.validationMessage);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
    setInputErrorPassword(evt.target.validationMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(name, email, password);
  }

  return (
    <div className="page">
      <main>
        <section className="auth">
          <Logo />
          <h1 className="auth__title">Добро пожаловать!</h1>
          <form id="register" className="auth__form" onSubmit={handleSubmit}>
            <div className="auth__container">
              <p className="auth__name">Имя</p>
              <input
                className="auth__input"
                type="text"
                placeholder="Заполните Имя"
                name="userName"
                minLength={2}
                maxLength={30}
                required
                onChange={handleNameInput}
              ></input>
              <span className={nameErrorClass}>{inputErrorName}</span>
            </div>
            <div className="auth__container">
              <p className="auth__name">E-mail</p>
              <input
                className="auth__input"
                type="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                placeholder="Заполните E-mail"
                name="email"
                required
                onChange={handleEmailInput}
              ></input>
              <span className={emailErrorClass}>{inputErrorEmail}</span>
            </div>
            <div className="auth__container">
              <p className="auth__name">Пароль</p>
              <input
                className="auth__input"
                type="password"
                placeholder="Укажите пароль"
                name="password"
                minLength={6}
                required
                onChange={handlePasswordInput}
              ></input>
              <span className={passwordErrorClass}>{inputErrorPassword}</span>
            </div>
          </form>
          <div className="auth__buttons">
            <span className={authErrorClass}>{catchBackendError()}</span>
            <button
              className="auth__button"
              form="register"
              type="submit"
              disabled={!isFormValid}
            >
              Зарегистрироваться
            </button>
            <div className="auth__button-wrapper">
              <p className="auth__question">Уже зарегистрированы?</p>
              <Link to="/signin" className="auth__link">Войти</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Register;
