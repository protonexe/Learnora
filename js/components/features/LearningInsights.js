const LearningInsights = ({ onClose }) => {
  const [timeRange, setTimeRange] = React.useState('week');
  
  const getInsightData = () => {
    const data = {
      week: {
        totalHours: 24.5,
        avgPerDay: 3.5,
        streak: 5,
        topSubject: 'Mathematics',
        peakHour: '2PM - 4PM',
        completionRate: 78,
        sessions: 14,
        improvement: 12
      },
      month: {
        totalHours: 98,
        avgPerDay: 3.3,
        streak: 12,
        topSubject: 'Physics',
        peakHour: '3PM - 5PM',
        completionRate: 82,
        sessions: 45,
        improvement: 18
      },
      year: {
        totalHours: 520,
        avgPerDay: 3.1,
        streak: 45,
        topSubject: 'Chemistry',
        peakHour: '2PM - 4PM',
        completionRate: 85,
        sessions: 234,
        improvement: 25
      }
    };
    return data[timeRange];
  };

  const insights = getInsightData();

  const studyData = {
    week: [
      { day: 'Mon', hours: 3.2 },
      { day: 'Tue', hours: 4.1 },
      { day: 'Wed', hours: 2.8 },
      { day: 'Thu', hours: 3.5 },
      { day: 'Fri', hours: 4.2 },
      { day: 'Sat', hours: 2.5 },
      { day: 'Sun', hours: 4.0 },
    ],
    month: [
      { day: 'Week 1', hours: 22 },
      { day: 'Week 2', hours: 25 },
      { day: 'Week 3', hours: 28 },
      { day: 'Week 4', hours: 23 },
    ]
  };

  const subjectData = [
    { subject: 'Mathematics', hours: 8.5, color: '#f43f5e', progress: 85 },
    { subject: 'Physics', hours: 6.2, color: '#14b8a6', progress: 72 },
    { subject: 'Chemistry', hours: 4.8, color: '#0ea5e9', progress: 68 },
    { subject: 'History', hours: 3.2, color: '#8b5cf6', progress: 55 },
    { subject: 'English', hours: 1.8, color: '#f59e0b', progress: 40 },
  ];

  const maxHours = Math.max(...studyData.week.map(d => d.hours));

  const getGradeColor = (rate) => {
    if (rate >= 90) return '#10b981';
    if (rate >= 80) return '#14b8a6';
    if (rate >= 70) return '#f59e0b';
    return '#f43f5e';
  };

  const getGrade = (rate) => {
    if (rate >= 90) return 'A';
    if (rate >= 80) return 'B';
    if (rate >= 70) return 'C';
    if (rate >= 60) return 'D';
    return 'F';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      overflow: 'auto',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📊 Learning Insights</h2>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            cursor: 'pointer',
            fontSize: 13
          }}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12,
          marginBottom: 24
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--primary)' }}>{insights.totalHours}h</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Total Study Time</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>{insights.streak}🔥</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Current Streak</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#f59e0b' }}>{insights.completionRate}%</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Completion Rate</div>
          </div>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 16,
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#8b5cf6' }}>+{insights.improvement}%</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Improvement</div>
          </div>
        </div>

        {/* Grade Card */}
        <div style={{
          background: 'linear-gradient(135deg, ' + getGradeColor(insights.completionRate) + '20 0%, ' + getGradeColor(insights.completionRate) + '10 100%)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
          border: '1px solid ' + getGradeColor(insights.completionRate),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Overall Grade</div>
            <div style={{ fontSize: 48, fontWeight: 700, color: getGradeColor(insights.completionRate) }}>
              {getGrade(insights.completionRate)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>
              Based on {insights.sessions} study sessions
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Peak Study Time</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{insights.peakHour}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8 }}>Top Subject</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--primary)' }}>{insights.topSubject}</div>
          </div>
        </div>

        {/* Study Hours Chart */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>Study Hours This Week</h3>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
            height: 150
          }}>
            {studyData.week.map((day, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '100%',
                  background: 'var(--primary)',
                  borderRadius: '4px 4px 0 0',
                  height: (day.hours / maxHours) * 120,
                  minHeight: day.hours > 0 ? 20 : 0,
                  transition: 'height 0.3s ease'
                }} />
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8 }}>{day.day}</div>
                <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{day.hours}h</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Breakdown */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>Subject Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subjectData.map((subject, idx) => (
              <div key={idx}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6
                }}>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{subject.subject}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{subject.hours}h</span>
                </div>
                <div style={{
                  height: 8,
                  background: 'var(--bg)',
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: subject.progress + '%',
                    background: subject.color,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: 12,
          padding: 20,
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 16 }}>💡 Insights & Recommendations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              padding: 12,
              background: '#10b98115',
              borderRadius: 8,
              borderLeft: '3px solid #10b981'
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#10b981', marginBottom: 4 }}>Great Progress!</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                You've improved by {insights.improvement}% compared to last {timeRange}.
              </div>
            </div>
            <div style={{
              padding: 12,
              background: '#f59e0b15',
              borderRadius: 8,
              borderLeft: '3px solid #f59e0b'
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b', marginBottom: 4 }}>Tip: Focus Time</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                You're most productive between {insights.peakHour}. Schedule challenging subjects during this time.
              </div>
            </div>
            <div style={{
              padding: 12,
              background: '#0ea5e915',
              borderRadius: 8,
              borderLeft: '3px solid #0ea5e9'
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0ea5e9', marginBottom: 4 }}>Subject Recommendation</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Consider spending more time on {subjectData[subjectData.length - 1].subject} to improve your overall balance.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
