import React, { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import '../../assets/mock.mp3'; // Garante que o bundler reconheça o áudio

import './CenterArea.css';

const CenterArea = ({ songTime, albumImage, artistName, songName, albumName }) => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const analyserRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setupAudio = () => {
    if (!audioRef.current || audioContextRef.current) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      animationIdRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const barCount = bufferLength;
      const barWidth = canvas.width / barCount;
    
      for (let i = 0; i < barCount; i++) {
        const scale = 0.5; // ajuste entre 0.1 e 1.0 conforme a intensidade desejada
        const barHeight = dataArray[i] * scale;
        const xOffset = i * (barWidth + 1);
    
        ctx.fillStyle = 'rgba(219, 43, 57, .3)';
    
        // 🔼 Cima
        ctx.fillRect(centerX + xOffset, centerY - barHeight, barWidth, barHeight);
        // 🔽 Baixo
        ctx.fillRect(centerX + xOffset, centerY, barWidth, barHeight);
    
        // 🔼 Cima (espelho esquerda)
        ctx.fillRect(centerX - xOffset - barWidth, centerY - barHeight, barWidth, barHeight);
        // 🔽 Baixo (espelho esquerda)
        ctx.fillRect(centerX - xOffset - barWidth, centerY, barWidth, barHeight);
      }
    };
    
    draw();

    audioContextRef.current = audioContext;
    sourceRef.current = source;
    analyserRef.current = analyser;
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

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      analyserRef.current?.disconnect();
      sourceRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className='center-area'>
      <style>
        {`
          .center-area::after {
            background-image: url('${albumImage}');
          }
        `}
      </style>

      <canvas
        ref={canvasRef}
        className='audio-canvas'
        width={800}
        height={300}
      />

      <audio ref={audioRef} src='/src/assets/mock.mp3' />

      <div className='background-overlay'></div>

      <div className='pause-hover' onClick={togglePlay}>
        <div className='hovered'>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <img
          className='album-cover'
          src={albumImage}
          alt={`Capa do álbum ${albumName}`}
        />
      </div>

      <div className='song-info'>
        <h4>{songName}</h4>
        <p>{artistName} ({albumName})</p>
        <p>{songTime}</p>
      </div>
    </div>
  );
};

export default CenterArea;
