const VoiceRecorder = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [recordings, setRecordings] = React.useState(() => JSON.parse(localStorage.getItem('voice-recordings') || '[]'));
  const [recording, setRecording] = React.useState(false);
  const [mediaRecorder, setMediaRecorder] = React.useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const newRecording = { id: Date.now(), url, date: new Date().toISOString(), duration: 0 };
        setRecordings([newRecording, ...recordings]);
        localStorage.setItem('voice-recordings', JSON.stringify([newRecording, ...recordings]));
        showToast?.('Recording saved!', 'success');
      };
      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (err) {
      showToast?.('Could not access microphone', 'error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const deleteRecording = (id) => {
    setRecordings(recordings.filter(r => r.id !== id));
    localStorage.setItem('voice-recordings', JSON.stringify(recordings.filter(r => r.id !== id)));
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>🎤 Voice Recorder</h1>
      </div>

      <div style={styles.recordCard}>
        <div style={{ ...styles.recordButton, background: recording ? '#f43f5e' : 'var(--primary-500)' }} onClick={recording ? stopRecording : startRecording}>
          <span style={styles.recordIcon}>{recording ? '⏹️' : '🎙️'}</span>
        </div>
        <p style={styles.recordText}>{recording ? 'Tap to stop recording' : 'Tap to start recording'}</p>
      </div>

      <h3 style={styles.sectionTitle}>Recordings ({recordings.length})</h3>
      {recordings.length === 0 ? (
        <p style={styles.emptyText}>No recordings yet</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recordings.map(rec => (
            <div key={rec.id} style={styles.recCard}>
              <audio src={rec.url} controls style={{ flex: 1 }} />
              <p style={styles.recDate}>{new Date(rec.date).toLocaleString()}</p>
              <button onClick={() => deleteRecording(rec.id)} style={styles.deleteBtn}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  recordCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '40px', textAlign: 'center', marginBottom: '24px' },
  recordButton: { width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s' },
  recordIcon: { fontSize: '32px' },
  recordText: { fontSize: '14px', color: 'var(--text-secondary)', margin: 0 },
  sectionTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' },
  emptyText: { textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px' },
  recCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' },
  recDate: { fontSize: '12px', color: 'var(--text-tertiary)', margin: 0, whiteSpace: 'nowrap' },
  deleteBtn: { background: 'transparent', border: 'none', cursor: 'pointer' }
};

window.VoiceRecorder = VoiceRecorder;
