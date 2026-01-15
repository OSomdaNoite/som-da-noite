import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function PublicLayout({
  songTime,
  isPlaying,
  togglePlay,
  albumImage,
  artistName,
  songName,
  albumName,
  canvasRef
}) {
  return (
    <>
      <Navbar
        songTime={songTime}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        albumImage={albumImage}
        artistName={artistName}
        songName={songName}
        albumName={albumName}
        canvasRef={canvasRef}
      />

      <Outlet />
    </>
  )
}

export default PublicLayout
