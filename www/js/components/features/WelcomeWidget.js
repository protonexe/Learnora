const WelcomeWidget = ({ user, streak, showToast, onNavigate }) => {
  const [quote, setQuote] = React.useState('');
  
  const quotes = [
    { text: "Every expert was once a beginner.", author: "Helen Hayes" },
    { text: "Education is the passport to the future.", author: "Malcolm X" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "Success is no accident. It is hard work.", author: "Pelé" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
  ];

  React.useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const upcomingTasks = [
    { icon: '📝', title: 'Math Quiz', time: 'Tomorrow', urgent: true },
    { icon: '📋', title: 'History Essay', time: 'In 2 days', urgent: false },
    { icon: '🔬', title: 'Physics Lab', time: 'In 3 days', urgent: false },
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))', 
      borderRadius: '16px', 
      padding: '20px', 
      marginBottom: '20px',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '13px', opacity: 0.9, margin: '0 0 4px 0' }}>
            Welcome back! 👋
          </p>
          <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 8px 0' }}>
            {user?.name || 'Student'}!
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>
              🔥 {streak?.current || 0} day streak
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
        <p style={{ fontSize: '12px', margin: '0 0 4px 0', opacity: 0.9 }}>💭 "{quote.text}"</p>
        <p style={{ fontSize: '11px', margin: 0, opacity: 0.7, textAlign: 'right' }}>- {quote.author}</p>
      </div>

      {upcomingTasks.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <p style={{ fontSize: '12px', fontWeight: '600', margin: '0 0 8px 0', opacity: 0.9 }}>📅 Upcoming:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {upcomingTasks.map((task, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '16px' }}>{task.icon}</span>
                <span style={{ flex: 1, fontSize: '13px' }}>{task.title}</span>
                <span style={{ fontSize: '11px', opacity: 0.8, color: task.urgent ? '#ff6b6b' : 'inherit' }}>{task.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

window.WelcomeWidget = WelcomeWidget;
