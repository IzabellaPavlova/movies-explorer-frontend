import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const MAIN_PAGE_LINK = 'http://localhost:3001'

function Header({ loggedIn }) {
  return (
    <header className="header">
      <a href={MAIN_PAGE_LINK} className="header__logo"><img alt="Логотип Место"
        src={logo} /></a>
      <nav className="header__auth">
        <Link to="/signup" className="header__register" type="button">Регистрация</Link>
        <Link to="/signin" className="header__login" type="button">Войти</Link>
      </nav>
    </header>
  );
}

export default Header;
