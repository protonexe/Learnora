const LearningGoals = ({ showToast }) => {
  const [goals, setGoals] = React.useState([]);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newGoal, setNewGoal] = React.useState({ title: '', target: 10, unit: 'hours', deadline: '' });
  const isMobile = window.innerWidth <= 768;

  React.useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    const saved = localStorage.getItem('learnora-learning-goals') || '[]';
    setGoals(JSON.parse(saved));
  };

  const addGoal = () => {
    if (!newGoal.title.trim()) {
      showToast?.('Please enter a goal title', 'error');
      return;
    }

    const goal = {
      id: Date.now(),
      ...newGoal,
      progress: 0,
      createdAt: Date.now(),
      completed: false
    };

    const updated = [...goals, goal];
    setGoals(updated);
    localStorage.setItem('learnora-learning-goals', JSON.stringify(updated));
    setShowAddModal(false);
    setNewGoal({ title: '', target: 10, unit: 'hours', deadline: '' });
    showToast?.('Goal added!', 'success');
  };

  const updateProgress = (goalId, progress) => {
    const updated = goals.map(g => {
      if (g.id === goalId) {
        const completed = progress >= g.target;
        return { ...g, progress, completed };
      }
      return g;
    });
    setGoals(updated);
    localStorage.setItem('learnora-learning-goals', JSON.stringify(updated));
  };

  const deleteGoal = (goalId) => {
    const updated = goals.filter(g => g.id !== goalId);
    setGoals(updated);
    localStorage.setItem('learnora-learning-goals', JSON.stringify(updated));
    showToast?.('Goal deleted', 'info');
  };

  const getProgressPercent = (goal) => {
    return Math.min(100, Math.round((goal.progress / goal.target) * 100));
  };

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const goalTypes = [
    { id: 'hours', label: 'Study Hours', icon: '⏰' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'quizzes', label: 'Quizzes', icon: '📝' },
    { id: 'streak', label: 'Day Streak', icon: '🔥' },
  ];

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: isMobile ? '14px' : '18px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <h3 style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '700',
          margin: 0,
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>🎯</span>
          Learning Goals
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '6px 12px',
            background: 'var(--primary-500)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Icon name="plus" size={14} />
          Add
        </button>
      </div>

      {goals.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-secondary)' }}>
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '10px' }}>🎯</span>
          <p style={{ fontSize: '13px', margin: '0 0 10px 0' }}>No goals set yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '8px 16px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--text-primary)'
            }}
          >
            Set your first goal
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {goals.map((goal, idx) => {
            const percent = getProgressPercent(goal);
            const daysRemaining = getDaysRemaining(goal.deadline);
            const isOverdue = daysRemaining !== null && daysRemaining < 0;
            
            return (
              <div key={goal.id || idx} style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                      {goal.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                      {goal.progress} / {goal.target} {goal.unit}
                      {daysRemaining !== null && (
                        <span style={{ color: isOverdue ? 'var(--danger)' : 'var(--text-secondary)' }}>
                          • {isOverdue ? 'Overdue' : `${daysRemaining} days left`}
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '4px',
                      cursor: 'pointer',
                      color: 'var(--text-tertiary)'
                    }}
                  >
                    <Icon name="trash-2" size={14} />
                  </button>
                </div>
                
                <div style={{ position: 'relative', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${percent}%`,
                    background: goal.completed ? 'var(--success)' : 'var(--primary-500)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: goal.completed ? 'var(--success)' : 'var(--primary-500)' }}>
                    {percent}% {goal.completed && '✓ Complete'}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={goal.target}
                    value={goal.progress}
                    onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                    style={{ width: '100px', accentColor: 'var(--primary-500)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowAddModal(false)}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: '16px',
            padding: '24px',
            width: '90%',
            maxWidth: '400px'
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0' }}>Add New Goal</h3>
            
            <input
              type="text"
              placeholder="Goal title..."
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                fontSize: '14px'
              }}
            />
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input
                type="number"
                placeholder="Target"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  fontSize: '14px'
                }}
              />
              <select
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  fontSize: '14px'
                }}
              >
                {goalTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                fontSize: '14px'
              }}
            />
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--bg-tertiary)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={addGoal}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--primary-500)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#fff'
                }}
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.LearningGoals = LearningGoals;
