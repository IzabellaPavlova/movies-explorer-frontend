import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function NavMenu() {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  function handleOpenPopup() {
    setIsOpen(true);
  }

  function handleClosePopup() {
    setIsOpen(false);
  }

  return (
    <nav className="nav-menu">
      <button
        className='nav-menu__logo'
        type="button"
        onClick={handleOpenPopup}
      >
      </button>
      <section className={`nav-menu__popup ${isOpen ? 'nav-menu__popup_open' : ''}`}>
        <div className='nav-menu__page'>
        <button
          className='nav-menu__close'
          type="button"
          onClick={handleClosePopup}
        >
        </button>
          <div className='nav-menu__container'>
            <Link
              className={`nav-menu__link ${pathname === '/' ? 'nav-menu__link_active' : ''}`}
              to="/"
            >
              Главная
            </Link>
            <Link
              className={`nav-menu__link ${pathname === '/movies' ? 'nav-menu__link_active' : ''}`}
              to="/movies"
              >
                Фильмы
            </Link>
            <Link
              className={`nav-menu__link ${pathname === '/saved-movies' ? 'nav-menu__link_active' : ''}`}
              to="/saved-movies"
            >
              Сохраненные фильмы
            </Link>
          </div>
          <Link to="/profile" className='nav-menu__account'>
            Aккаунт
          </Link>
        </div>
      </section>
    </nav>
  )
}

export default NavMenu;
