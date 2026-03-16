const TutoringScheduler = ({ onClose }) => {
  const slots = [
    { time: '9:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '2:00 PM', available: true },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 1000, overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: 'var(--bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0, fontSize: 20 }}>📅 Tutoring</h2>
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Available Slots</h3>
        {slots.map((s, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: 12, padding: 16, marginBottom: 8, border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{s.time}</span>
            <button disabled={!s.available} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: s.available ? 'var(--primary)' : 'var(--border-color)', color: 'white', cursor: s.available ? 'pointer' : 'not-allowed', fontSize: 12 }}>{s.available ? 'Book' : 'Booked'}</button>
          </div>
        ))}
      </div>
    </div>
  );
};
