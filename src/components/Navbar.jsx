// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user }) {
  const { isAuthenticated, username } = user;

  return (
    <div className="Navbar">
      <nav className="navbar">
        {/* <Link to="/"> */}
        <a href="/">
          <h1>React Blog</h1>
        </a>

        {/* </Link> */}

        <div className="links">
          <div className="dropdown">
            {isAuthenticated && (
              <Link to="/create" className="inverted">
                New Blog
              </Link>
            )}
            <span id="menu-text">Menu</span>
            <div className="dropdown-content">
              {!isAuthenticated && <Link to="/login">Login</Link>}
              {!isAuthenticated && <Link to="/register">Register</Link>}
              {isAuthenticated && <p>Hello, {username}</p>}
              {isAuthenticated && <a href="/logout">Log Out</a>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
