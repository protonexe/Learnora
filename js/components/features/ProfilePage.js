const ProfilePage = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', padding: 40, textAlign: 'center', color: 'white' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, left: 16, padding: '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>← Back</button>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: '#8b5cf6' }}>S</div>
        <h2 style={{ margin: 0, fontSize: 24 }}>Student Name</h2>
        <p style={{ margin: '8px 0 0', opacity: 0.8 }}>student@email.com</p>
      </div>
      <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-secondary)', borderRadius: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>6</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Courses</div>
        </div>
        <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-secondary)', borderRadius: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#10b981' }}>7</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Streak</div>
        </div>
        <div style={{ textAlign: 'center', padding: 16, background: 'var(--bg-secondary)', borderRadius: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fbbf24' }}>1.2k</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>XP</div>
        </div>
      </div>
    </div>
  );
};
