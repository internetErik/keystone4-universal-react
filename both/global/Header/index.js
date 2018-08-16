import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ className }) => (
<header className={`header posf w100% z3 ${className || ''}`}>
  <div className="header__container grid-container pl10 pr10 h100% posr">
    Header
  </div>
</header>
);

Header.propTypes = {
  className : PropTypes.string,
}

export default Header;
