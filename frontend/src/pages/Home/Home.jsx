import React from 'react'

// components
import CenterArea from '../../components/CenterArea/CenterArea'

const Home = ({ songTime, albumImage, artistName, songName, albumName }) => {
  
  return (
    <div>
        <CenterArea songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />
    </div>
  )
}

export default Home