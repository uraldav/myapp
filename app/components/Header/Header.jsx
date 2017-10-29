import React from 'react';
import { compose, pure } from 'recompose';
import { Link, NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

Header.propTypes = {};
Header.defaultProps = {};

function Header() {
  return (
    <Navbar light expand="md">
      <Link to="/" className="navbar-brand">
        hidev.io
      </Link>
      <Collapse isOpen navbar>
        <Nav className="mr-auto" tag="div">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
          <NavLink
            exact
            to="/about"
            className="nav-link"
            activeClassName="active"
          >
            About
          </NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default compose(pure)(Header);
