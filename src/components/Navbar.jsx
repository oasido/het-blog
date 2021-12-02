// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user }) {
  const { isAuthenticated, username, profilePicture } = user;

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
            <span id="menu-text">Menu</span>
            <div className="dropdown-content">
              {!isAuthenticated && <Link to="/login">Login</Link>}
              {!isAuthenticated && <Link to="/register">Register</Link>}
              {isAuthenticated && <p>Hello, {username}</p>}
              {isAuthenticated && <a href="/my-posts">My Posts</a>}
              {isAuthenticated && (
                <a className="color-danger" href="/logout">
                  Log Out
                </a>
              )}
            </div>
          </div>
          {isAuthenticated && (
            <Link to="/create" className="inverted">
              Create Post
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
