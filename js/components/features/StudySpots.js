const StudySpots = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [spots, setSpots] = React.useState(() => {
    return JSON.parse(localStorage.getItem('study-spots') || '[]');
  });
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newSpot, setNewSpot] = React.useState({ name: '', type: 'library', notes: '' });

  React.useEffect(() => {
    localStorage.setItem('study-spots', JSON.stringify(spots));
  }, [spots]);

  const addSpot = () => {
    if (!newSpot.name.trim()) return;
    const spot = { id: Date.now(), ...newSpot, rating: 0, visits: 0, lastVisited: null };
    setSpots([...spots, spot]);
    setNewSpot({ name: '', type: 'library', notes: '' });
    setShowAddForm(false);
    showToast?.('Study spot added!', 'success');
  };

  const deleteSpot = (id) => {
    setSpots(spots.filter(s => s.id !== id));
  };

  const rateSpot = (id, rating) => {
    setSpots(spots.map(s => s.id === id ? { ...s, rating } : s));
  };

  const visitSpot = (id) => {
    setSpots(spots.map(s => s.id === id ? { ...s, visits: s.visits + 1, lastVisited: new Date().toISOString() } : s));
    showToast?.('Enjoy your study session!', 'info');
  };

  const types = [
    { id: 'library', icon: '🏛️', label: 'Library' },
    { id: 'cafe', icon: '☕', label: 'Cafe' },
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'park', icon: '🌳', label: 'Park' },
    { id: 'university', icon: '🎓', label: 'University' },
    { id: 'other', icon: '📍', label: 'Other' }
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={styles.backButton}>
            <Icon name="arrow-left" size={20} />
          </button>
          <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
            📍 Study Spots
          </h1>
        </div>
        <button onClick={() => setShowAddForm(true)} style={styles.addButton}>
          <Icon name="plus" size={18} /> Add Spot
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Add New Spot</h3>
          <input
            type="text"
            value={newSpot.name}
            onChange={(e) => setNewSpot({ ...newSpot, name: e.target.value })}
            placeholder="Spot name"
            style={styles.input}
          />
          <select
            value={newSpot.type}
            onChange={(e) => setNewSpot({ ...newSpot, type: e.target.value })}
            style={styles.select}
          >
            {types.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
          </select>
          <textarea
            value={newSpot.notes}
            onChange={(e) => setNewSpot({ ...newSpot, notes: e.target.value })}
            placeholder="Notes (wifi, noise level, etc.)"
            style={styles.textarea}
            rows={2}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addSpot} style={styles.primaryButton}>Add</button>
            <button onClick={() => setShowAddForm(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {/* Spots Grid */}
      {spots.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No study spots saved yet.</p>
          <p>Add your favorite places to study!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
          {spots.map(spot => (
            <div key={spot.id} style={styles.spotCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{types.find(t => t.id === spot.type)?.icon}</span>
                  <div>
                    <h3 style={styles.spotName}>{spot.name}</h3>
                    <p style={styles.spotType}>{types.find(t => t.id === spot.type)?.label}</p>
                  </div>
                </div>
                <button onClick={() => deleteSpot(spot.id)} style={styles.deleteButton}>
                  <Icon name="trash-2" size={16} />
                </button>
              </div>
              {spot.notes && <p style={styles.spotNotes}>{spot.notes}</p>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => rateSpot(spot.id, star)} style={styles.starButton}>
                      {star <= spot.rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={styles.visitCount}>{spot.visits} visits</p>
                </div>
              </div>
              <button onClick={() => visitSpot(spot.id)} style={styles.visitButton}>
                Check In
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  card: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  select: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  textarea: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px', resize: 'vertical' },
  primaryButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' },
  spotCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  spotName: { fontSize: '18px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  spotType: { fontSize: '13px', color: 'var(--text-tertiary)', margin: '4px 0 0 0' },
  spotNotes: { fontSize: '14px', color: 'var(--text-secondary)', margin: '12px 0', lineHeight: '1.5' },
  deleteButton: { background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--text-tertiary)' },
  starButton: { background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', padding: '0' },
  visitCount: { fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 },
  visitButton: { width: '100%', marginTop: '12px', background: 'var(--primary-100)', color: 'var(--primary-600)', border: 'none', borderRadius: 'var(--radius-md)', padding: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.StudySpots = StudySpots;
