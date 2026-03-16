const StudyRoom = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [rooms, setRooms] = React.useState(() => {
    return JSON.parse(localStorage.getItem('study-rooms') || '[]');
  });
  const [showCreate, setShowCreate] = React.useState(false);
  const [newRoom, setNewRoom] = React.useState({ name: '', subject: '', maxParticipants: 4, isPrivate: false });

  React.useEffect(() => {
    localStorage.setItem('study-rooms', JSON.stringify(rooms));
  }, [rooms]);

  const createRoom = () => {
    if (!newRoom.name.trim()) return;
    const room = { 
      id: Date.now(), 
      ...newRoom, 
      participants: 1, 
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setRooms([...rooms, room]);
    setNewRoom({ name: '', subject: '', maxParticipants: 4, isPrivate: false });
    setShowCreate(false);
    showToast?.('Study room created!', 'success');
  };

  const joinRoom = (id) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, participants: r.participants + 1 } : r));
    showToast?.('Joined study room!', 'info');
  };

  const leaveRoom = (id) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, participants: Math.max(1, r.participants - 1) } : r));
  };

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'Computer Science', 'Economics'];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}>
            <Icon name="arrow-left" size={20} />
          </button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
            🏠 Study Rooms
          </h1>
        </div>
        <button onClick={() => setShowCreate(true)} style={styles.createButton}>
          <Icon name="plus" size={18} /> Create Room
        </button>
      </div>

      {/* Create Room Form */}
      {showCreate && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Create Study Room</h3>
          <input
            type="text"
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            placeholder="Room name"
            style={styles.input}
          />
          <select
            value={newRoom.subject}
            onChange={(e) => setNewRoom({ ...newRoom, subject: e.target.value })}
            style={styles.select}
          >
            <option value="">Select subject</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input
              type="number"
              value={newRoom.maxParticipants}
              onChange={(e) => setNewRoom({ ...newRoom, maxParticipants: parseInt(e.target.value) })}
              min={2}
              max={10}
              style={{ ...styles.input, flex: 1 }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={newRoom.isPrivate}
                onChange={(e) => setNewRoom({ ...newRoom, isPrivate: e.target.checked })}
              />
              Private
            </label>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={createRoom} style={styles.primaryButton}>Create</button>
            <button onClick={() => setShowCreate(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {/* Active Rooms */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={styles.sectionTitle}>Active Rooms ({rooms.length})</h3>
      </div>

      {rooms.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No active study rooms.</p>
          <p>Create one to start studying with others!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
          {rooms.map(room => (
            <div key={room.id} style={styles.roomCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={styles.roomName}>{room.name}</h3>
                  <p style={styles.roomSubject}>{room.subject}</p>
                </div>
                <span style={styles.privateBadge}>{room.isPrivate ? '🔒' : '🌍'}</span>
              </div>
              <div style={styles.roomStats}>
                <span>👥 {room.participants}/{room.maxParticipants}</span>
                <span style={{ color: 'var(--primary-500)' }}>● Active</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => joinRoom(room.id)} style={styles.joinButton}>Join</button>
                <button onClick={() => leaveRoom(room.id)} style={styles.leaveButton}>Leave</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div style={styles.tipsCard}>
        <h3 style={styles.tipsTitle}>💡 Study Room Tips</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <li>Find a room with your subject area</li>
          <li>Keep your camera on for better engagement</li>
          <li>Use the chat to share notes</li>
          <li>Set goals for each study session</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  createButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  sectionTitle: { fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' },
  emptyState: { textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' },
  roomCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  roomName: { fontSize: '18px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  roomSubject: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  privateBadge: { fontSize: '16px' },
  roomStats: { display: 'flex', justifyContent: 'space-between', margin: '16px 0', fontSize: '13px', color: 'var(--text-secondary)' },
  joinButton: { flex: 1, background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  leaveButton: { flex: 1, background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  tipsCard: { marginTop: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  tipsTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }
};

window.StudyRoom = StudyRoom;
