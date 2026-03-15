const AchievementsView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [achievements, setAchievements] = React.useState([]);
  const [userStats, setUserStats] = React.useState({ xp: 0, level: 1, streak: 0, badges: [] });

  React.useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    if (window.Database) {
      const db = window.Database;
      const defaultAchievements = [
        { id: 'first_course', name: 'First Steps', description: 'Complete your first course', icon: '🎯', xp: 100, unlocked: false },
        { id: 'quiz_master', name: 'Quiz Master', description: 'Complete 10 quizzes', icon: '🏆', xp: 200, unlocked: false },
        { id: 'streak_7', name: 'Week Warrior', description: 'Study for 7 days in a row', icon: '🔥', xp: 150, unlocked: false },
        { id: 'streak_30', name: 'Monthly Champion', description: 'Study for 30 days in a row', icon: '⭐', xp: 500, unlocked: false },
        { id: 'flashcard_pro', name: 'Flashcard Pro', description: 'Review 100 flashcards', icon: '🧠', xp: 150, unlocked: false },
        { id: 'note_taker', name: 'Note Taker', description: 'Create 20 notes', icon: '📝', xp: 100, unlocked: false },
        { id: 'perfectionist', name: 'Perfectionist', description: 'Get 100% on a quiz', icon: '💯', xp: 200, unlocked: false },
        { id: 'early_bird', name: 'Early Bird', description: 'Study before 7am', icon: '🌅', xp: 50, unlocked: false },
      ];
      setAchievements(defaultAchievements);
      
      const xp = parseInt(localStorage.getItem('learnora-xp') || '0');
      const level = Math.floor(xp / 500) + 1;
      const streak = parseInt(localStorage.getItem('learnora-streak-current') || '0');
      setUserStats({ xp, level, streak, badges: [] });
    }
  };

  const getLevelProgress = () => {
    const xpForLevel = userStats.level * 500;
    const prevLevelXp = (userStats.level - 1) * 500;
    return ((userStats.xp - prevLevelXp) / (xpForLevel - prevLevelXp)) * 100;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Achievements</h1>
        <div style={{ width: '60px' }} />
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))', borderRadius: '16px', padding: '24px', marginBottom: '24px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '700' }}>
            {userStats.level}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Level {userStats.level}</h2>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>{userStats.xp} / {userStats.level * 500} XP</p>
          </div>
        </div>
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${getLevelProgress()}%`, background: '#fff', borderRadius: '6px', transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
          <span>🔥 {userStats.streak} day streak</span>
          <span>⭐ {achievements.filter(a => a.unlocked).length} / {achievements.length} achievements</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
        {achievements.map((achievement, idx) => (
          <div key={achievement.id} style={{ background: achievement.unlocked ? 'var(--bg-secondary)' : 'var(--bg-tertiary)', border: `1px solid ${achievement.unlocked ? 'var(--primary-500)' : 'var(--border-color)'}`, borderRadius: '12px', padding: '20px', opacity: achievement.unlocked ? 1 : 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: achievement.unlocked ? 'var(--primary-500)' : 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                {achievement.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{achievement.name}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>+{achievement.xp} XP</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{achievement.description}</p>
            {achievement.unlocked && (
              <div style={{ marginTop: '12px', padding: '6px 12px', background: 'var(--success)', color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>Unlocked!</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

window.AchievementsView = AchievementsView;
