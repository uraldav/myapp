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

import classnames from 'classnames';
import './Header.scss';

Header.propTypes = {};
Header.defaultProps = {};

function Header() {
  return (
    <Navbar dark expand="lg">
      <Link to="/" className={classnames('navbar-brand', 'navbar-brand-small')}>
        hidev.io
      </Link>
      <Collapse isOpen navbar>
        <Nav className="mr-auto">
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
            <Link to="/about" className="nav-link">
              One more
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default compose(pure)(Header);
