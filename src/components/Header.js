import headerLogo from '../images/Vector.svg'
import React from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'


function Header(props) {
  const location = useLocation()
  const navigate = useNavigate()

  function signOut(){
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }

  return ( 
      <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип Mesto Russia" />
        <ul className='header__nav'>
            {location.pathname === "/sign-up" && <li><Link className="header__link" to="/sign-in">Войти</Link></li>}
            {location.pathname === "/sign-in" && <li><Link className="header__link" to="/sign-up">Регистрация</Link></li>}
            {location.pathname === "/mesto" && <li>
                <div className='header__container'>
                  <p className='header__email'>{props.userData.email}</p>
                  <button className="header__link" to="/mesto" onClick={signOut}>Выйти</button>
                </div>
              </li>}
        </ul>
      </header> 
  )
}
  
export default Header;