import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import { UserContext } from './UserContext';
import { GoThreeBars } from 'react-icons/go';

function Navbar() {
  const location = useLocation();
  const user = useContext(UserContext);
  const { isAuthenticated, username, profilePicture } = user;

  const [dropdownState, setDropdownState] = useState(false);
  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };

  return (
    <div className="Navbar">
      <nav className="navbar">
        <Link onClick={() => {setDropdownState(false)}} to="/">
          <h1>HET BLOG</h1>
        </Link>

        <div className="links">
          {isAuthenticated && location.pathname !== '/create' && (
            <Link onClick={() => {setDropdownState(false)}} to="/create" className="inverted">
              Create Post
            </Link>
          )}
          <div className="dropdown">
            <>
              {isAuthenticated ? (
                <ProfilePicture onClick={handleDropdownClick} className="author-picture" src={`/${profilePicture}`} />
              ) : (
                <GoThreeBars onClick={handleDropdownClick} />
              )}
            </>
            <div className={dropdownState ? 'dropdown-content' : 'dropdown-content hide'}>
              {!isAuthenticated && <Link onClick={() => {setDropdownState(false)}} to="/login">Login</Link>}
              {!isAuthenticated && <Link onClick={() => {setDropdownState(false)}} to="/register">Register</Link>}
              {isAuthenticated && <p>@{username}</p>}
              {isAuthenticated && <div className="seperator" />}
              {isAuthenticated && <Link onClick={() => {setDropdownState(false)}} to={'/u/' + username}>Profile</Link>}
              {isAuthenticated && <Link onClick={() => {setDropdownState(false)}} to="/settings">Settings</Link>}
              {isAuthenticated && <div className="seperator" />}
              {isAuthenticated && (
                <Link className="color-danger" to="/logout">
                  Log Out
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
