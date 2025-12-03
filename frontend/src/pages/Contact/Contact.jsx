import React from 'react'

// components
import Navbar from '../../components/Navbar/Navbar'
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel'

const Contact = ({ songTime, albumImage, artistName, songName, albumName }) => {
  const images = [albumImage, albumImage, albumImage, albumImage, albumImage, albumImage,albumImage, albumImage];

  return (
    <div>
        <Navbar songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />
        <div className="about-bg" style={{ backgroundColor: 'var(--mainColorLight)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="about-text" style={{ textAlign: 'center', maxWidth: '80vw' }}>
            <h1 style={{ color: 'var(--textColor)', fontSize: '2.5rem', marginBottom: '2rem' }}>Contact Us</h1>
            <p style={{ color: 'var(--textColor)', fontSize: '1.6rem', marginBottom: '2rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <ImageCarousel images={images} title="Us" />
          </div>
        </div>
    </div>
  )
}

export default Contact
