import React from 'react';
import './CenterArea.css';

import { FaPause } from 'react-icons/fa';

const CenterArea = ({ songTime, albumImage, artistName, songName, albumName }) => {
  return (
    <div className='center-area'>
      <style>
        {`
          .center-area::after {
            background-image: url('${albumImage}');
          }
        `}
      </style>

      <div className='background-overlay'></div>
      <div className='pause-hover'>
        <div className='hovered'>
          <FaPause />
        </div>
        <img className='album-cover' src={albumImage} alt={`Capa do álbum ${albumName}`} />
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
