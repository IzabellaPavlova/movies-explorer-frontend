import { Link } from 'react-router-dom';
import { useState } from "react";
import Logo from '../../Logo/Logo'

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(props.disabledInput);

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
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
              <span className="auth__input-error"></span>
            </div>
            <div className="auth__container">
              <p className="auth__name">E-mail</p>
              <input
                className="auth__input"
                type="email"
                placeholder="Заполните E-mail"
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
                placeholder="Укажите пароль"
                name="password"
                minLength={6}
                required
                onChange={handlePasswordInput}
              ></input>
              <span className="auth__input-error"></span>
            </div>
          </form>
          <div className="auth__buttons">
            <button className="auth__button" form="register" type="submit">Зарегистрироваться</button>
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
