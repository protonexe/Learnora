const AchievementCard = ({ onClose }) => {
  const achievements = [
    { title: 'First Quiz', desc: 'Complete your first quiz', icon: '🎯', progress: 100 },
    { title: 'Study Streak', desc: '7 days in a row', icon: '🔥', progress: 100 },
    { title: 'Course Complete', desc: 'Finish a course', icon: '📚', progress: 75 },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto', animation: 'fadeIn 0.2s ease' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>🎖️ Achievements</h2>
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {achievements.map((a, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary)' + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.desc}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: a.progress === 100 ? '#10b981' : 'var(--primary)' }}>{a.progress}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: a.progress + '%', background: a.progress === 100 ? '#10b981' : 'var(--primary)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
