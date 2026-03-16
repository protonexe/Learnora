const MotivationalBanner = ({ onBack }) => {
  const banners = [
    { text: 'Every expert was once a beginner.', bg: '#6366f1' },
    { text: 'Small steps lead to big changes.', bg: '#10b981' },
    { text: 'Your future self will thank you.', bg: '#f59e0b' },
    { text: 'Focus on progress, not perfection.', bg: '#ef4444' }
  ];
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setCurrent((current + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, [current]);

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Motivation</h1>
      </header>
      <div style={{ padding: '20px' }}>
        <div style={{ background: banners[current].bg, padding: '50px', borderRadius: '25px', color: 'white', textAlign: 'center', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '28px', fontWeight: '600', lineHeight: '1.4' }}>{banners[current].text}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          {banners.map((_, i) => (
            <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === current ? '#6366f1' : '#e5e7eb' }} />
          ))}
        </div>
      </div>
    </div>
  );
};

window.MotivationalBanner = MotivationalBanner;
