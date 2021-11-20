// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <div className="Navbar">
      <nav className="navbar">
        <Link to="/">
          <h1>React Blog</h1>
        </Link>

        <div className="links">
          {!props.isLoggedIn && <Link to="/login">Login</Link>}
          {!props.isLoggedIn && <Link to="/register">Register</Link>}
          {props.isLoggedIn && (
            <Link to="/create" className="inverted">
              New Blog
            </Link>
          )}
          {props.isLoggedIn && (
            <a className="inverted" href="/logout">
              Log Out
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
