import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">MebelVia</Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li><Link to="/catalog">Все товары</Link></li>
          <li><Link to="/feedback">Обратная связь</Link></li>
          <li><Link to="/favorites">Избранное</Link></li>
          <li><Link to="/cart">Корзина</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
