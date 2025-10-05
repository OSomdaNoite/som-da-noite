import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaBars, FaTimes } from 'react-icons/fa';

import '../../assets/mock.mp3';
import './Navbar.css';

const Navbar = ({ songTime, albumImage, artistName, songName, albumName }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const iconWrapperRef = useRef(null);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const setupAudio = () => {
    if (!audioRef.current || audioContextRef.current) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 2048; // Para onda suave
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const maxWaveHeight = height * 0.4; // altura máxima da linha (40% da altura da canvas)

    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(219, 43, 57, 0.8)';
      ctx.beginPath();

      const sliceWidth = width / bufferLength;

      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        // dataArray[i] está entre 0 e 255, vamos normalizar pra -1 a 1
        const v = (dataArray[i] / 128) - 1;
        const y = centerY + v * maxWaveHeight;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, centerY); // fecha no centro para ficar bonito
      ctx.stroke();
    };

    draw();

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceRef.current = source;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (!audioContextRef.current) setupAudio();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Atualiza o tamanho do canvas para largura da tela sempre que a janela mudar de tamanho
  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = 60; // Altura fixa para a linha
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationIdRef.current);
      analyserRef.current?.disconnect();
      sourceRef.current?.disconnect();
      audioContextRef.current?.close();
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

      <canvas
        ref={canvasRef}
        className="audio-canvas-navbar"
      />

      <button className="nav-btn" onClick={showNavbar}>
        <span className="nav-icon-wrapper" ref={iconWrapperRef}>
          {isNavOpen ? <FaTimes className="nav-icon" /> : <FaBars className="nav-icon" />}
        </span>
      </button>

      <nav className={isNavOpen ? 'responsive_nav' : ''}>
        <a href="/#">Página Inicial</a>
        <a href="/#">Programação</a>
        <a href="/#">Sobre</a>
        <a href="/#">Contato</a>
      </nav>

      <audio ref={audioRef} src="/src/assets/mock.mp3" />
    </header>
  );
};

export default Navbar;
