function Home() {
  return (
    <div className="page home">
      <div className="home-hero">
        <h1>Welcome to MyMusicApp</h1>
        <p>
          Discover lyrics, request songs, and enjoy the rhythm of music.
        </p>
      </div>

      {/* Music Animation Section */}
      <div className="music-animation">
        <span className="note">🎵</span>
        <span className="note">🎶</span>
        <span className="note">🎼</span>
        <span className="instrument">🎸</span>
        <span className="instrument">🎹</span>
        <span className="instrument">🥁</span>
      </div>
    </div>
  );
}

export default Home;
