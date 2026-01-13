import { useState } from "react";
import { Link } from "react-router-dom";
import { songs } from "../data/songs";
import "../styles/SearchLyrics.css";

function SearchLyrics() {
  const [query, setQuery] = useState("");

  const filteredSongs = Object.entries(songs).filter(([_, song]) =>
    `${song.title} ${song.artist}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="page">
      <div className="search-header">
        <h1>🎵 Search Lyrics</h1>
        <p className="search-subtitle">Find your favorite songs and lyrics</p>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by song name or artist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="clear-btn"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {query === "" ? (
        <div className="empty-state">
          <div className="empty-icon">🎶</div>
          <h2>Start Searching!</h2>
          <p>Type a song name or artist to discover lyrics</p>
          <div className="music-animation">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="results-section">
          <p className="results-count">
            Found {filteredSongs.length} song{filteredSongs.length !== 1 ? "s" : ""}
          </p>
          <ul className="song-list animated-list">
            {filteredSongs.length > 0 ? (
              filteredSongs.map(([id, song], index) => (
                <li key={id} className="song-item" style={{ animationDelay: `${index * 0.05}s` }}>
                  <Link to={`/lyrics/song/${id}`} className="song-link">
                    <span className="song-number">{index + 1}</span>
                    <div className="song-info">
                      <div className="song-title">{song.title}</div>
                      <div className="song-artist">{song.artist}</div>
                    </div>
                    <span className="play-icon">▶</span>
                  </Link>
                </li>
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">😔</div>
                <h3>No songs found</h3>
                <p>Try searching with different keywords</p>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchLyrics;
