const StudyChecklist = ({ onBack, showToast }) => {
  const [checklists, setChecklists] = React.useState(() => JSON.parse(localStorage.getItem('study-checklists')) || {
    'Before Exam': [
      { id: 1, text: 'Review all notes', done: true },
      { id: 2, text: 'Complete practice problems', done: true },
      { id: 3, text: 'Get adequate sleep', done: false },
      { id: 4, text: 'Gather supplies', done: false }
    ],
    'Daily Routine': [
      { id: 1, text: 'Morning review (15 min)', done: false },
      { id: 2, text: 'Pomodoro session 1', done: false },
      { id: 3, text: 'Pomodoro session 2', done: false },
      { id: 4, text: 'Evening review (15 min)', done: false }
    ]
  });

  const [activeList, setActiveList] = React.useState('Before Exam');

  const toggleItem = (listName, id) => {
    const updated = {
      ...checklists,
      [listName]: checklists[listName].map(item => item.id === id ? { ...item, done: !item.done } : item)
    };
    setChecklists(updated);
    localStorage.setItem('study-checklists', JSON.stringify(updated));
  };

  const addChecklist = () => {
    const name = prompt('Checklist name:');
    if (name && !checklists[name]) {
      const updated = { ...checklists, [name]: [] };
      setChecklists(updated);
      localStorage.setItem('study-checklists', JSON.stringify(updated));
      setActiveList(name);
    }
  };

  const addItem = () => {
    const text = prompt('Item:');
    if (text) {
      const updated = { ...checklists, [activeList]: [...checklists[activeList], { id: Date.now(), text, done: false }] };
      setChecklists(updated);
      localStorage.setItem('study-checklists', JSON.stringify(updated));
    }
  };

  const completed = checklists[activeList]?.filter(i => i.done).length || 0;
  const total = checklists[activeList]?.length || 0;

  return (
    <div className="view-container">
      <header className="view-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Study Checklist</h1>
      </header>

      <div style={{ padding: '20px' }}>
        <div className="tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto' }}>
          {Object.keys(checklists).map(name => (
            <button key={name} onClick={() => setActiveList(name)} style={{ padding: '10px 20px', border: 'none', borderRadius: '25px', background: activeList === name ? '#6366f1' : '#e5e7eb', color: activeList === name ? 'white' : '#6b7280', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: '600' }}>
              {name}
            </button>
          ))}
          <button onClick={addChecklist} style={{ padding: '10px 20px', border: '2px dashed #d1d5db', borderRadius: '25px', background: 'transparent', color: '#9ca3af', cursor: 'pointer' }}>+</button>
        </div>

        <div className="progress" style={{ background: '#f3f4f6', padding: '15px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ flex: 1, background: '#e5e7eb', borderRadius: '8px', height: '10px' }}>
            <div style={{ width: `${(completed/total)*100 || 0}%`, height: '100%', background: '#10b981', borderRadius: '8px', transition: 'width 0.3s' }} />
          </div>
          <span style={{ fontWeight: '600', color: '#10b981' }}>{completed}/{total}</span>
        </div>

        <button onClick={addItem} style={{ width: '100%', padding: '12px', background: '#1f2937', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', marginBottom: '15px', fontWeight: '600' }}>
          + Add Item
        </button>

        <div style={{ display: 'grid', gap: '10px' }}>
          {checklists[activeList]?.map(item => (
            <div key={item.id} onClick={() => toggleItem(activeList, item.id)} style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textDecoration: item.done ? 'line-through' : 'none', opacity: item.done ? 0.6 : 1 }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', border: item.done ? 'none' : '2px solid #d1d5db', background: item.done ? '#10b981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                {item.done && '✓'}
              </div>
              <span style={{ color: '#1f2937' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.StudyChecklist = StudyChecklist;
