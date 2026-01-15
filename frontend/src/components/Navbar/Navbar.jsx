import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import radioPhoto from '../../assets/marca_ufc.png';
import './Navbar.css';

const Navbar = ({ songTime, albumImage, artistName, songName, albumName, isPlaying, togglePlay, canvasRef }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const iconWrapperRef = useRef(null);

  const location = useLocation();

  const showNavbar = () => {
    setIsNavOpen(prev => !prev);

    const iconWrapper = iconWrapperRef.current;
    if (iconWrapper) {
      iconWrapper.classList.remove('clicked');
      void iconWrapper.offsetWidth;
      iconWrapper.classList.add('clicked');
      setTimeout(() => iconWrapper.classList.remove('clicked'), 1000);
    }
  };

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef?.current) return;
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      const headerHeight = document.querySelector('header')?.offsetHeight || 60;
      canvas.height = headerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [canvasRef]);

  return (
    <header>
      <Link to="/home">
        <img src={radioPhoto} className='radio-photo' />
      </Link>

      <div className="player-area">
        <button onClick={togglePlay} className="play-pause-btn" aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <FaPause size={'1.8rem'} /> : <FaPlay size={'1.8rem'} />}
        </button>

        <img className="album-image" src={albumImage} alt={`Capa do álbum ${albumName}`} />

        <div className="player-info">
          <span className="status">Tocando</span>
          <span>{songName} - {artistName} ({albumName})</span>
          <span>{songTime}</span>
        </div>
      </div>

      <canvas ref={canvasRef} className='audio-canvas-navbar' />

      <button className="nav-btn" onClick={showNavbar}>
        <span className="nav-icon-wrapper" ref={iconWrapperRef}>
          {isNavOpen ? <FaTimes className="nav-icon" /> : <FaBars className="nav-icon" />}
        </span>
      </button>

      <nav className={isNavOpen ? 'responsive_nav' : ''}>
        <div className='user-data'>
          <Link to={"/profile"}>
            <img src='https://freesvg.org/img/abstract-user-flat-3.png' alt='Ícone de Usuário' />
            <span>Usuário</span>
          </Link>
        </div>
        {location.pathname !== '/home' && (
          <Link to="/home">Página Inicial</Link>
        )}
        <Link to="/history">Histórico de Reprodução</Link>
        <Link to="/about">Sobre</Link>
        <Link to="/contact">Contato</Link>
      </nav>
    </header>
  );
};

export default Navbar;
