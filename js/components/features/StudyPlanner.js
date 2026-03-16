const StudyPlanner = ({ onBack, showToast }) => {
  const [plans, setPlans] = React.useState(() => JSON.parse(localStorage.getItem('study-plans')) || []);
  const [newPlan, setNewPlan] = React.useState({ subject: '', topic: '', duration: 30, date: '', priority: 'medium' });

  const addPlan = () => {
    if (!newPlan.subject || !newPlan.date) {
      showToast?.('Please fill in subject and date', 'error');
      return;
    }
    const updated = [...plans, { ...newPlan, id: Date.now(), completed: false }];
    setPlans(updated);
    localStorage.setItem('study-plans', JSON.stringify(updated));
    setNewPlan({ subject: '', topic: '', duration: 30, date: '', priority: 'medium' });
    showToast?.('Study plan added!', 'success');
  };

  const toggleComplete = (id) => {
    const updated = plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p);
    setPlans(updated);
    localStorage.setItem('study-plans', JSON.stringify(updated));
  };

  const deletePlan = (id) => {
    const updated = plans.filter(p => p.id !== id);
    setPlans(updated);
    localStorage.setItem('study-plans', JSON.stringify(updated));
  };

  const groupedPlans = plans.reduce((acc, plan) => {
    const date = plan.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(plan);
    return acc;
  }, {});

  const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Planner</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="add-plan-form" style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '15px' }}>Add Study Plan</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Subject"
              value={newPlan.subject}
              onChange={(e) => setNewPlan({ ...newPlan, subject: e.target.value })}
              style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb' }}
            />
            <input
              type="text"
              placeholder="Topic"
              value={newPlan.topic}
              onChange={(e) => setNewPlan({ ...newPlan, topic: e.target.value })}
              style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            <input
              type="number"
              placeholder="Duration (min)"
              value={newPlan.duration}
              onChange={(e) => setNewPlan({ ...newPlan, duration: parseInt(e.target.value) })}
              style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb' }}
            />
            <input
              type="date"
              value={newPlan.date}
              onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
              style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb' }}
            />
            <select
              value={newPlan.priority}
              onChange={(e) => setNewPlan({ ...newPlan, priority: e.target.value })}
              style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb' }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            onClick={addPlan}
            style={{ width: '100%', padding: '12px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}
          >
            Add Plan
          </button>
        </div>

        {Object.keys(groupedPlans).length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📋</div>
            <p>No study plans yet. Add one above!</p>
          </div>
        )}

        {Object.entries(groupedPlans).sort(([a], [b]) => a.localeCompare(b)).map(([date, dayPlans]) => (
          <div key={date} style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#374151', marginBottom: '10px', fontSize: '16px' }}>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h3>
            {dayPlans.map(plan => (
              <div key={plan.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <input type="checkbox" checked={plan.completed} onChange={() => toggleComplete(plan.id)} style={{ width: '20px', height: '20px' }} />
                <div style={{ flex: 1, textDecoration: plan.completed ? 'line-through' : 'none', opacity: plan.completed ? 0.6 : 1 }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{plan.subject}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>{plan.topic} • {plan.duration}min</div>
                </div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: priorityColors[plan.priority] }} />
                <button onClick={() => deletePlan(plan.id)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '18px' }}>×</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

window.StudyPlanner = StudyPlanner;
