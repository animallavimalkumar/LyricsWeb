import { Link } from "react-router-dom";

function HindiLyrics() {
  const hindiSongs = [
    { id: "Ho_teri", title: "हो तेरी स्तुति" }
  ];

  const column1 = hindiSongs.slice(0, 15);
  const column2 = hindiSongs.slice(15);

  return (
    <div className="lyrics-box">
      <h2>Hindi Songs</h2>
      <div className="two-column-layout">
        <div className="column">
          <ul className="song-list">
            {column1.map((song) => (
              <li key={song.id}>
                <Link to={`/lyrics/song/${song.id}`}>
                  {song.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {column2.length > 0 && (
          <div className="column">
            <ul className="song-list">
              {column2.map((song) => (
                <li key={song.id}>
                  <Link to={`/lyrics/song/${song.id}`}>
                    {song.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default HindiLyrics;
