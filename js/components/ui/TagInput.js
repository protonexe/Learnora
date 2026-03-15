const TagInput = ({ 
  tags = [], 
  onChange, 
  suggestions = [],
  placeholder = 'Add tag...',
  maxTags = 10 
}) => {
  const [input, setInput] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const addTag = (tag) => {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
      onChange([...tags, trimmed]);
      setInput('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tag) => {
    onChange(tags.filter(t => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const filteredSuggestions = suggestions.filter(
    s => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s.toLowerCase())
  );

  return (
    <div style={{
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '8px',
      background: 'var(--bg-primary)'
    }}>
      {/* Tags Display */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
        {tags.map(tag => (
          <span
            key={tag}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              background: 'var(--primary-500)',
              color: '#fff',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: '0',
                fontSize: '14px',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={tags.length < maxTags ? placeholder : 'Max tags reached'}
          disabled={tags.length >= maxTags}
          style={{
            width: '100%',
            padding: '8px',
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            color: 'var(--text-primary)',
            outline: 'none'
          }}
        />

        {/* Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            marginTop: '4px',
            maxHeight: '150px',
            overflow: 'auto',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {filteredSuggestions.slice(0, 5).map(suggestion => (
              <button
                key={suggestion}
                onClick={() => addTag(suggestion)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  color: 'var(--text-primary)'
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

window.TagInput = TagInput;
