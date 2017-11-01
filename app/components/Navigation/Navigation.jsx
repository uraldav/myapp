import React from 'react';
import { compose, pure } from 'recompose';
import { Link } from 'react-router-dom';

Header.propTypes = {};
Header.defaultProps = {};

function Header() {
  return (
    <table>
      <tr>
        <td>
          <Link to="/">Main </Link>
        </td>
        <td>
          <Link to="/about">About </Link>
        </td>
        <td>
          <Link to="/404">404 </Link>
        </td>
      </tr>
    </table>
  );
}

export default compose(pure)(Header);
