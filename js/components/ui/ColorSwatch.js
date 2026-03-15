const ColorSwatch = ({ colors = [], selected, onChange, size = 32 }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    {colors.map((color, idx) => (
      <button
        key={idx}
        onClick={() => onChange(color)}
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: '8px',
          border: selected === color ? '3px solid var(--text-primary)' : '3px solid transparent',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          boxShadow: selected === color ? '0 0 0 2px var(--bg-secondary)' : 'none'
        }}
      />
    ))}
  </div>
);

const PaletteGenerator = ({ baseColor, onGenerate }) => {
  const [palette, setPalette] = React.useState([]);

  React.useEffect(() => {
    generatePalette(baseColor);
  }, [baseColor]);

  const generatePalette = (color) => {
    // Simple palette generation
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const newPalette = shades.map(shade => {
      const factor = shade / 500;
      const newR = Math.min(255, Math.max(0, Math.round(r * factor)));
      const newG = Math.min(255, Math.max(0, Math.round(g * factor)));
      const newB = Math.min(255, Math.max(0, Math.round(b * factor)));
      return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    });

    setPalette(newPalette);
    onGenerate?.(newPalette);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {palette.map((color, idx) => (
        <div
          key={idx}
          onClick={() => navigator.clipboard.writeText(color)}
          style={{
            height: '28px',
            background: color,
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '8px',
            fontSize: '10px',
            color: idx > 5 ? '#fff' : '#000',
            fontFamily: 'monospace'
          }}
        >
          {color}
        </div>
      ))}
    </div>
  );
};

window.ColorSwatch = ColorSwatch;
window.PaletteGenerator = PaletteGenerator;
