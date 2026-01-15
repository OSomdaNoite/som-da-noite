import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import PlayHistory from './pages/PlayHistory/PlayHistory'
import Contact from './pages/Contact/Contact'
import Profile from './pages/Profile/Profile'
import Authentication from './pages/Authentication/Authentication'

import Admin from './pages/Admin/Admin'

import useAudioPlayer from './hooks/useAudioPlayer'
import mockAudio from './assets/Minuto UFC 243 - 09_01_2026.mp3'
import albumImage from './assets/marca_ufc_tv.jpg'
import CreateTrack from './pages/CreateTrack/CreateTrack'
import TrackList from './pages/TrackList/TrackList'
import UserList from './pages/UserList/UserList'
import VoiceOver from './pages/VoiceOver/VoiceOver'

function App() {
  const navbarCanvasRef = useRef(null)
  const centerCanvasRef = useRef(null)

  const artistName = "Universidade Federal do Ceará"
  const songName = "Minuto UFC 243 - 09/01/2026"
  const albumName = "Minuto UFC"

  const { audioRef, isPlaying, togglePlay, songTime } =
    useAudioPlayer(mockAudio, [
      { ref: navbarCanvasRef, mode: 'navbar' },
      { ref: centerCanvasRef, mode: 'center' }
    ])

  return (
    <>
      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route
          element={
            <PublicLayout
              songTime={songTime}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              albumImage={albumImage}
              artistName={artistName}
              songName={songName}
              albumName={albumName}
              canvasRef={navbarCanvasRef}
            />
          }
        >
          <Route path="/" element={
            <Home
              songTime={songTime}
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              albumImage={albumImage}
              artistName={artistName}
              songName={songName}
              albumName={albumName}
              centerCanvasRef={centerCanvasRef}
            />
          }/>

          <Route path="/home" element={<Home {...{ songTime, isPlaying, togglePlay, albumImage, artistName, songName, albumName, centerCanvasRef }} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<PlayHistory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/acessar" element={<Authentication />} />
          <Route path="*" element={<Home {...{ songTime, isPlaying, togglePlay, albumImage, artistName, songName, albumName, centerCanvasRef }} />} />
        </Route>

        {/* ROTAS ADMINISTRATIVAS */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/cadastrar-faixa" element={<CreateTrack />} />
          <Route path="/admin/listar-faixas" element={<TrackList />} />
          <Route path="/admin/listar-usuarios" element={<UserList />} />
          <Route path="/admin/locucionar" element={<VoiceOver />} />
        </Route>

      </Routes>

      {/* ÁUDIO GLOBAL */}
      <audio ref={audioRef} src={mockAudio} />
    </>
  )
}

export default App
