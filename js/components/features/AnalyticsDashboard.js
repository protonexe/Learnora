// Analytics Dashboard Component
// Dependencies: Card, AnimatedCard, ProgressBar, Badge, Icon, Button must be loaded before this

const AnalyticsDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState('week');
  const [hoveredBar, setHoveredBar] = React.useState(null);
  const [hoveredSlice, setHoveredSlice] = React.useState(null);
  
  const analytics = window.SampleData && window.SampleData.analytics ? window.SampleData.analytics : {};
  const today = new Date().getDay();
  const weeklyData = window.SampleData && window.SampleData.weeklyStudyData ? window.SampleData.weeklyStudyData : [];
  const maxHours = weeklyData.length > 0 ? Math.max(...weeklyData.map(d => d.hours)) : 1;

  // Calculate total hours for donut chart
  const timeBySubject = analytics.timeBySubject || [];
  const totalSubjectHours = timeBySubject.reduce((sum, s) => sum + (s.hours || 0), 0);

  // Safe render helpers
  const renderWeeklyChart = () => {
    if (!weeklyData || weeklyData.length === 0) {
      return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>No study data available</div>;
    }

    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px', paddingTop: '20px' }}>
        {weeklyData.map((day, idx) => {
          const isToday = (idx === today - 1) || (today === 0 && idx === 6);
          const isHovered = hoveredBar === idx;
          const barHeight = maxHours > 0 ? (day.hours / maxHours) * 160 : 24;
          return (
            <div 
              key={idx} 
              style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '10px',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredBar(idx)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '600', 
                color: isHovered ? 'var(--primary-500)' : 'var(--text-tertiary)',
                transition: 'color 0.2s ease'
              }}>
                {day.hours}h
              </span>
              <div style={{ 
                width: '100%', 
                height: `${Math.max(barHeight, 24)}px`, 
                background: isToday 
                  ? 'var(--gradient-primary)' 
                  : isHovered 
                    ? 'var(--primary-400)' 
                    : 'var(--bg-tertiary)', 
                borderRadius: 'var(--radius-sm)', 
                transition: 'all 0.3s ease', 
                minHeight: '24px',
                position: 'relative',
                overflow: 'hidden',
                transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                transformOrigin: 'bottom'
              }}>
                {(isToday || isHovered) && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--gradient-overlay)'
                  }} />
                )}
              </div>
              <span style={{ 
                fontSize: '12px', 
                color: isToday ? 'var(--primary-500)' : 'var(--text-tertiary)', 
                fontWeight: isToday ? '700' : '500',
                transition: 'all 0.2s ease'
              }}>
                {day.day}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthlyChart = () => {
    const monthlyData = analytics.monthlyStudyData || [];
    
    if (!monthlyData || monthlyData.length === 0) {
      return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>No monthly data available</div>;
    }

    const last6Months = monthlyData.slice(-6);
    const maxHours = Math.max(...last6Months.map(d => d.hours), 1);
    const maxScore = Math.max(...last6Months.map(d => d.quizScore || 0), 100);
    const chartHeight = 180;
    
    return (
      <div style={{ position: 'relative', height: `${chartHeight + 40}px`, paddingTop: '10px' }}>
        {/* Y-axis labels for hours */}
        <div style={{ 
          position: 'absolute', 
          left: 0, 
          top: 0, 
          height: chartHeight, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--text-tertiary)'
        }}>
          <span>{maxHours}h</span>
          <span>{Math.round(maxHours / 2)}h</span>
          <span>0h</span>
        </div>

        {/* Y-axis labels for scores (right side) */}
        <div style={{ 
          position: 'absolute', 
          right: 0, 
          top: 0, 
          height: chartHeight, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--primary-500)'
        }}>
          <span>{maxScore}%</span>
          <span>{Math.round(maxScore / 2)}%</span>
          <span>0%</span>
        </div>

        <svg 
          style={{ 
            position: 'absolute', 
            left: '35px', 
            right: '35px', 
            top: 0, 
            width: 'calc(100% - 70px)', 
            height: chartHeight 
          }}
          viewBox={`0 0 ${last6Months.length * 60} ${chartHeight}`}
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 1, 2].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * (chartHeight / 2)}
              x2={last6Months.length * 60}
              y2={i * (chartHeight / 2)}
              stroke="var(--border-color)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Score line path */}
          <polyline
            fill="none"
            stroke="var(--primary-500)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={last6Months.map((d, i) => {
              const x = i * 60 + 30;
              const y = chartHeight - ((d.quizScore || 0) / maxScore) * chartHeight;
              return `${x},${y}`;
            }).join(' ')}
          />

          {/* Score data points */}
          {last6Months.map((d, i) => {
            const x = i * 60 + 30;
            const y = chartHeight - ((d.quizScore || 0) / maxScore) * chartHeight;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="5"
                fill="var(--primary-500)"
                stroke="var(--bg-primary)"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* Bars container */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: '16px', 
          height: chartHeight,
          marginLeft: '35px',
          marginRight: '35px',
          paddingTop: '10px'
        }}>
          {last6Months.map((month, idx) => {
            const barHeight = maxHours > 0 ? (month.hours / maxHours) * (chartHeight - 20) : 20;
            return (
              <div 
                key={idx} 
                style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '8px'
                }}
              >
                <div style={{ 
                  width: '100%', 
                  height: `${Math.max(barHeight, 20)}px`, 
                  background: 'var(--bg-tertiary)', 
                  borderRadius: 'var(--radius-sm)', 
                  minHeight: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${(month.hours / maxHours) * 100}%`,
                    background: 'var(--gradient-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }} />
                </div>
                <span style={{ 
                  fontSize: '12px', 
                  color: 'var(--text-tertiary)', 
                  fontWeight: '500'
                }}>
                  {month.month}
                </span>
                <span style={{ 
                  fontSize: '10px', 
                  color: 'var(--primary-500)', 
                  fontWeight: '600'
                }}>
                  {month.hours}h
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginTop: '16px',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', background: 'var(--gradient-primary)', borderRadius: '2px' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Study Hours</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '3px', background: 'var(--primary-500)', borderRadius: '2px' }} />
            <span style={{ color: 'var(--primary-500)' }}>Quiz Score</span>
          </div>
        </div>
      </div>
    );
  };

  const renderDonutChart = () => {
    if (!timeBySubject || timeBySubject.length === 0) {
      return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>No subject data available</div>;
    }

    let accumulatedPercentage = 0;

    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {/* Donut Chart */}
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            {timeBySubject.map((subject, idx) => {
              const percentage = totalSubjectHours > 0 ? (subject.hours / totalSubjectHours) * 100 : 0;
              const isHovered = hoveredSlice === idx;
              
              const circumference = 2 * Math.PI * 40;
              const strokeDasharray = circumference * (percentage / 100);
              const strokeDashoffset = -circumference * (accumulatedPercentage / 100);
              
              accumulatedPercentage += percentage;
              
              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={subject.color}
                  strokeWidth={isHovered ? "14" : "12"}
                  strokeDasharray={`${strokeDasharray} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  style={{ 
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    filter: isHovered ? 'brightness(1.1)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredSlice(idx)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              );
            })}
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {hoveredSlice !== null 
                ? timeBySubject[hoveredSlice].hours 
                : totalSubjectHours}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
              {hoveredSlice !== null ? 'hours' : 'total hrs'}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {timeBySubject.map((subject, idx) => {
            const percentage = totalSubjectHours > 0 ? Math.round((subject.hours / totalSubjectHours) * 100) : 0;
            const isHovered = hoveredSlice === idx;
            return (
              <div 
                key={idx}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isHovered ? 'var(--bg-tertiary)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={() => setHoveredSlice(idx)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <span style={{ fontSize: '18px' }}>{subject.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>{subject.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {subject.hours} hrs ({percentage}%)
                  </div>
                </div>
                <div style={{ 
                  width: '4px', 
                  height: '24px', 
                  background: subject.color,
                  borderRadius: '2px'
                }} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Safe data accessors
  const overview = analytics.overview || {};
  const subjectProgress = window.SampleData && window.SampleData.subjectProgress ? window.SampleData.subjectProgress : [];
  const recentQuizScores = analytics.recentQuizScores || [];
  const goals = analytics.goals || [];
  const achievements = analytics.achievements || [];
  const insights = analytics.insights || [];
  const leaderboard = analytics.leaderboard || [];
  const studyByTimeOfDay = analytics.studyByTimeOfDay || [];

  return (
    <div>
      {/* Header Stats Row */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '20px', 
        marginBottom: '32px' 
      }}>
        <StatCardEnhanced 
          label="Total Study Hours" 
          value={(overview.totalStudyHours || 0).toString()} 
          icon="clock" 
          color="#6366f1" 
          change={`+${overview.totalStudyHoursChange || 0}%`}
          sublabel="This month"
          delay={0}
        />
        <StatCardEnhanced 
          label="Current Streak" 
          value={`${overview.currentStreak || 0} days`} 
          icon="zap" 
          color="#f59e0b" 
          change="🔥"
          sublabel="Keep it going!"
          delay={100}
        />
        <StatCardEnhanced 
          label="Avg Quiz Score" 
          value={`${overview.averageScore || 0}%`} 
          icon="target" 
          color="#10b981" 
          change="+3.2%"
          sublabel="Top 15%"
          delay={200}
        />
        <StatCardEnhanced 
          label="Level" 
          value={overview.level || 1} 
          icon="award" 
          color="#f43f5e" 
          change={overview.rank || 'Novice'}
          sublabel={`${overview.xpToNextLevel || 0} XP to next level`}
          delay={300}
        />
      </div>

      {/* Two Column Layout for Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        {/* Weekly Study Chart */}
        <AnimatedCard delay={400}>
          <Card elevated style={{ minHeight: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                  Weekly Study Time
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                  {weeklyData.reduce((sum, d) => sum + (d.hours || 0), 0).toFixed(1)} hours this week
                </p>
              </div>
              <Badge variant="info" size="sm">
                <span style={{ marginRight: '4px' }}>📈</span>
                +23%
              </Badge>
            </div>
            {renderWeeklyChart()}
          </Card>
        </AnimatedCard>

        {/* Time Distribution by Subject - Donut Chart */}
        <AnimatedCard delay={500}>
          <Card elevated style={{ minHeight: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                  Time by Subject
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                  {totalSubjectHours} total hours
                </p>
              </div>
            </div>
            {renderDonutChart()}
          </Card>
        </AnimatedCard>
      </div>

      {/* Subject Progress Section */}
      <AnimatedCard delay={600}>
        <Card elevated style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Subject Progress</h3>
            <Button variant="secondary" size="sm">
              View All Subjects
            </Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {subjectProgress.map((subject, idx) => (
              <div key={idx} style={{ 
                padding: '20px', 
                background: 'var(--bg-tertiary)', 
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{subject.name}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: subject.color }}>
                    {subject.progress}%
                  </span>
                </div>
                <ProgressBar value={subject.progress} color={subject.color} height={8} />
                <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                  {subject.progress >= 80 ? 'Almost done! 🎉' : 
                   subject.progress >= 50 ? 'Good progress 👍' : 
                   'Keep going! 💪'}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </AnimatedCard>

      {/* Recent Quiz Scores */}
      {recentQuizScores.length > 0 && (
        <AnimatedCard delay={700}>
          <Card elevated style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
              Recent Quiz Scores
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentQuizScores.map((quiz, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: quiz.score >= 90 ? '#10b98120' : quiz.score >= 80 ? '#f59e0b20' : '#ef444420',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      color: quiz.score >= 90 ? '#10b981' : quiz.score >= 80 ? '#f59e0b' : '#ef4444'
                    }}>
                      ❓
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                        {quiz.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                        {quiz.subject} • {quiz.questions} questions • {quiz.date}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '20px', 
                      fontWeight: '800',
                      color: quiz.score >= 90 ? '#10b981' : quiz.score >= 80 ? '#f59e0b' : '#ef4444'
                    }}>
                      {quiz.score}%
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {quiz.score >= 90 ? 'Excellent!' : quiz.score >= 80 ? 'Good job' : 'Keep practicing'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedCard>
      )}

      {/* Two Column: Goals & Achievements */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '24px', 
        marginBottom: '32px' 
      }}>
        {/* Goals Section */}
        {goals.length > 0 && (
          <AnimatedCard delay={800}>
            <Card elevated>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
                Weekly Goals
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {goals.map((goal, idx) => {
                  const progressPercent = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
                  const isComplete = goal.current >= goal.target;
                  return (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px', color: goal.color }}>
                            {goal.icon === 'clock' ? '⏰' :
                             goal.icon === 'help-circle' ? '❓' :
                             goal.icon === 'target' ? '🎯' :
                             goal.icon === 'book-open' ? '📖' :
                             goal.icon === 'zap' ? '⚡' :
                             goal.icon === 'award' ? '🏆' :
                             goal.icon === 'star' ? '⭐' :
                             goal.icon === 'trending-up' ? '📈' :
                             goal.icon === 'check-circle' ? '✅' :
                             goal.icon === 'calendar' ? '📅' : '📋'}
                          </span>
                          <span style={{ fontSize: '14px', fontWeight: '500' }}>{goal.title}</span>
                        </div>
                        <span style={{ 
                          fontSize: '13px', 
                          fontWeight: '600',
                          color: isComplete ? '#10b981' : 'var(--text-secondary)'
                        }}>
                          {goal.current}/{goal.target} {goal.unit}
                          {isComplete && ' ✓'}
                        </span>
                      </div>
                      <div style={{ 
                        height: '8px', 
                        background: 'var(--bg-tertiary)', 
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.min(progressPercent, 100)}%`,
                          background: isComplete ? '#10b981' : goal.color,
                          borderRadius: '4px',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </AnimatedCard>
        )}

        {/* Monthly Study Trend Chart */}
        <AnimatedCard delay={900}>
          <Card elevated style={{ minHeight: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                  Monthly Study Trend
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                  Study hours vs quiz scores
                </p>
              </div>
            </div>
            {renderMonthlyChart()}
          </Card>
        </AnimatedCard>
      </div>

      {/* Learning Insights */}
      {insights.length > 0 && (
        <AnimatedCard delay={1000}>
          <Card elevated style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
              Learning Insights
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {insights.map((insight, idx) => (
                <div key={idx} style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-tertiary)',
                  borderLeft: `4px solid ${insight.color}`,
                  display: 'flex',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: `${insight.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '20px',
                    color: insight.color
                  }}>
                    {insight.icon === 'trending-up' ? '📈' :
                     insight.icon === 'alert-circle' ? '⚠️' :
                     insight.icon === 'calendar' ? '📅' :
                     insight.icon === 'lightbulb' ? '💡' :
                     insight.icon === 'clock' ? '⏰' :
                     insight.icon === 'star' ? '⭐' :
                     insight.icon === 'target' ? '🎯' :
                     insight.icon === 'book-open' ? '📖' :
                     insight.icon === 'zap' ? '⚡' :
                     insight.icon === 'check' ? '✅' :
                     insight.icon === 'info' ? 'ℹ️' : '💡'}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                      {insight.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: '1.5' }}>
                      {insight.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedCard>
      )}

      {/* Leaderboard & Study Time Distribution */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '24px' 
      }}>
        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <AnimatedCard delay={1100}>
            <Card elevated>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Leaderboard</h3>
                <Badge variant="primary" size="sm">This Week</Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {leaderboard.map((user, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    background: user.isUser ? 'var(--primary-100)' : 'var(--bg-tertiary)',
                    border: user.isUser ? '2px solid var(--primary-300)' : '1px solid var(--border-color)'
                  }}>
                    <div style={{
                      width: '28px',
                      fontSize: '16px',
                      fontWeight: '800',
                      textAlign: 'center',
                      color: idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : idx === 2 ? '#b45309' : 'var(--text-tertiary)'
                    }}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : user.rank}
                    </div>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: user.isUser ? 'var(--gradient-primary)' : 'var(--primary-200)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: user.isUser ? 'white' : 'var(--primary-700)'
                    }}>
                      {user.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '600' }}>
                        {user.name} {user.isUser && '(You)'}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                        {user.streak} day streak 🔥
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-500)' }}>
                      {user.xp.toLocaleString()} XP
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedCard>
        )}

        {/* Study Time by Period */}
        {studyByTimeOfDay.length > 0 && (
          <AnimatedCard delay={1200}>
            <Card elevated>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
                When You Study
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {studyByTimeOfDay.map((period, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px', color: 'var(--text-tertiary)' }}>
                          {period.period === 'Morning' ? '🌅' :
                           period.period === 'Afternoon' ? '☀️' :
                           period.period === 'Evening' ? '🌇' : '🌙'}
                        </span>
                        {period.period}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                        {period.hours} hrs ({period.percentage}%)
                      </span>
                    </div>
                    <div style={{ 
                      height: '32px', 
                      background: 'var(--bg-tertiary)', 
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      display: 'flex'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${period.percentage}%`,
                        background: idx === 0 ? '#f59e0b' : idx === 1 ? '#6366f1' : idx === 2 ? '#8b5cf6' : '#0ea5e9',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '12px',
                        transition: 'width 0.5s ease'
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>
                          {period.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedCard>
        )}
      </div>
    </div>
  );
};

// Enhanced Stat Card Component
const StatCardEnhanced = ({ icon, label, value, change, color, sublabel, delay }) => {
  return (
    <AnimatedCard delay={delay}>
      <Card hover elevated style={{ 
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
        padding: '24px'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          background: `radial-gradient(circle, ${color}20, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.6,
        }} />
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between', 
          marginBottom: '16px', 
          position: 'relative' 
        }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: 'var(--radius-lg)', 
            background: `linear-gradient(135deg, ${color}20, ${color}10)`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '26px',
            color: color
          }}>
            {icon === 'clock' ? '⏰' :
             icon === 'zap' ? '⚡' :
             icon === 'target' ? '🎯' :
             icon === 'award' ? '🏆' :
             icon === 'trending-up' ? '📈' :
             icon === 'star' ? '⭐' :
             icon === 'book-open' ? '📖' :
             icon === 'calendar' ? '📅' :
             icon === 'check-circle' ? '✅' :
             icon === 'flame' ? '🔥' : '📊'}
          </div>
          <Badge variant="success" size="sm" style={{ background: `${color}20`, color: color }}>
            {change}
          </Badge>
        </div>
        
        <div style={{ 
          fontSize: '36px', 
          fontWeight: '800', 
          marginBottom: '4px', 
          letterSpacing: '-0.03em', 
          position: 'relative',
          background: `linear-gradient(135deg, ${color}, ${color}aa)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {value}
        </div>
        
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '4px' }}>
          {label}
        </div>
        
        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          {sublabel}
        </div>
      </Card>
    </AnimatedCard>
  );
};

window.AnalyticsDashboard = AnalyticsDashboard;
window.StatCardEnhanced = StatCardEnhanced;