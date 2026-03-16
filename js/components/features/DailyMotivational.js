const DailyMotivational = ({ onClose }) => {
  const [streak, setStreak] = React.useState(7);
  const [showFullQuote, setShowFullQuote] = React.useState(false);
  const [userName] = React.useState('Student');
  
  const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "motivation" },
    { text: "Education is the passport to the future.", author: "Malcolm X", category: "education" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "work" },
    { text: "Success is not final, failure is not fatal.", author: "Winston Churchill", category: "success" },
    { text: "The future belongs to those who believe in their dreams.", author: "Eleanor Roosevelt", category: "dreams" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "belief" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "motivation" },
    { text: "Learning is not attained by chance, it must be sought.", author: "Abigail Adams", category: "education" },
  ];

  const todaysQuote = quotes[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % quotes.length];

  const achievements = [
    { icon: '🔥', label: '7 Day Streak', achieved: true },
    { icon: '📚', label: '5 Courses', achieved: true },
    { icon: '✍️', label: '10 Quizzes', achieved: true },
    { icon: '🏆', label: 'First Place', achieved: false },
    { icon: '💯', label: '100 Points', achieved: true },
    { icon: '⭐', label: '5 Stars', achieved: false },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.3s ease'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button onClick={onClose} style={{
          padding: '10px 16px',
          borderRadius: 8,
          border: 'none',
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          cursor: 'pointer',
          fontSize: 14
        }}>
          ← Back
        </button>
      </div>

      <div style={{ padding: 20, maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        {/* Greeting */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{getGreeting()},</span>
        </div>
        <h1 style={{ margin: '0 0 20px 0', fontSize: 32, color: 'white', fontWeight: 700 }}>
          {userName}! 🌟
        </h1>

        {/* Streak */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔥</div>
          <div style={{ fontSize: 36, fontWeight: 700, color: 'white' }}>{streak} Day Streak</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Keep it going!</div>
        </div>

        {/* Quote Card */}
        <div
          onClick={() => setShowFullQuote(!showFullQuote)}
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            border: '1px solid rgba(255,255,255,0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 16 }}>💬</div>
          <p style={{
            fontSize: 18,
            color: 'white',
            lineHeight: 1.6,
            margin: '0 0 16px 0',
            fontStyle: 'italic'
          }}>
            "{todaysQuote.text}"
          </p>
          <div style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.6)'
          }}>
            — {todaysQuote.author}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
          marginBottom: 24
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}>4.5h</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Today's Study</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>3</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Tasks Done</div>
          </div>
        </div>

        {/* Achievements Preview */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: 20,
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16, color: 'white' }}>Today's Goals</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {achievements.slice(0, 4).map((achievement, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: achievement.achieved ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  margin: '0 auto 8px',
                  opacity: achievement.achieved ? 1 : 0.4
                }}>
                  {achievement.icon}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div style={{
          marginTop: 24,
          padding: 16,
          background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
          borderRadius: 12,
          color: '#1e1b4b',
          fontWeight: 600
        }}>
          🎯 You're doing amazing! Keep up the great work!
        </div>
      </div>
    </div>
  );
};
