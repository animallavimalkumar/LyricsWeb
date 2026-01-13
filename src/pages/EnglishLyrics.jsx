import { Link } from "react-router-dom";

function EnglishLyrics() {
  const englishSongs = [
    { id: "Bless", title: "Bless the Lord oh my soul" }
  ];

  const column1 = englishSongs.slice(0, 15);
  const column2 = englishSongs.slice(15);

  return (
    <div className="lyrics-box">
      <h2>English Songs</h2>
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
      </div>
    </div>
  );
}

export default EnglishLyrics;
