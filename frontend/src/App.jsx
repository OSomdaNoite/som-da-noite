import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'

import albumImage from './assets/mock.jpg'

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import PlayHistory from './pages/PlayHistory/PlayHistory'
import Contact from './pages/Contact/Contact'

function App() {

  const [songTime, setSongTime] = useState('00:00 / 00:00');

  let artistName = "Artist Name"
  let songName = "Song Name"
  let albumName = "Album Name"

  const updateTime = (tempo) => {
    const [targetMinutes, targetSeconds] = tempo.split(":").map(Number);
    let seconds = 0, minutes = 0;

    let updateCronometer = (willZero) => {
        let formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} / ${String(targetMinutes).padStart(2, '0')}:${String(targetSeconds).padStart(2, '0')}`;
        setSongTime(formattedTime);

        if (willZero) {
            seconds = 0, minutes = 0;
            updateCronometer();
        }
    }

    const interval = setInterval(() => {
        updateCronometer();

        if (minutes === targetMinutes && seconds === targetSeconds + 1) {
            clearInterval(interval);
            updateCronometer(true);
        }

        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }, 1000);
};

useEffect(() => {
  updateTime("3:30");
}, []);

  return (
    <Routes>
      <Route path="/" element={<Home songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />} />
      <Route path="/about" element={<About />} />
      <Route path="/history" element={<PlayHistory />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default App
