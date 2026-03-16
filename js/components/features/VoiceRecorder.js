const VoiceRecorder = ({ onClose }) => {
  const [recording, setRecording] = React.useState(false);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, padding: '10px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>×</button>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎤</div>
      <button onClick={() => setRecording(!recording)} style={{ width: 80, height: 80, borderRadius: '50%', border: 'none', background: recording ? '#f43f5e' : 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 24 }}>
        {recording ? '⏹' : '🎙'}
      </button>
      <p style={{ marginTop: 16, color: 'var(--text-secondary)' }}>{recording ? 'Recording...' : 'Tap to record'}</p>
    </div>
  );
};
