import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo'

function Register() {
  return (
    <section className="auth">
      <Logo />
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form className="auth__form">
        <label className="auth__container">
          <p className="auth__name">Имя</p>
          <input
            className="auth__input"
            type="text"
            placeholder="Заполните Имя"
            name="userName"
            required
          ></input>
          <span className="auth__input-error"></span>
        </label>
        <label className="auth__container">
          <p className="auth__name">E-mail</p>
          <input
            className="auth__input"
            type="email"
            placeholder="Заполните E-mail"
            name="email"
            autoComplete="email"
            required
          ></input>
          <span className="auth__input-error"></span>
        </label>
        <label className="auth__container">
          <p className="auth__name">Пароль</p>
          <input
            className="auth__input"
            type="password"
            placeholder="Укажите пароль"
            name="password"
            autoComplete="password"
            required
          ></input>
          <span className="auth__input-error"></span>
        </label>
      </form>
      <div className="auth__buttons">
        <button className="auth__button" type="submit">Зарегистрироваться</button>
        <div className="auth__button-wrapper">
          <p className="auth__question">Уже зарегистрированы?</p>
          <Link to="/signin" className="auth__link">Войти</Link>
        </div>
      </div>
    </section>
  )
}

export default Register;
