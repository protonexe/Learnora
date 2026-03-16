const AboutLearnora = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: 40, textAlign: 'center', color: 'white' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>×</button>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: 28 }}>Learnora</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>Version 1.0.0</p>
      </div>
      <div style={{ padding: 20 }}>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Learnora is your all-in-one learning companion. Track progress, study with peers, and achieve your goals!
        </p>
      </div>
    </div>
  );
};
