import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'

import albumImage from './assets/mock.jpg'

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import PlayHistory from './pages/PlayHistory/PlayHistory'
import Contact from './pages/Contact/Contact'
import Profile from './pages/Profile/Profile'

import useAudioPlayer from './hooks/useAudioPlayer';
import mockAudio from './assets/mock.mp3';

import Navbar from './components/Navbar/Navbar';

function App() {

  const navbarCanvasRef = useRef(null)
  const centerCanvasRef = useRef(null)

  const artistName = "Artist Name"
  const songName = "Song Name"
  const albumName = "Album Name"

  const { audioRef, isPlaying, togglePlay, songTime } = useAudioPlayer(mockAudio, [
    { ref: navbarCanvasRef, mode: 'navbar' },
    { ref: centerCanvasRef, mode: 'center' }
  ]);

  return (
    <>
      <Navbar
        songTime={songTime}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        albumImage={albumImage}
        artistName={artistName}
        songName={songName}
        albumName={albumName}
        canvasRef={navbarCanvasRef}
      />

      <Routes>
        <Route path="/" element={
          <Home
            songTime={songTime}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            albumImage={albumImage}
            artistName={artistName}
            songName={songName}
            albumName={albumName}
            centerCanvasRef={centerCanvasRef}
          />
        }/>
        <Route path="/home" element={
          <Home
            songTime={songTime}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            albumImage={albumImage}
            artistName={artistName}
            songName={songName}
            albumName={albumName}
            centerCanvasRef={centerCanvasRef}
          />
        }/>
        <Route path="/profile" element={<Profile songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} isPlaying={isPlaying} togglePlay={togglePlay} />} />
        <Route path="/about" element={<About songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} isPlaying={isPlaying} togglePlay={togglePlay} />} />
        <Route path="/history" element={<PlayHistory songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} isPlaying={isPlaying} togglePlay={togglePlay} />} />
        <Route path="/contact" element={<Contact songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} isPlaying={isPlaying} togglePlay={togglePlay} />} />
      </Routes>

      {/* ÚNICO AUDIO GLOBAL */}
      <audio ref={audioRef} src={mockAudio} />
    </>
  )
}

export default App;
