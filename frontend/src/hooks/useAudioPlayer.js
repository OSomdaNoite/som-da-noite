import { useRef, useState, useEffect } from 'react';

const useAudioPlayer = (audioSrc, canvasRef, mode = 'navbar') => {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationIdRef = useRef(null);
  const lastDrawTimeRef = useRef(Date.now());
  const [isPlaying, setIsPlaying] = useState(false);

  // Smooth waveform with gradient and glow
  const drawNavbarWaveform = (ctx, dataArray, canvas) => {
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const maxWaveHeight = height * 0.4;
    const sliceWidth = width / (dataArray.length - 1);

    ctx.clearRect(0, 0, width, height);

    // Gradient stroke
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(219, 43, 57, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 100, 100, 0.9)');
    gradient.addColorStop(1, 'rgba(219, 43, 57, 0.8)');

    ctx.lineWidth = 3;
    ctx.strokeStyle = gradient;
    ctx.shadowColor = 'rgba(219, 43, 57, 0.6)';
    ctx.shadowBlur = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();

    for (let i = 0; i < dataArray.length; i++) {
      const v = (dataArray[i] / 128) - 1; // Normalize [-1, 1]
      const y = centerY + v * maxWaveHeight;
      const x = i * sliceWidth;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = (i - 1) * sliceWidth;
        const prevV = (dataArray[i - 1] / 128) - 1;
        const prevY = centerY + prevV * maxWaveHeight;
        const cx = (prevX + x) / 2;
        const cy = (prevY + y) / 2;

        ctx.quadraticCurveTo(prevX, prevY, cx, cy);
      }
    }

    // Draw to last point to finish curve nicely
    const lastX = (dataArray.length - 1) * sliceWidth;
    const lastV = (dataArray[dataArray.length - 1] / 128) - 1;
    const lastY = centerY + lastV * maxWaveHeight;
    ctx.lineTo(lastX, lastY);

    ctx.stroke();
  };

  // Center bars with shadows and smooth heights
  const drawCenterBars = (ctx, dataArray, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const barCount = dataArray.length;
    const barWidth = canvas.width / (barCount * 2);
    const maxBarHeight = canvas.height * 0.4;

    ctx.fillStyle = 'rgba(219, 43, 57, 0.6)';
    ctx.shadowColor = 'rgba(219, 43, 57, 0.5)';
    ctx.shadowBlur = 5;

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.max(2, (dataArray[i] / 255) * maxBarHeight);
      const xOffset = i * (barWidth + 2);

      // Left bars
      ctx.beginPath();
      ctx.moveTo(centerX - xOffset - barWidth, centerY);
      ctx.lineTo(centerX - xOffset - barWidth, centerY - barHeight);
      ctx.lineTo(centerX - xOffset, centerY - barHeight);
      ctx.lineTo(centerX - xOffset, centerY);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX - xOffset - barWidth, centerY);
      ctx.lineTo(centerX - xOffset - barWidth, centerY + barHeight);
      ctx.lineTo(centerX - xOffset, centerY + barHeight);
      ctx.lineTo(centerX - xOffset, centerY);
      ctx.closePath();
      ctx.fill();

      // Right bars
      ctx.beginPath();
      ctx.moveTo(centerX + xOffset, centerY);
      ctx.lineTo(centerX + xOffset, centerY - barHeight);
      ctx.lineTo(centerX + xOffset + barWidth, centerY - barHeight);
      ctx.lineTo(centerX + xOffset + barWidth, centerY);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX + xOffset, centerY);
      ctx.lineTo(centerX + xOffset, centerY + barHeight);
      ctx.lineTo(centerX + xOffset + barWidth, centerY + barHeight);
      ctx.lineTo(centerX + xOffset + barWidth, centerY);
      ctx.closePath();
      ctx.fill();
    }
  };

  const setupAudio = () => {
    if (!audioRef.current || audioContextRef.current) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioRef.current);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = mode === 'navbar' ? 128 : 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      const now = Date.now();
      const elapsed = now - lastDrawTimeRef.current;

      if (elapsed >= 50) {
        lastDrawTimeRef.current = now;

        if (mode === 'navbar') {
          analyser.getByteTimeDomainData(dataArray);
          drawNavbarWaveform(ctx, dataArray, canvas);
        } else if (mode === 'center') {
          analyser.getByteFrequencyData(dataArray);
          drawCenterBars(ctx, dataArray, canvas);
        }
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceRef.current = source;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (!audioContextRef.current) setupAudio();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
    }

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      analyserRef.current?.disconnect();
      sourceRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [audioSrc]);

  return { isPlaying, togglePlay, audioRef };
};

export default useAudioPlayer;
