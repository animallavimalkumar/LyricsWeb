import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import SearchLyrics from "./pages/SearchLyrics";
import Home from "./pages/Home";
import Lyrics from "./pages/Lyrics";
import EnglishLyrics from "./pages/EnglishLyrics";
import TeluguLyrics from "./pages/TeluguLyrics";
import HindiLyrics from "./pages/HindiLyrics";
import SongLyrics from "./pages/SongLyrics";
import SongRequest from "./pages/SongRequest";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/lyrics" element={<Lyrics />}>
          <Route path="english" element={<EnglishLyrics />} />
          <Route path="telugu" element={<TeluguLyrics />} />
          <Route path="hindi" element={<HindiLyrics />} />
          <Route path="song/:id" element={<SongLyrics />} />
        </Route>

        <Route path="/request" element={<SongRequest />} />
        <Route path="/search" element={<SearchLyrics />} />
        <Route path="/contact" element={<Contact />} />
        

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
