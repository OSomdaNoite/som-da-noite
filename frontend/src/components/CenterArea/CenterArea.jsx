import React, { useRef } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

import './CenterArea.css';

const CenterArea = ({ songTime, albumImage, artistName, songName, albumName, isPlaying, togglePlay, canvasRef }) => {

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