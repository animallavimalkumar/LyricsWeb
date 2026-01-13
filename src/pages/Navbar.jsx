import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">MyMusicApp</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/lyrics">Lyrics</Link>
        <Link to="/request">Song Request</Link>
        <Link to="/search">Search</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
