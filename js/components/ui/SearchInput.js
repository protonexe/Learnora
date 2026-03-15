const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = 'Search...',
  onSearch,
  suggestions = [],
  onSuggestionClick
}) => {
  const [focused, setFocused] = React.useState(false);
  const [localSuggestions, setLocalSuggestions] = React.useState([]);

  React.useEffect(() => {
    if (value.length > 0 && suggestions.length === 0) {
      // Filter based on input - placeholder for demo
      setLocalSuggestions([]);
    } else {
      setLocalSuggestions(suggestions.slice(0, 5));
    }
  }, [value, suggestions]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-tertiary)',
        border: `1px solid ${focused ? 'var(--primary-500)' : 'var(--border-color)'}`,
        borderRadius: '12px',
        padding: '0 14px',
        transition: 'all 0.2s ease'
      }}>
        <Icon name="search" size={18} color="var(--text-tertiary)" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch?.(value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: '12px',
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            color: 'var(--text-primary)',
            outline: 'none'
          }}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              padding: '4px'
            }}
          >
            <Icon name="x" size={14} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {focused && localSuggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 100,
          overflow: 'hidden'
        }}>
          {localSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSuggestionClick?.(suggestion);
                setFocused(false);
              }}
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textAlign: 'left'
              }}
            >
              <Icon name="search" size={14} color="var(--text-tertiary)" />
              <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AutoComplete = ({ 
  value, 
  options = [], 
  onChange, 
  placeholder = 'Type to search...',
  renderOption
}) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(value.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      onChange(filteredOptions[highlightedIndex]);
      setShowOptions(false);
    } else if (e.key === 'Escape') {
      setShowOptions(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowOptions(true);
          setHighlightedIndex(-1);
        }}
        onFocus={() => setShowOptions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          fontSize: '14px'
        }}
      />

      {showOptions && filteredOptions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 100
        }}>
          {filteredOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                onChange(option);
                setShowOptions(false);
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: idx === highlightedIndex ? 'var(--bg-tertiary)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                color: 'var(--text-primary)'
              }}
            >
              {renderOption ? renderOption(option) : option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

window.SearchInput = SearchInput;
window.AutoComplete = AutoComplete;
