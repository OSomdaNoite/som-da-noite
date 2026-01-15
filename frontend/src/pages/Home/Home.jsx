import CenterArea from '../../components/CenterArea/CenterArea';

const Home = ({ songTime, isPlaying, togglePlay, albumImage, songName, artistName, albumName, centerCanvasRef }) => {
  return (
    <CenterArea
      songTime={songTime}
      albumImage={albumImage}
      artistName={artistName}
      songName={songName}
      albumName={albumName}
      isPlaying={isPlaying}
      togglePlay={togglePlay}
      canvasRef={centerCanvasRef}
    />
  );
};

export default Home;
