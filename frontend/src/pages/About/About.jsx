import React from 'react'

// components
import Navbar from '../../components/Navbar/Navbar'
import AboutArea from '../../components/AboutArea/AboutArea'

const About = ({ songTime, albumImage, artistName, songName, albumName }) => {
  
  return (
    <div>
        <Navbar songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />
        <AboutArea />
    </div>
  )
}

export default About