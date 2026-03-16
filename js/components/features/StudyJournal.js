const StudyJournal = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [entries, setEntries] = React.useState(() => {
    return JSON.parse(localStorage.getItem('study-journal-entries') || '[]');
  });
  const [newEntry, setNewEntry] = React.useState('');
  const [mood, setMood] = React.useState('happy');
  const [filter, setFilter] = React.useState('all');

  React.useEffect(() => {
    localStorage.setItem('study-journal-entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!newEntry.trim()) return;
    const entry = {
      id: Date.now(),
      text: newEntry,
      mood,
      date: new Date().toISOString(),
      tags: []
    };
    setEntries([entry, ...entries]);
    setNewEntry('');
    showToast?.('Journal entry added!', 'success');
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const filteredEntries = filter === 'all' ? entries : entries.filter(e => e.mood === filter);

  const moods = [
    { value: 'happy', label: '😊', color: '#10b981' },
    { value: 'neutral', label: '😐', color: '#f59e0b' },
    { value: 'sad', label: '😔', color: '#6366f1' },
    { value: 'excited', label: '🤩', color: '#ec4899' },
    { value: 'tired', label: '😴', color: '#8b5cf6' }
  ];

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}>
          <Icon name="arrow-left" size={20} />
        </button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>
          📓 Study Journal
        </h1>
      </div>

      {/* Add Entry */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>New Entry</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {moods.map(m => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              style={{
                ...styles.moodButton,
                background: mood === m.value ? `${m.color}20` : 'transparent',
                borderColor: mood === m.value ? m.color : 'var(--border-color)'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="What did you learn today? How do you feel about your progress?"
          style={styles.textarea}
          rows={4}
        />
        <button onClick={addEntry} style={styles.primaryButton}>
          Add Entry
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['all', 'happy', 'excited', 'neutral', 'tired', 'sad'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterButton,
              background: filter === f ? 'var(--primary-500)' : 'var(--bg-secondary)',
              color: filter === f ? '#fff' : 'var(--text-secondary)'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredEntries.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '40px' }}>
            No journal entries yet. Start writing!
          </p>
        ) : (
          filteredEntries.map(entry => (
            <div key={entry.id} style={styles.entryCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>
                    {moods.find(m => m.value === entry.mood)?.label}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <button onClick={() => deleteEntry(entry.id)} style={styles.deleteButton}>
                  <Icon name="trash-2" size={16} />
                </button>
              </div>
              <p style={{ margin: '12px 0 0 0', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                {entry.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  backButton: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    marginBottom: '20px'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    color: 'var(--text-primary)'
  },
  moodButton: {
    fontSize: '24px',
    padding: '8px 12px',
    border: '2px solid',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    resize: 'vertical',
    marginBottom: '12px'
  },
  primaryButton: {
    background: 'var(--primary-500)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%'
  },
  filterButton: {
    padding: '8px 16px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  entryCard: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    padding: '16px'
  },
  deleteButton: {
    background: 'transparent',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    color: 'var(--text-tertiary)'
  }
};

window.StudyJournal = StudyJournal;
