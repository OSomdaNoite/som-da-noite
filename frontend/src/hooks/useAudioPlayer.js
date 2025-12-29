import { useRef, useState, useEffect } from 'react';

const useAudioPlayer = (audioSrc, canvases = []) => {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTime, setSongTime] = useState('00:00 / 00:00');

  const drawNavbarWaveform = (ctx, dataArray, canvas) => {
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const maxWaveHeight = height * 0.4;
    const sliceWidth = width / (dataArray.length - 1);

    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(219, 43, 57, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 100, 100, 0.9)');
    gradient.addColorStop(1, 'rgba(219, 43, 57, 0.8)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = gradient;
    ctx.shadowColor = 'rgba(219, 43, 57, 0.6)';
    ctx.shadowBlur = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128 - 1;
      const x = i * sliceWidth;
      const y = centerY + v * maxWaveHeight;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    ctx.stroke();
  };

  const drawCenterBars = (ctx, dataArray, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const barWidth = 4;
    const maxHeight = canvas.height * 0.4;

    ctx.fillStyle = 'rgba(219, 43, 57, 0.6)';
    ctx.shadowColor = 'rgba(219, 43, 57, 0.5)';
    ctx.shadowBlur = 5;

    dataArray.forEach((value, i) => {
      const h = (value / 255) * maxHeight;
      const x = centerX + i * (barWidth + 2);
      ctx.fillRect(x, centerY - h, barWidth, h * 2);
      ctx.fillRect(centerX - (x - centerX), centerY - h, barWidth, h * 2);
    });
  };

  const setupAudio = () => {
    if (!audioRef.current || audioContextRef.current) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceRef.current = source;

    animate();
  };

  const animate = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;

    canvases.forEach(({ ref, mode }) => {
      const canvas = ref.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      if (mode === 'navbar') analyser.getByteTimeDomainData(dataArray);
      if (mode === 'center') analyser.getByteFrequencyData(dataArray);

      if (mode === 'navbar') drawNavbarWaveform(ctx, dataArray, canvas);
      if (mode === 'center') drawCenterBars(ctx, dataArray, canvas);
    });

    animationIdRef.current = requestAnimationFrame(animate);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (!audioContextRef.current) setupAudio();
    if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const current = audio.currentTime;
      const duration = audio.duration || 0;
      const format = (time) => `${String(Math.floor(time / 60)).padStart(2,'0')}:${String(Math.floor(time % 60)).padStart(2,'0')}`;
      setSongTime(`${format(current)} / ${format(duration)}`);
    }

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
      cancelAnimationFrame(animationIdRef.current);
      analyserRef.current?.disconnect();
      sourceRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [audioSrc]);

  return { audioRef, isPlaying, togglePlay, songTime };
};

export default useAudioPlayer;
