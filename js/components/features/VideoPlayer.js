const VideoPlayer = ({ src, poster, onEnded, onTimeUpdate }) => {
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [muted, setMuted] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const [fullscreen, setFullscreen] = React.useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate?.(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
      setMuted(vol === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen();
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{ position: 'relative', background: '#000', borderRadius: '12px', overflow: 'hidden' }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !playing && setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onEnded={onEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        style={{ width: '100%', display: 'block' }}
      />

      {/* Play Button Overlay */}
      {!playing && (
        <div
          onClick={togglePlay}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            ▶
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        padding: '40px 16px 16px',
        opacity: showControls ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}>
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          style={{
            width: '100%',
            height: '4px',
            marginBottom: '12px',
            accentColor: 'var(--primary-500)',
            cursor: 'pointer'
          }}
        />

        {/* Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={togglePlay} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
            {playing ? '⏸' : '▶️'}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button onClick={toggleMute} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
              {muted ? '🔇' : '🔊'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{ width: '60px', accentColor: '#fff', cursor: 'pointer' }}
            />
          </div>

          <span style={{ fontSize: '12px', color: '#fff', marginLeft: 'auto' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <button onClick={toggleFullscreen} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
            {fullscreen ? '⛶' : '⛶'}
          </button>
        </div>
      </div>
    </div>
  );
};

window.VideoPlayer = VideoPlayer;
