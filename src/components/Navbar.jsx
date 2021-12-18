// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';

function Navbar({ user }) {
  const { isAuthenticated, username, profilePicture } = user;

  return (
    <div className="Navbar">
      <nav className="navbar">
        {/* <Link to="/"> */}
        <a href="/">
          <h1>HET BLOG</h1>
        </a>
        {/* </Link> */}

        <div className="links">
          {isAuthenticated && (
            <Link to="/create" className="inverted">
              Create Post
            </Link>
          )}
          <div className="dropdown">
            <>{isAuthenticated ? <ProfilePicture className="author-picture" src={profilePicture} /> : '☰'}</>
            <div className="dropdown-content">
              {!isAuthenticated && <Link to="/login">Login</Link>}
              {!isAuthenticated && <Link to="/register">Register</Link>}
              {isAuthenticated && <p>@{username}</p>}
              {isAuthenticated && <div className="seperator" />}
              {isAuthenticated && <Link to={'/u/' + username}>Profile</Link>}
              {isAuthenticated && <Link to="/settings">Settings</Link>}
              {isAuthenticated && <div className="seperator" />}
              {isAuthenticated && (
                <a className="color-danger" href="/logout">
                  Log Out
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
