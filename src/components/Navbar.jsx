function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar">
        <h1>React Blog</h1>
        <div className="links">
          <a href="/">Home</a>
          <a href="/create" className="inverted">
            New Blog
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
