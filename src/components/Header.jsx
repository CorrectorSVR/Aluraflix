import React from "react";
import { Link } from "react-router-dom";

import "./Header.css"; // Importa los estilos para el Header

function Header() {
  return (
    <header className="header">
      <a href="#banner">
        <img src="/videoplayhd.svg" className="header__logo" alt="Logo" />
      </a>
      <h1 className="header__title">Aluraflix</h1>
      <nav className="header__nav">
        <Link to="/" className="header__button">
          Home
        </Link>
        <Link to="/new-video" className="header__button">
          Nuevo Video
        </Link>
      </nav>
      
    </header>
  );
}

export default Header;
