const StudySpotMap = ({ onBack }) => {
  const spots = [
    { name: 'Library', rating: 4.8, distance: '0.2 mi' },
    { name: 'Coffee Shop', rating: 4.5, distance: '0.5 mi' },
    { name: 'Study Room', rating: 4.9, distance: '0.8 mi' },
    { name: 'Park', rating: 4.2, distance: '1.2 mi' }
  ];

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Spots</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: '#f3f4f6', height: '200px', borderRadius: '20px', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#9ca3af' }}>🗺️ Map View</span>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {spots.map((s, i) => (
            <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>📍</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>{s.name}</div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>{s.distance}</div>
              </div>
              <span style={{ color: '#f59e0b', fontWeight: '600' }}>⭐ {s.rating}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudySpotMap = StudySpotMap;
