const FocusList = ({ onBack }) => {
  const items = ['Math problems', 'Physics formulas', 'Chemistry reactions', 'Biology diagrams'];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Focus List</h1>
      </header>
      <div style={{ padding: '20px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input type="checkbox" style={{ width: '20px', height: '20px' }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

window.FocusList = FocusList;
