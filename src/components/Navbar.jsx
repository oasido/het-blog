import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar">
        <h1>React Blog</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/create" className="inverted">
            New Blog
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
