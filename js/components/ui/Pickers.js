const ColorPicker = ({ value, onChange, presetColors = [] }) => {
  const [customColor, setCustomColor] = React.useState(value || '#6366f1');

  const defaultColors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
    '#f59e0b', '#10b981', '#06b6d4', '#3b82f6',
    '#64748b', '#84cc16', '#f97316', '#14b8a6'
  ];

  const colors = presetColors.length > 0 ? presetColors : defaultColors;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Preset Colors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '8px'
      }}>
        {colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => onChange(color)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: color,
              border: value === color ? '3px solid var(--text-primary)' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          />
        ))}
      </div>

      {/* Custom Color */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="color"
          value={customColor}
          onChange={(e) => {
            setCustomColor(e.target.value);
            onChange(e.target.value);
          }}
          style={{
            width: '40px',
            height: '40px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: 0
          }}
        />
        <input
          type="text"
          value={customColor}
          onChange={(e) => {
            setCustomColor(e.target.value);
            onChange(e.target.value);
          }}
          placeholder="#000000"
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '13px',
            fontFamily: 'monospace'
          }}
        />
      </div>
    </div>
  );
};

const IconPicker = ({ value, onChange }) => {
  const icons = [
    '📚', '📝', '🗂️', '📖', '🎬', '🎵', '🎨', '💻',
    '🔬', '⚛️', '➗', '📐', '🌍', '🏛️', '✍️', '🧮',
    '🎯', '🏆', '⭐', '🔥', '💡', '🎓', '📊', '📈',
    '🌟', '✨', '💎', '🎁', '🚀', '💪', '🧠', '🎪'
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap: '6px'
    }}>
      {icons.map((icon, idx) => (
        <button
          key={idx}
          onClick={() => onChange(icon)}
          style={{
            width: '40px',
            height: '40px',
            background: value === icon ? 'var(--primary-500)' : 'var(--bg-tertiary)',
            border: value === icon ? 'none' : '1px solid var(--border-color)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '20px',
            transition: 'all 0.2s ease'
          }}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

window.ColorPicker = ColorPicker;
window.IconPicker = IconPicker;
