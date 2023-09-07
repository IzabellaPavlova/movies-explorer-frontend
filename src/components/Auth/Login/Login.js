import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo'

function Login() {
  return (
    <div className="page">
      <main>
        <section className="auth">
          <Logo />
          <h1 className="auth__title">Рады видеть!</h1>
          <form className="auth__form">
            <div className="auth__container">
              <p className="auth__name">Имя</p>
              <input
                className="auth__input"
                type="text"
                placeholder="Заполните Имя"
                name="userName"
                required
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
                required
              ></input>
              <span className="auth__input-error"></span>
            </div>
          </form>
          <div className="auth__buttons">
            <button className="auth__button" type="submit">Войти</button>
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
