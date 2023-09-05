import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Logo() {
  return (
      <Link className="logo" to="/">
        <img src={logo} alt="Логотип проекта"/>
      </Link>
  )
}

export default Logo;
