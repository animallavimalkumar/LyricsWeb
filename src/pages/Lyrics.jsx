import { Link, Outlet } from "react-router-dom";

function Lyrics() {
  return (
    <div className="page">
      <h1>Lyrics Collection</h1>

      <div className="lyrics-tabs">
        <Link to="english">English Songs</Link>
        <Link to="telugu">Telugu Songs</Link>
        <Link to="hindi">Hindi Songs</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Lyrics;
