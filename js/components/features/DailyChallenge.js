const DailyChallenge = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, padding: '10px 16px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>Close</button>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
      <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Daily Challenge</div>
      <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 24, textAlign: 'center', maxWidth: 300 }}>Complete 3 quizzes today to earn bonus XP!</p>
      <button style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: 'white', color: '#f59e0b', cursor: 'pointer', fontSize: 16, fontWeight: 700 }}>Start Challenge</button>
    </div>
  );
};
