const StudyJournal = ({ onClose }) => {
  const [entries, setEntries] = React.useState(() => {
    const saved = localStorage.getItem('learnora-journal');
    return saved ? JSON.parse(saved) : [];
  });
  const [newEntry, setNewEntry] = React.useState('');
  const [mood, setMood] = React.useState('happy');
  const [filter, setFilter] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const moods = [
    { value: 'happy', emoji: '😊', label: 'Great' },
    { value: 'good', emoji: '🙂', label: 'Good' },
    { value: 'neutral', emoji: '😐', label: 'Okay' },
    { value: 'tired', emoji: '😔', label: 'Tired' },
    { value: 'stressed', emoji: '😰', label: 'Stressed' },
  ];

  const saveEntries = (newEntries) => {
    setEntries(newEntries);
    localStorage.setItem('learnora-journal', JSON.stringify(newEntries));
  };

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      content: newEntry,
      mood,
      tags: extractTags(newEntry),
    };
    
    saveEntries([entry, ...entries]);
    setNewEntry('');
  };

  const extractTags = (text) => {
    const matches = text.match(/#[\w]+/g);
    return matches ? matches.map(t => t.slice(1)) : [];
  };

  const deleteEntry = (id) => {
    saveEntries(entries.filter(e => e.id !== id));
  };

  const filteredEntries = entries.filter(entry => {
    const matchesFilter = filter === 'all' || entry.mood === filter;
    const matchesSearch = !searchTerm || entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const getMoodStats = () => {
    const total = entries.length;
    if (total === 0) return {};
    const counts = entries.reduce((acc, e) => {
      acc[e.mood] = (acc[e.mood] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([mood, count]) => ({
      mood,
      count,
      percentage: Math.round((count / total) * 100)
    }));
  };

  const stats = getMoodStats();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'var(--text-primary)' }}>📔 Study Journal</h2>
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
          {entries.length} entries
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
        {/* Mood Stats */}
        {entries.length > 0 && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)' }}>Mood Overview</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {moods.map(m => {
                const stat = stats.find(s => s.mood === m.value);
                return (
                  <div key={m.value} style={{
                    padding: '8px 12px',
                    background: stat ? `var(--primary)` + '15' : 'var(--bg)',
                    borderRadius: 8,
                    border: stat ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <span>{m.emoji}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>{stat?.percentage || 0}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* New Entry Form */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 20,
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: 'var(--text-primary)' }}>New Entry</h3>
          
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>How are you feeling?</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {moods.map(m => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: 'none',
                    background: mood === m.value ? 'var(--primary)' : 'var(--bg)',
                    color: mood === m.value ? 'white' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13
                  }}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write about your studies today... Use #tags for topics"
            style={{
              width: '100%',
              minHeight: 120,
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg)',
              color: 'var(--text-primary)',
              fontSize: 14,
              fontFamily: 'inherit',
              resize: 'vertical',
              marginBottom: 12
            }}
          />

          <button
            onClick={handleAddEntry}
            disabled={!newEntry.trim()}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              border: 'none',
              background: newEntry.trim() ? 'var(--primary)' : 'var(--border-color)',
              color: 'white',
              cursor: newEntry.trim() ? 'pointer' : 'not-allowed',
              fontWeight: 600,
              fontSize: 14
            }}
          >
            Save Entry
          </button>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginBottom: 20,
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: 200,
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 14
            }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 14,
              cursor: 'pointer'
            }}
          >
            <option value="all">All Moods</option>
            {moods.map(m => (
              <option key={m.value} value={m.value}>{m.emoji} {m.label}</option>
            ))}
          </select>
        </div>

        {/* Entries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredEntries.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: 40,
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📔</div>
              <p>No journal entries yet. Start writing about your learning journey!</p>
            </div>
          ) : (
            filteredEntries.map(entry => (
              <div
                key={entry.id}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: 12,
                  padding: 16,
                  border: '1px solid var(--border-color)',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 24 }}>
                      {moods.find(m => m.value === entry.mood)?.emoji || '😐'}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-tertiary)',
                      cursor: 'pointer',
                      fontSize: 12
                    }}
                  >
                    Delete
                  </button>
                </div>
                
                <p style={{
                  margin: 0,
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap'
                }}>
                  {entry.content}
                </p>

                {entry.tags && entry.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    gap: 6,
                    marginTop: 12,
                    flexWrap: 'wrap'
                  }}>
                    {entry.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: '4px 8px',
                          background: 'var(--primary)' + '15',
                          color: 'var(--primary)',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 500
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
