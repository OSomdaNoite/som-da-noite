import { useRef, useState, useEffect } from 'react';

const useAudioPlayer = (audioSrc, canvases = []) => {

  /* =======================
     CONFIGURAÇÕES VISUAIS
  ======================= */
  const NAVBAR_SENSITIVITY = 1; // waveform horizontal
  const CENTER_BAR_SENSITIVITY = .8; // barras centrais
  const SMOOTHING = 0.85;

  const getCSSVariable = (name) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();

  const secondaryColor = getCSSVariable('--secondaryColor');

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationIdRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [songTime, setSongTime] = useState('00:00 / 00:00');

  /* =======================
     DESENHOS
  ======================= */
  const drawNavbarWaveform = (ctx, dataArray, canvas) => {
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const maxWaveHeight = height * 0.4;
    const sliceWidth = width / (dataArray.length - 1);

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 3;
    ctx.shadowColor = secondaryColor;
    ctx.shadowBlur = 8;
    ctx.lineCap = 'round';

    ctx.beginPath();

    for (let i = 0; i < dataArray.length; i++) {
      const v =
        (dataArray[i] / 128 - 1) * NAVBAR_SENSITIVITY;

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

    ctx.fillStyle = secondaryColor;
    ctx.shadowColor = secondaryColor;
    ctx.shadowBlur = 5;

    dataArray.forEach((value, i) => {
      const h =
        (value / 255) * maxHeight * CENTER_BAR_SENSITIVITY;

      const x = centerX + i * (barWidth + 2);

      ctx.fillRect(x, centerY - h, barWidth, h * 2);
      ctx.fillRect(centerX - (x - centerX), centerY - h, barWidth, h * 2);
    });
  };

  /* =======================
     AUDIO SETUP
  ======================= */
  const setupAudio = () => {
    if (!audioRef.current || audioContextRef.current) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);

    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = SMOOTHING;

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceRef.current = source;

    animate();
  };

  /* =======================
     ANIMAÇÃO
  ======================= */
  const animate = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;

    canvases.forEach(({ ref, mode }) => {
      const canvas = ref.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      if (mode === 'navbar') {
        analyser.getByteTimeDomainData(dataArray);
        drawNavbarWaveform(ctx, dataArray, canvas);
      }

      if (mode === 'center') {
        analyser.getByteFrequencyData(dataArray);
        drawCenterBars(ctx, dataArray, canvas);
      }
    });

    animationIdRef.current = requestAnimationFrame(animate);
  };

  /* =======================
     CONTROLES
  ======================= */
  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) setupAudio();
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  /* =======================
     TEMPO DA MÚSICA
  ======================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const format = (time) =>
      `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

    const updateTime = () => {
      setSongTime(
        `${format(audio.currentTime)} / ${format(audio.duration || 0)}`
      );
    };

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

  return {
    audioRef,
    isPlaying,
    togglePlay,
    songTime
  };
};

export default useAudioPlayer;
