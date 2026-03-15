const NoteEditor = ({ note, onSave, onCancel, showToast }) => {
  const [content, setContent] = React.useState(note?.content || '');
  const [title, setTitle] = React.useState(note?.title || '');
  const [tags, setTags] = React.useState(note?.tags || []);
  const [tagInput, setTagInput] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleSave = () => {
    if (!title.trim()) {
      showToast?.('Please enter a title', 'error');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      onSave?.({ ...note, title, content, tags, updatedAt: Date.now() });
      setIsSaving(false);
    }, 300);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>
          {note?.id ? 'Edit Note' : 'New Note'}
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '8px 16px',
              background: 'var(--bg-tertiary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--text-secondary)'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              padding: '8px 16px',
              background: 'var(--primary-500)',
              border: 'none',
              borderRadius: '8px',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              color: '#fff',
              opacity: isSaving ? 0.7 : 1
            }}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '16px',
            fontWeight: '600'
          }}
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={isMobile ? 8 : 12}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '14px',
            lineHeight: '1.6',
            resize: 'vertical'
          }}
        />

        {/* Tags */}
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  background: 'var(--primary-500)15',
                  color: 'var(--primary-500)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--primary-500)',
                    padding: '0',
                    fontSize: '14px'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                fontSize: '13px'
              }}
            />
            <button
              onClick={addTag}
              style={{
                padding: '10px 16px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}
            >
              Add Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.NoteEditor = NoteEditor;
