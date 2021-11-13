import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar">
        <Link to="/">
          <h1>React Blog</h1>
        </Link>

        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/create" className="inverted">
            New Blog
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
