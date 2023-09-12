import { Link } from 'react-router-dom';
import { useState } from "react";
import Logo from '../../Logo/Logo';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputErrorEmail, setInputErrorEmail] = useState("");
  const [inputErrorPassword, setInputErrorPassword] = useState("");
  const isFormValid = (inputErrorEmail === '' && inputErrorPassword === '' && email && password);
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

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
    setInputErrorEmail(evt.target.validationMessage);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
    setInputErrorPassword(evt.target.validationMessage);
  }

  function catchBackendError() {
    if (props.errorMessage.includes("401")) {
      return "Неправильный логин или пароль"
    }
    if (props.errorMessage.includes("400")) {
      return "Введены некорректные данные";
    }
    return "";
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <div className="page">
      <main>
        <section className="auth">
          <Logo />
          <h1 className="auth__title">Рады видеть!</h1>
          <form id="login" className="auth__form" onSubmit={handleSubmit}>
            <div className="auth__container">
              <p className="auth__name">E-mail</p>
              <input
                className="auth__input"
                type="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                placeholder="Введите E-mail"
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
                placeholder="Введите пароль"
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
            <button className="auth__button" form="login" type="submit" disabled={!isFormValid}>Войти</button>
            <div className="auth__button-wrapper">
              <p className="auth__question">Ещё не зарегистрированы?</p>
              <Link to="/signup" className="auth__link">Регистрация</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Login;
