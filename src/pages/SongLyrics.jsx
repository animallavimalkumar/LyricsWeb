import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { songs } from "../data/songs";
import { detectLanguage, translateText, getLanguageName } from "../utils/translationService";
import html2pdf from "html2pdf.js";
import "../styles/SongLyrics.css";

function SongLyrics() {
  const { id } = useParams();
  const song = songs[id];
  const [currentLanguage, setCurrentLanguage] = useState('original');
  const [displayedLyrics, setDisplayedLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [originalLanguage, setOriginalLanguage] = useState('');
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');

  // Load song data and track views
  useEffect(() => {
    if (song) {
      const detected = detectLanguage(song.lyrics);
      setOriginalLanguage(detected);
      setDisplayedLyrics(song.lyrics);
      setCurrentLanguage('original');

      // Load and increment views
      const songData = getSongData(id);
      setViews(songData.views + 1);
      setLikes(songData.likes);
      setLiked(songData.liked);
      setComments(songData.comments);

      // Save updated views
      updateSongData(id, {
        views: songData.views + 1,
        likes: songData.likes,
        liked: songData.liked,
        comments: songData.comments
      });
    }
  }, [song, id]);

  // Get song data from localStorage
  const getSongData = (songId) => {
    const allData = JSON.parse(localStorage.getItem('songStats') || '{}');
    return allData[songId] || {
      views: 0,
      likes: 0,
      liked: false,
      comments: []
    };
  };

  // Update song data in localStorage
  const updateSongData = (songId, data) => {
    const allData = JSON.parse(localStorage.getItem('songStats') || '{}');
    allData[songId] = data;
    localStorage.setItem('songStats', JSON.stringify(allData));
  };

  const handleLanguageChange = async (language) => {
    if (language === 'original') {
      setDisplayedLyrics(song.lyrics);
      setCurrentLanguage('original');
      return;
    }

    setLoading(true);
    try {
      const translated = await translateText(song.lyrics, language);
      setDisplayedLyrics(translated);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Translation error:', error);
      alert('Failed to translate: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    const newLikeState = !liked;
    const newLikeCount = newLikeState ? likes + 1 : likes - 1;
    
    setLiked(newLikeState);
    setLikes(newLikeCount);

    updateSongData(id, {
      views,
      likes: newLikeCount,
      liked: newLikeState,
      comments
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert('Please enter a comment');
      return;
    }

    const comment = {
      id: Date.now(),
      name: commentName || 'Anonymous',
      text: newComment,
      date: new Date().toLocaleString()
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    setNewComment('');
    setCommentName('');

    updateSongData(id, {
      views,
      likes,
      liked,
      comments: updatedComments
    });
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(c => c.id !== commentId);
    setComments(updatedComments);

    updateSongData(id, {
      views,
      likes,
      liked,
      comments: updatedComments
    });
  };

  const handleExportPDF = () => {
    // Sanitize filename - remove only problematic characters for file systems
    const sanitizedTitle = song.title.replace(/[<>:"|?*]/g, '').trim();
    const finalFilename = sanitizedTitle || `Song_${id}`;
    
    const opt = {
      margin: 10,
      filename: `${finalFilename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, allowTaint: true, useCORS: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    // Create a temporary div with all content
    const tempDiv = document.createElement('div');
    tempDiv.style.padding = '20px';
    tempDiv.style.fontFamily = 'Arial';
    
    const titleElement = document.createElement('h1');
    titleElement.textContent = song.title;
    titleElement.style.fontSize = '24px';
    titleElement.style.marginBottom = '10px';
    
    const artistElement = document.createElement('h3');
    artistElement.textContent = `By ${song.artist}`;
    artistElement.style.fontSize = '16px';
    artistElement.style.marginBottom = '20px';
    artistElement.style.color = '#666';
    
    const lyricsElement = document.createElement('pre');
    lyricsElement.textContent = displayedLyrics;
    lyricsElement.style.whiteSpace = 'pre-wrap';
    lyricsElement.style.wordWrap = 'break-word';
    lyricsElement.style.fontSize = '11px';
    lyricsElement.style.lineHeight = '1.5';
    lyricsElement.style.fontFamily = 'Arial';
    
    tempDiv.appendChild(titleElement);
    tempDiv.appendChild(artistElement);
    tempDiv.appendChild(lyricsElement);
    
    document.body.appendChild(tempDiv);
    
    html2pdf().set(opt).from(tempDiv).save().then(() => {
      document.body.removeChild(tempDiv);
    });
  };

  const handleDownloadTxt = () => {
    // Sanitize filename - remove only problematic characters for file systems
    const sanitizedTitle = song.title.replace(/[<>:"|?*]/g, '').trim();
    const finalFilename = sanitizedTitle || `Song_${id}`;
    
    const content = `${song.title}\nBy ${song.artist}\n\n${displayedLyrics}`;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${finalFilename}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!song) {
    return <h2>Song not found</h2>;
  }

  // Dynamically determine available languages based on source language
  const getAvailableLanguages = () => {
    const languages = [
      { code: 'original', label: `Original (${getLanguageName(originalLanguage)})` }
    ];

    // Add other language options based on source
    if (originalLanguage === 'en') {
      languages.push({ code: 'hi', label: 'Hindi' });
      languages.push({ code: 'te', label: 'Telugu' });
    } else if (originalLanguage === 'hi') {
      languages.push({ code: 'en', label: 'English' });
      languages.push({ code: 'te', label: 'Telugu' });
    } else if (originalLanguage === 'te') {
      languages.push({ code: 'en', label: 'English' });
      languages.push({ code: 'hi', label: 'Hindi' });
    }

    return languages;
  };

  const availableLanguages = getAvailableLanguages();

  return (
    <div className="page">
      <h1>{song.title}</h1>
      <h3>{song.artist}</h3>

      {/* Views and Likes Section */}
      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-label">👁️ Views:</span>
          <span className="stat-value">{views}</span>
        </div>
        <div className="stat-item">
          <button 
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            ❤️ Like
          </button>
          <span className="stat-value">{likes}</span>
        </div>
      </div>

      {/* YouTube Link */}
      {song.youtube && (
        <div className="youtube-section">
          <a 
            href={song.youtube} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="youtube-btn"
          >
            ▶ Watch on YouTube
          </a>
        </div>
      )}

      <div className="language-buttons">
        <p className="language-label">View lyrics in:</p>
        <div className="button-group">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-btn ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={loading}
            >
              {lang.label}
            </button>
          ))}
        </div>
        {loading && <p className="loading-text">Translating...</p>}
      </div>

      {/* Export and Download Section */}
      <div className="export-section">
        <button onClick={handleExportPDF} className="export-btn pdf-btn" title="Export as PDF">
          📄 Export as PDF
        </button>
        <button onClick={handleDownloadTxt} className="export-btn txt-btn" title="Download as Text">
          📥 Download as TXT
        </button>
      </div>

      <pre className="lyrics-text">
        {displayedLyrics}
      </pre>

      {/* Share Buttons */}
      <div className="share-section">
        <p className="share-label">Share this song:</p>
        <div className="share-buttons">
          <a 
            href={`https://wa.me/?text=Check out this song: ${encodeURIComponent(song.title)} - ${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn whatsapp"
            title="Share on WhatsApp"
          >
            WhatsApp
          </a>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn facebook"
            title="Share on Facebook"
          >
            Facebook
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out: ${encodeURIComponent(song.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn twitter"
            title="Share on Twitter"
          >
            Twitter
          </a>
          <a 
            href={`https://www.instagram.com/`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn instagram"
            title="Share on Instagram"
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments ({comments.length})</h3>
        
        <div className="add-comment-box">
          <div className="comment-input-group">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="comment-name-input"
            />
            <textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-textarea"
              rows="3"
            ></textarea>
            <button onClick={handleAddComment} className="comment-submit-btn">
              Post Comment
            </button>
          </div>
        </div>

        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <strong className="comment-name">{comment.name}</strong>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
                <button 
                  onClick={() => handleDeleteComment(comment.id)}
                  className="comment-delete-btn"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <Link to="/lyrics" className="back-link">
        ← Back to Lyrics
      </Link>
    </div>
  );
}

export default SongLyrics;
