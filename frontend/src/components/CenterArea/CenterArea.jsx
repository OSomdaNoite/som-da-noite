import React, { useRef } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import useAudioPlayer from '../../hooks/useAudioPlayer'; // Adjust path if needed
import mockAudio from '../../assets/mock.mp3';

import './CenterArea.css';

const CenterArea = ({ songTime, albumImage, artistName, songName, albumName }) => {
  const canvasRef = useRef(null);

  // Use the hook in "center" mode
  const { isPlaying, togglePlay, audioRef } = useAudioPlayer(mockAudio, canvasRef, 'center');

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

      <audio ref={audioRef} />

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