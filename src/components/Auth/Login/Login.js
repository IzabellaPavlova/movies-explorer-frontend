import { Link } from 'react-router-dom';
import { useState } from "react";
import Logo from '../../Logo/Logo';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
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
                type="text"
                placeholder="Введите E-mail"
                name="email"
                required
                onChange={handleEmailInput}
              ></input>
              <span className="auth__input-error"></span>
            </div>
            <div className="auth__container">
              <p className="auth__name">Пароль</p>
              <input
                className="auth__input"
                type="password"
                placeholder="Введите пароль"
                name="password"
                required
                onChange={handlePasswordInput}
              ></input>
              <span className="auth__input-error"></span>
            </div>
          </form>
          <div className="auth__buttons">
            <button className="auth__button" form="login" type="submit">Войти</button>
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
