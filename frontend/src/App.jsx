import { useEffect, useState } from 'react';
import './App.css'

import albumImage from './assets/mock.jpg'

import Navbar from './components/Navbar/Navbar'

// Pages
import Home from './pages/Home/Home'

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
    <>
      <Navbar songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />
      <Home songTime={songTime} albumImage={albumImage} artistName={artistName} songName={songName} albumName={albumName} />
    </>
  )
}

export default App
