import React from 'react'

// components
import CenterArea from '../../components/CenterArea/CenterArea'
import Navbar from '../../components/Navbar/Navbar'

const PlayHistory = ({ songTime, albumImage, artistName, songName, albumName }) => {
  
  return (
    <div>
        <CenterArea songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />
    </div>
  )
}

export default PlayHistory