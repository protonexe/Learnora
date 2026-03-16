import React from 'react';
import { Clock, Play, Pause, RotateCcw, SkipBack, SkipForward, Volume2, Settings, Maximize, Bookmark, BookmarkCheck } from './Icon';

const VideoPlayer = ({ video, onClose }) => {
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(600);
  const [volume, setVolume] = React.useState(80);
  const [muted, setMuted] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);
  const [showControls, setShowControls] = React.useState(true);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  
  const progress = (currentTime / duration) * 100;
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const skip = (seconds) => {
    setCurrentTime(Math.max(0, Math.min(duration, currentTime + seconds)));
  };
  
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  
  return (
    <div style={{
      position: fullscreen ? 'fixed' : 'relative',
      top: fullscreen ? 0 : 'auto',
      left: fullscreen ? 0 : 'auto',
      right: fullscreen ? 0 : 'auto',
      bottom: fullscreen ? 0 : 'auto',
      background: '#000',
      zIndex: fullscreen ? 9999 : 'auto',
      width: fullscreen ? '100vw' : 700,
      height: fullscreen ? '100vh' : 450,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: playing ? 'none' : 'pointer'
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => playing && setShowControls(false)}
        onClick={() => setPlaying(!playing)}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>
            {playing ? '▶️' : '▶️'}
          </div>
          <div style={{ fontSize: 14, opacity: 0.7 }}>
            {video?.title || 'Video Player'}
          </div>
        </div>
        
        {showControls && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: 16
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); skip(-10); }}
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 24
              }}
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }}
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {playing ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); skip(10); }}
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 24
              }}
            >
              <SkipForward size={24} />
            </button>
          </div>
        )}
      </div>
      
      <div style={{
        padding: 12,
        background: 'rgba(0,0,0,0.8)',
        transition: 'opacity 0.3s',
        opacity: showControls ? 1 : 0
      }}>
        <div style={{
          height: 4,
          background: 'rgba(255,255,255,0.3)',
          borderRadius: 2,
          marginBottom: 12,
          cursor: 'pointer'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--primary)',
            borderRadius: 2,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              right: -6,
              top: -4,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'white'
            }} />
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setPlaying(!playing)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button
              onClick={() => skip(-10)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <SkipBack size={18} />
            </button>
            
            <button
              onClick={() => skip(10)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <SkipForward size={18} />
            </button>
            
            <button
              onClick={() => setCurrentTime(0)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={18} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => setMuted(!muted)}
                style={{
                  padding: 8,
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <Volume2 size={18} />
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : volume}
                onChange={(e) => { setVolume(e.target.value); setMuted(false); }}
                style={{ width: 60 }}
              />
            </div>
            
            <span style={{ color: 'white', fontSize: 13, fontFamily: 'monospace' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: bookmarked ? '#fbbf24' : 'white',
                cursor: 'pointer'
              }}
            >
              {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
            
            <select
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              {speeds.map(s => (
                <option key={s} value={s}>{s}x</option>
              ))}
            </select>
            
            <button
              onClick={() => setFullscreen(!fullscreen)}
              style={{
                padding: 8,
                borderRadius: 6,
                border: 'none',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
