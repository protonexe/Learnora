const AnalyticsView = () => {
  const [timeRange, setTimeRange] = React.useState('week');
  const analytics = window.LearnoraDB && window.LearnoraDB.data.analytics ? window.LearnoraDB.data.analytics : (window.SampleData && window.SampleData.analytics ? window.SampleData.analytics : {});
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const timeRanges = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <>
      {/* Header Section */}
      <AnimatedCard delay={50}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px',
          maxWidth: '100%'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '6px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0
              }}>
                📊
              </div>
              <div style={{ minWidth: 0 }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em' }}>
                  Analytics
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Track your learning progress
                </p>
              </div>
            </div>
          </div>

          {/* Time Range Selector */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-lg)',
            padding: '3px',
            border: '1px solid var(--border-color)',
            flexShrink: 0,
            overflowX: 'auto',
            maxWidth: '100%'
          }}>
            {timeRanges.map((range) => (
              <button
                type="button"
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--border-strong)',
                  background: timeRange === range.value ? 'var(--bg-secondary)' : 'transparent',
                  color: timeRange === range.value ? 'var(--primary-500)' : 'var(--text-secondary)',
                  fontSize: '11px',
                  fontWeight: timeRange === range.value ? '600' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: timeRange === range.value ? 'var(--shadow-sm)' : 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Quick Stats Banner */}
      <AnimatedCard delay={100}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '16px',
          padding: '12px',
          background: isDark 
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))'
            : 'var(--gradient-mesh), linear-gradient(135deg, var(--primary-50), var(--primary-100))',
          borderRadius: 'var(--radius-xl)',
          border: isDark ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid var(--primary-200)',
          maxWidth: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '14px' }}>⚡</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: isDark ? 'var(--text-primary)' : 'var(--primary-800)' }}>
              {analytics.overview && analytics.overview.currentStreak} day streak
            </span>
          </div>
          <div style={{ width: '1px', height: '16px', background: isDark ? 'rgba(99, 102, 241, 0.3)' : 'var(--primary-200)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '14px' }}>🏆</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: isDark ? 'var(--text-primary)' : 'var(--primary-800)' }}>
              {analytics.overview && analytics.overview.totalXP && analytics.overview.totalXP.toLocaleString()} XP
            </span>
          </div>
          <div style={{ width: '1px', height: '16px', background: isDark ? 'rgba(99, 102, 241, 0.3)' : 'var(--primary-200)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '14px' }}>✅</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: isDark ? 'var(--text-primary)' : 'var(--primary-800)' }}>
              {analytics.overview && analytics.overview.quizPassRate}% pass rate
            </span>
          </div>
          <div style={{ width: '1px', height: '16px', background: isDark ? 'rgba(99, 102, 241, 0.3)' : 'var(--primary-200)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '14px' }}>🎴</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: isDark ? 'var(--text-primary)' : 'var(--primary-800)' }}>
              {analytics.overview && analytics.overview.flashcardsReviewed} cards
            </span>
          </div>
        </div>
      </AnimatedCard>

      {/* Main Dashboard */}
      <AnalyticsDashboard />
    </>
  );
};

window.AnalyticsView = AnalyticsView;