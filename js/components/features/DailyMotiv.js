const DailyMotiv = ({ onBack }) => {
  const msgs = [
    { icon: '💪', text: 'You got this!' },
    { icon: '🔥', text: 'Keep pushing forward!' },
    { icon: '⭐', text: 'Believe in yourself!' },
    { icon: '🌟', text: 'Every step counts!' }
  ];
  const [idx, setIdx] = React.useState(Math.floor(Math.random() * msgs.length));

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Daily Motivation</h1>
      </header>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>{msgs[idx].icon}</div>
          <div style={{ fontSize: '28px', fontWeight: '600', color: '#1f2937' }}>{msgs[idx].text}</div>
        </div>
      </div>
    </div>
  );
};

window.DailyMotiv = DailyMotiv;
