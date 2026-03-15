const AvatarEditor = ({ currentAvatar, onSelect }) => {
  const avatars = [
    '👨‍🎓', '👩‍🎓', '🧑‍💻', '👨‍🔬', '👩‍🔬', '👨‍🏫', '👩‍🏫',
    '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀', '🦸', '🦹', '🧙', '🧚',
    '🦁', '🐻', '🐼', '🐨', '🐯', '🦊', '🐰', '🐶',
    '🌟', '⭐', '🌈', '🔥', '💎', '🎯', '🏆', '🎭'
  ];
  
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredAvatars = avatars.filter(a => 
    searchTerm === '' || a.includes(searchTerm)
  );

  return (
    <div style={{ marginTop: '16px' }}>
      <input 
        type="text" 
        placeholder="Search avatars..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          marginBottom: '12px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          fontSize: '13px'
        }}
      />
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(8, 1fr)', 
        gap: '8px',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        {filteredAvatars.map((avatar, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(avatar)}
            style={{
              width: '40px',
              height: '40px',
              background: currentAvatar === avatar ? 'var(--primary-500)' : 'var(--bg-tertiary)',
              border: currentAvatar === avatar ? '2px solid var(--primary-500)' : '2px solid transparent',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {avatar}
          </button>
        ))}
      </div>
    </div>
  );
};

window.AvatarEditor = AvatarEditor;
