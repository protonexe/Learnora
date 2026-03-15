const QuickAdd = ({ isOpen, onClose, onNavigate, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('note');
  const [noteTitle, setNoteTitle] = React.useState('');
  const [noteContent, setNoteContent] = React.useState('');

  const handleSaveNote = () => {
    if (!noteTitle.trim() && !noteContent.trim()) {
      showToast('Please enter a title or content', 'warning');
      return;
    }
    
    const notes = JSON.parse(localStorage.getItem('learnora_notes') || '[]');
    notes.unshift({
      id: 'note_' + Date.now(),
      title: noteTitle || 'Untitled Note',
      content: noteContent,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    localStorage.setItem('learnora_notes', JSON.stringify(notes));
    showToast('Note saved!', 'success');
    setNoteTitle('');
    setNoteContent('');
    onClose();
  };

  const tabs = [
    { id: 'note', label: 'Note', icon: '📝' },
    { id: 'homework', label: 'Homework', icon: '📋' },
    { id: 'event', label: 'Event', icon: '📅' },
  ];

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '360px',
      background: 'var(--bg-secondary)',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
      overflow: 'hidden',
      zIndex: 998,
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Quick Add</h3>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--text-secondary)' }}>✕</button>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px',
              background: activeTab === tab.id ? 'var(--primary-500)' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '16px' }}>
        {activeTab === 'note' && (
          <>
            <input
              type="text"
              placeholder="Note title..."
              value={noteTitle}
              onChange={e => setNoteTitle(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '14px' }}
            />
            <textarea
              placeholder="Write your note..."
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              rows={5}
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', fontSize: '14px', resize: 'none' }}
            />
            <button onClick={handleSaveNote} style={{ width: '100%', padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              Save Note
            </button>
          </>
        )}

        {activeTab === 'homework' && (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>
            <p>Go to Homework section to add new tasks</p>
            <button onClick={() => { onClose(); onNavigate('homework'); }} style={{ marginTop: '12px', padding: '10px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Go to Homework
            </button>
          </div>
        )}

        {activeTab === 'event' && (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>
            <p>Go to Calendar to add events</p>
            <button onClick={() => { onClose(); onNavigate('calendar'); }} style={{ marginTop: '12px', padding: '10px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Go to Calendar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

window.QuickAdd = QuickAdd;
