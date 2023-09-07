import { Link, useLocation } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';

function Navigation() {
  const { pathname } = useLocation();
  return (
      <nav className="nav">
        <div className='nav__container'>
          <Link
            to="/movies"
            className={`nav__link ${pathname === '/movies' ? 'nav__link_active' : ''}`}>
              Фильмы
          </Link>
          <Link
            to="/saved-movies"
            className={`nav__link ${pathname === '/saved-movies' ? 'nav__link_active' : ''}`}>
              Сохраненные фильмы
          </Link>
        </div>
        <Link to="/profile" className="nav__account">Aккаунт</Link>
        <NavMenu/>
      </nav>
  )
}

export default Navigation;
