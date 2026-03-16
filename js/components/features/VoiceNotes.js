import React from 'react';
import { Mic, Square, Play, Pause, Trash2, Download, Volume2 } from './Icon';

const VoiceRecorder = ({ onSave, maxDuration = 300 }) => {
  const [recording, setRecording] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [audioChunks, setAudioChunks] = React.useState([]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(prev => [...prev, e.data]);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start();
      setRecording(true);
      
      const interval = setInterval(() => {
        setDuration(d => {
          if (d >= maxDuration) {
            stopRecording();
            return d;
          }
          return d + 1;
        });
      }, 1000);
      
      recorder.interval = interval;
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      clearInterval(mediaRecorder.interval);
      setRecording(false);
    }
  };
  
  const saveRecording = () => {
    if (audioUrl) {
      onSave?.({ url: audioUrl, duration });
      setAudioUrl(null);
      setDuration(0);
    }
  };
  
  const discardRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setDuration(0);
    setAudioChunks([]);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 12,
      padding: 16,
      border: '1px solid var(--border-color)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 20
      }}>
        {!audioUrl ? (
          <button
            onClick={recording ? stopRecording : startRecording}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              border: 'none',
              background: recording ? '#ef4444' : 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: recording ? '0 0 20px rgba(239, 68, 68, 0.5)' : '0 4px 12px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            {recording ? <Square size={24} /> : <Mic size={24} />}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={discardRecording}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: 'none',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={saveRecording}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: 'none',
                background: '#10b981',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Volume2 size={24} />
            </button>
          </div>
        )}
      </div>
      
      {recording && (
        <div style={{
          textAlign: 'center',
          color: '#ef4444',
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 12
        }}>
          <span style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#ef4444',
            marginRight: 8,
            animation: 'pulse 1s infinite'
          }} />
          {formatTime(duration)}
        </div>
      )}
      
      {audioUrl && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          Recording saved ({formatTime(duration)})
        </div>
      )}
      
      {!recording && !audioUrl && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>
          Click to start recording (max {Math.floor(maxDuration / 60)} min)
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

const VoiceNotePlayer = ({ audioUrl, duration, onDelete }) => {
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [audio, setAudio] = React.useState(null);
  
  React.useEffect(() => {
    const audioEl = new Audio(audioUrl);
    audioEl.onended = () => setPlaying(false);
    audioEl.ontimeupdate = () => setCurrentTime(audioEl.currentTime);
    setAudio(audioEl);
    return () => audioEl.pause();
  }, [audioUrl]);
  
  const togglePlay = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = duration ? (currentTime / duration) * 100 : 0;
  
  return (
    <div style={{
      background: 'var(--bg)',
      borderRadius: 8,
      padding: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      border: '1px solid var(--border-color)'
    }}>
      <button
        onClick={togglePlay}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: 'none',
          background: 'var(--primary)',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
      
      <div style={{ flex: 1 }}>
        <div style={{
          height: 4,
          background: 'var(--border-color)',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 4
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--primary)',
            transition: 'width 0.1s'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)' }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <button
        onClick={onDelete}
        style={{
          padding: 8,
          borderRadius: 6,
          border: 'none',
          background: 'transparent',
          color: 'var(--text-secondary)',
          cursor: 'pointer'
        }}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export { VoiceRecorder, VoiceNotePlayer };
