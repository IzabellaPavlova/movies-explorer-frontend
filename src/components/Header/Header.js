import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Nav/Nav';

function Header(props) {
  return (
    <header className="header">
      <Logo />
      {(props.isLoggedIn ?
          <Navigation />
        :
        <nav className="header__auth">
          <Link to="/signup" className="header__register" type="button">Регистрация</Link>
          <Link to="/signin" className="header__login" type="button">Войти</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
