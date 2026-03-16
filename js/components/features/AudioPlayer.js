import React from 'react';
import { Clock, Play, Pause, RotateCcw, FastForward, Rewind, List, Volume2, VolumeX, SkipBack, SkipForward, Maximize, Settings, PictureInPicture, Subtitles } from './Icon';

const AudioPlayer = ({ audio, onClose }) => {
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(300);
  const [volume, setVolume] = React.useState(80);
  const [muted, setMuted] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);
  const [playlist, setPlaylist] = React.useState([
    { id: 1, title: 'Introduction to Physics', duration: '5:30', artist: 'Learnora' },
    { id: 2, title: 'Chapter 1: Motion', duration: '8:15', artist: 'Learnora' },
    { id: 3, title: 'Chapter 2: Forces', duration: '7:45', artist: 'Learnora' },
    { id: 4, title: 'Chapter 3: Energy', duration: '6:20', artist: 'Learnora' },
  ]);
  const [currentTrack, setCurrentTrack] = React.useState(0);
  const [shuffle, setShuffle] = React.useState(false);
  const [repeat, setRepeat] = React.useState('none');
  
  const progress = (currentTime / duration) * 100;
  const track = playlist[currentTrack];
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const skip = (seconds) => {
    setCurrentTime(Math.max(0, Math.min(duration, currentTime + seconds)));
  };
  
  const nextTrack = () => {
    if (shuffle) {
      setCurrentTrack(Math.floor(Math.random() * playlist.length));
    } else {
      setCurrentTrack((currentTrack + 1) % playlist.length);
    }
    setCurrentTime(0);
  };
  
  const prevTrack = () => {
    if (currentTime > 3) {
      setCurrentTime(0);
    } else {
      setCurrentTrack((currentTrack - 1 + playlist.length) % playlist.length);
    }
  };
  
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: 20,
      padding: 24,
      width: 380,
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          🎵 Audio Player
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShuffle(!shuffle)}
            style={{
              padding: 8,
              borderRadius: 6,
              border: 'none',
              background: shuffle ? '#8b5cf6' : 'transparent',
              color: 'white',
              cursor: 'pointer',
              fontSize: 12
            }}
          >
            🔀
          </button>
          <button
            onClick={() => setRepeat(repeat === 'none' ? 'all' : repeat === 'all' ? 'one' : 'none')}
            style={{
              padding: 8,
              borderRadius: 6,
              border: 'none',
              background: repeat !== 'none' ? '#8b5cf6' : 'transparent',
              color: 'white',
              cursor: 'pointer',
              fontSize: 12
            }}
          >
            {repeat === 'one' ? '🔂' : '🔁'}
          </button>
        </div>
      </div>
      
      <div style={{
        width: '100%',
        aspectRatio: '1',
        maxWidth: 200,
        margin: '0 auto 24px',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
        animation: playing ? 'pulse 2s infinite' : 'none'
      }}>
        <div style={{ fontSize: 64 }}>
          🎧
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
          {track?.title || 'No Track'}
        </div>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          {track?.artist || 'Unknown Artist'}
        </div>
      </div>
      
      <div style={{
        marginBottom: 20
      }}>
        <div style={{
          height: 4,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 2,
          marginBottom: 8,
          cursor: 'pointer'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#8b5cf6',
            borderRadius: 2
          }} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          opacity: 0.7
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20
      }}>
        <button
          onClick={prevTrack}
          style={{
            padding: 12,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <SkipBack size={24} />
        </button>
        
        <button
          onClick={() => skip(-10)}
          style={{
            padding: 10,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <Rewind size={20} />
        </button>
        
        <button
          onClick={() => setPlaying(!playing)}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            border: 'none',
            background: '#8b5cf6',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(139, 92, 246, 0.4)'
          }}
        >
          {playing ? <Pause size={28} /> : <Play size={28} />}
        </button>
        
        <button
          onClick={() => skip(10)}
          style={{
            padding: 10,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <FastForward size={20} />
        </button>
        
        <button
          onClick={nextTrack}
          style={{
            padding: 12,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <SkipForward size={24} />
        </button>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setMuted(!muted)}
            style={{
              padding: 6,
              borderRadius: 4,
              border: 'none',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => { setVolume(e.target.value); setMuted(false); }}
            style={{ width: 80 }}
          />
        </div>
        
        <select
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          style={{
            padding: '4px 8px',
            borderRadius: 4,
            border: 'none',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 12
          }}
        >
          {speeds.map(s => (
            <option key={s} value={s} style={{ background: '#1e293b' }}>{s}x</option>
          ))}
        </select>
        
        <div style={{ width: 120 }}>
          <div style={{
            display: 'flex',
            gap: 4,
            overflow: 'auto'
          }}>
            {playlist.map((t, i) => (
              <div
                key={t.id}
                onClick={() => { setCurrentTrack(i); setCurrentTime(0); }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i === currentTrack ? '#8b5cf6' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
