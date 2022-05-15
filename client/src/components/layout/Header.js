import React from 'react';
import logo from '../design/VarnoDomovLogo.svg';
import '../design/App.css';

function Header(props) {
  return (
    <div className="bcg">
      <h2>
        <span className="logo-bold">VARNO</span> DOMOV
      </h2>
      <img className="logo" src={logo} alt="Logo" />
    </div>
  );
}

export default Header;
