const StreakCard = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, padding: '10px 16px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>Close</button>
      <div style={{ fontSize: 80, marginBottom: 16 }}>🔥</div>
      <div style={{ fontSize: 56, fontWeight: 700, color: 'white', marginBottom: 8 }}>7</div>
      <div style={{ fontSize: 20, color: 'white', opacity: 0.9 }}>Day Streak!</div>
      <div style={{ fontSize: 14, color: 'white', opacity: 0.7, marginTop: 24 }}>Keep it up! You're doing great!</div>
    </div>
  );
};
