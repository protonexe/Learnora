const VirtualClassroom = ({ onBack }) => {
  const isMobile = window.innerWidth <= 768;
  const [rooms] = React.useState([
    { id: 1, name: 'Math Room A', participants: 8, max: 20, active: true },
    { id: 2, name: 'Physics Lab', participants: 5, max: 15, active: true },
    { id: 3, name: 'Study Hall', participants: 12, max: 30, active: true },
  ]);

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.back}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>🏫 Virtual Classroom</h1>
      </div>

      <div style={styles.grid}>
        {rooms.map(room => (
          <div key={room.id} style={styles.room}>
            <h3 style={styles.roomName}>{room.name}</h3>
            <p style={styles.roomMeta}>{room.participants}/{room.max} participants</p>
            <button style={styles.joinBtn}>Join Room</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = { back: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px', cursor: 'pointer' }, grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }, room: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }, roomName: { fontSize: '18px', fontWeight: 600, margin: '0 0 8px' }, roomMeta: { color: '#888', fontSize: '14px', marginBottom: '16px' }, joinBtn: { width: '100%', padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }};

window.VirtualClassroom = VirtualClassroom;
