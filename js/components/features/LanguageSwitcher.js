const LanguageSwitcher = ({ currentLang, onChange, languages = [] }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const defaultLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  const langs = languages.length > 0 ? languages : defaultLanguages;
  const current = langs.find(l => l.code === currentLang) || langs[0];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        <span>{current.flag}</span>
        <span>{current.name}</span>
        <Icon name="chevron-down" size={14} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '4px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 100,
          minWidth: '160px',
          overflow: 'hidden'
        }}>
          {langs.map(lang => (
            <button
              key={lang.code}
              onClick={() => { onChange(lang.code); setIsOpen(false); }}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: lang.code === currentLang ? 'var(--primary-500)15' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                color: lang.code === currentLang ? 'var(--primary-500)' : 'var(--text-primary)'
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

window.LanguageSwitcher = LanguageSwitcher;
