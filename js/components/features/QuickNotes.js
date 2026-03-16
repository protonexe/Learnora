import React from 'react';
import { StickyNote, Plus, Trash2, Edit2, Save, X, Search } from './Icon';

const QuickNotes = ({ onClose }) => {
  const [notes, setNotes] = React.useState(() => {
    return JSON.parse(localStorage.getItem('learnora-quick-notes') || '[]');
  });
  const [newNote, setNewNote] = React.useState('');
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState('');
  const [search, setSearch] = React.useState('');
  
  React.useEffect(() => {
    localStorage.setItem('learnora-quick-notes', JSON.stringify(notes));
  }, [notes]);
  
  const addNote = () => {
    if (!newNote.trim()) return;
    const note = {
      id: Date.now(),
      text: newNote,
      createdAt: new Date().toISOString(),
      color: ['#fef3c7', '#dbeafe', '#d1fae5', '#fce7f3', '#ede9fe'][Math.floor(Math.random() * 5)]
    };
    setNotes([note, ...notes]);
    setNewNote('');
  };
  
  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };
  
  const startEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };
  
  const saveEdit = () => {
    setNotes(notes.map(n => n.id === editingId ? { ...n, text: editText } : n));
    setEditingId(null);
    setEditText('');
  };
  
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };
  
  const filteredNotes = notes.filter(n => 
    n.text.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      maxWidth: 500,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <h2 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <StickyNote size={24} /> Quick Notes
        </h2>
        <span style={{
          background: 'var(--primary)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: 12,
          fontSize: 12
        }}>
          {notes.length} notes
        </span>
      </div>
      
      <div style={{ marginBottom: 16 }}>
        <div style={{
          display: 'flex',
          gap: 8,
          background: 'var(--bg)',
          borderRadius: 8,
          padding: 4,
          border: '1px solid var(--border-color)'
        }}>
          <Search size={18} style={{ color: 'var(--text-secondary)', marginLeft: 8, alignSelf: 'center' }} />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              padding: '8px 0',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 20
      }}>
        <input
          type="text"
          placeholder="Write a quick note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)'
          }}
        />
        <button
          onClick={addNote}
          style={{
            padding: '12px 20px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <Plus size={18} /> Add
        </button>
      </div>
      
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        {filteredNotes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 40,
            color: 'var(--text-secondary)'
          }}>
            {search ? 'No notes found' : 'No notes yet. Start writing!'}
          </div>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              style={{
                background: note.color,
                borderRadius: 8,
                padding: 12,
                position: 'relative'
              }}
            >
              {editingId === note.id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    style={{
                      width: '100%',
                      minHeight: 60,
                      border: 'none',
                      background: 'transparent',
                      color: '#374151',
                      resize: 'none',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button
                      onClick={saveEdit}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: 'none',
                        background: '#10b981',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                    >
                      <Save size={14} /> Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: 'none',
                        background: '#6b7280',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 12
                      }}
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ margin: 0, color: '#374151', lineHeight: 1.5 }}>{note.text}</p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 8,
                    fontSize: 11,
                    color: '#6b7280'
                  }}>
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        onClick={() => startEdit(note)}
                        style={{
                          padding: 4,
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          color: '#6b7280'
                        }}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        style={{
                          padding: 4,
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          color: '#ef4444'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuickNotes;
