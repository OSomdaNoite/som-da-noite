import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaBars, FaTimes } from 'react-icons/fa';
import useAudioPlayer from '../../hooks/useAudioPlayer';  // Path to the useAudioPlayer hook

import { Link } from 'react-router-dom';

import mockAudio from '../../assets/mock.mp3'; // Adjust path as needed

import './Navbar.css';

const Navbar = ({ songTime, albumImage, artistName, songName, albumName }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const iconWrapperRef = useRef(null);
  const canvasRef = useRef(null);  // Canvas for visual representation

  // Use the custom audio hook
  const { isPlaying, togglePlay, audioRef } = useAudioPlayer(mockAudio, canvasRef, 'navbar');

  const showNavbar = () => {
    setIsNavOpen(prev => !prev);

    const iconWrapper = iconWrapperRef.current;
    if (iconWrapper) {
      iconWrapper.classList.remove('clicked');
      void iconWrapper.offsetWidth;
      iconWrapper.classList.add('clicked');

      setTimeout(() => {
        iconWrapper.classList.remove('clicked');
      }, 1000);
    }
  };

  useEffect(() => {
    // Adjust canvas on window resize
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = 60;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <header>
      <h3>Logo</h3>

      <div className="player-area">
        <button onClick={togglePlay} className="play-pause-btn" aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <FaPause size={'1.8rem'} /> : <FaPlay size={'1.8rem'} />}
        </button>

        <img className="album-image" src={albumImage} alt={`Capa do álbum ${albumName}`} />

        <div className="player-info">
          <span className="status">Tocando</span>
          <span>{artistName} - {songName} ({albumName})</span>
          <span id="songTime">{songTime}</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="audio-canvas-navbar" />

      <button className="nav-btn" onClick={showNavbar}>
        <span className="nav-icon-wrapper" ref={iconWrapperRef}>
          {isNavOpen ? <FaTimes className="nav-icon" /> : <FaBars className="nav-icon" />}
        </span>
      </button>

      <nav className={isNavOpen ? 'responsive_nav' : ''}>
        <Link to="/home">Página Inicial</Link>
        <Link to="/history">Programação</Link>
        <Link to="/about">Sobre</Link>
        <Link to="/contact">Contato</Link>
      </nav>

      <audio ref={audioRef} />
    </header>
  );
};

export default Navbar;