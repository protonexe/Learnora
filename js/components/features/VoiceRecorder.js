const VoiceRecorder = ({ onRecordingComplete, showToast }) => {
  const [recording, setRecording] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [audioUrl, setAudioUrl] = React.useState(null);
  const mediaRecorderRef = React.useRef(null);
  const chunksRef = React.useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete?.(blob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      
      // Timer
      const interval = setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
      
      mediaRecorderRef.current._interval = interval;
    } catch (err) {
      showToast?.('Microphone access denied', 'error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      clearInterval(mediaRecorderRef.current._interval);
      setRecording(false);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      padding: '24px',
      border: '1px solid var(--border-color)',
      textAlign: 'center'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: recording ? 'var(--danger)' : 'var(--bg-tertiary)',
        margin: '0 auto 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}>
        <span style={{ fontSize: '32px' }}>{recording ? '🔴' : '🎤'}</span>
      </div>

      {recording && (
        <p style={{
          fontSize: '24px',
          fontWeight: '700',
          fontFamily: 'monospace',
          color: 'var(--danger)',
          margin: '0 0 16px 0'
        }}>
          {formatDuration(duration)}
        </p>
      )}

      <button
        onClick={recording ? stopRecording : startRecording}
        style={{
          padding: '12px 32px',
          background: recording ? 'var(--danger)' : 'var(--primary-500)',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff'
        }}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {audioUrl && !recording && (
        <div style={{ marginTop: '16px' }}>
          <audio src={audioUrl} controls style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
};

window.VoiceRecorder = VoiceRecorder;
