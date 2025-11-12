import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const AudioVisualizer = forwardRef((props, ref) => {
  const svgRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  const smoothedDataArrayRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    togglePlay: () => {
        if (!audioContextRef.current) {
            setupAudioContext();
        }

        const audioContext = audioContextRef.current;
        const audioPlayer = audioPlayerRef.current;

        if (!audioContext || !audioPlayer) return;

        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        if (isPlaying) {
            audioPlayer.pause();
            setIsPlaying(false);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
        } else {
            audioPlayer.play().then(() => {
                setIsPlaying(true);
                draw();
            }).catch(e => {
                console.error("Error playing audio:", e);
                setIsPlaying(false);
            });
        }
    }
  }));


  useEffect(() => {
    // Create Audio element programmatically to avoid issues with React Strict Mode
    const audioPlayer = new Audio('/sv-boarding.mp3');
    audioPlayer.preload = 'none';
    audioPlayer.crossOrigin = 'anonymous';
    audioPlayer.loop = true;
    audioPlayerRef.current = audioPlayer;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioPlayer.addEventListener('ended', handleEnded);

    return () => {
      audioPlayer.removeEventListener('ended', handleEnded);
      audioPlayer.pause();

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const setupAudioContext = () => {
    if (audioContextRef.current) {
      return;
    }
    try {
      const audioPlayer = audioPlayerRef.current;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audioPlayer);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024 * 2;
      analyser.smoothingTimeConstant = 0.8;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const smoothedDataArray = new Uint8Array(bufferLength);
      smoothedDataArray.fill(128);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      dataArrayRef.current = dataArray;
      smoothedDataArrayRef.current = smoothedDataArray;

    } catch (e) {
      console.error("Error setting up Web Audio API:", e);
    }
  };

  const draw = () => {
    if (!analyserRef.current) return;

    const svg = svgRef.current;
    if (!svg) return;
    const svgWidth = svg.clientWidth;
    const svgHeight = svg.clientHeight;
    let pathD = "";

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const smoothedDataArray = smoothedDataArrayRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const smoothingFactor = 0.92;

    analyser.getByteTimeDomainData(dataArray);

    for (let i = 0; i < bufferLength; i++) {
      smoothedDataArray[i] = (smoothedDataArray[i] * smoothingFactor) + (dataArray[i] * (1 - smoothingFactor));
    }

    pathD = `M 0,0`;
    const pointsToDraw = bufferLength;
    const sliceWidth = svgWidth / (pointsToDraw - 1);
    let x = 0;

    for (let i = 0; i < pointsToDraw; i++) {
      const smoothVal = smoothedDataArray[i];
      let y = 0;

      if (smoothVal < 128) {
        const downwardness = (128 - smoothVal) / 128.0;
        y = downwardness * svgHeight * 2.5;
      }

      pathD += ` L ${x.toFixed(2)},${y.toFixed(2)}`;
      x += sliceWidth;
    }
    pathD += ` L ${svgWidth},0`;

    const pathElement = svg.querySelector('path');
    if (pathElement) {
        pathElement.setAttribute('d', pathD);
    }


    animationFrameIdRef.current = requestAnimationFrame(draw);
  };

  return (
    <div className="relative w-full">
       <svg ref={svgRef} className="w-full h-8 bg-transparent">
         <path stroke="url(#gradient)" fill="none" strokeWidth="2"></path>
         <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#f1eedb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
          </linearGradient>
         </defs>
       </svg>
    </div>
  );
});

export default AudioVisualizer;