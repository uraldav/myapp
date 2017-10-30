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

import './Navigation.scss';

Header.propTypes = {};
Header.defaultProps = {};

function Header() {
  return (
    <Navbar dark expand="lg" className="pl-0 pr-0">
      <Link to="/" className="navbar-brand brand-small">
        hidev.io
      </Link>
      <Collapse isOpen navbar>
        <Nav className="mr-auto" navbar>
          <NavItem className="active">
            <Link to="/" className="nav-link">
              Main
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about2" className="nav-link">
              One more
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default compose(pure)(Header);
