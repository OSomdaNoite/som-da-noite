import React from 'react'

// components
import CenterArea from '../../components/CenterArea/CenterArea'
import Navbar from '../../components/Navbar/Navbar'

const Profile = ({ songTime, albumImage, artistName, songName, albumName }) => {
  
  return (
    <div>
        <Navbar songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />
        <CenterArea songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />
    </div>
  )
}

export default Profile