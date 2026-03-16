const WeeklyPlanner = ({ onClose }) => {
  const [currentWeek, setCurrentWeek] = React.useState(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  });
  const [tasks, setTasks] = React.useState(() => {
    const saved = localStorage.getItem('learnora-weekly-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [newTask, setNewTask] = React.useState({ title: '', subject: '', day: 0, time: '09:00' });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'English', 'General'];
  const hours = Array.from({ length: 14 }, (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('learnora-weekly-tasks', JSON.stringify(newTasks));
  };

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeek);
      day.setDate(currentWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const addTask = () => {
    if (!newTask.title) return;
    
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    saveTasks([...tasks, task]);
    setNewTask({ title: '', subject: '', day: 0, time: '09:00' });
    setShowAddTask(false);
  };

  const toggleTask = (id) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const getTasksForSlot = (dayIndex, time) => {
    const dayDate = weekDays[dayIndex].toDateString();
    return tasks.filter(t => {
      const taskDate = new Date(t.createdAt).toDateString();
      return taskDate === dayDate && t.time === time && t.day === dayIndex;
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-primary)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.2s ease'
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onClose} style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}>
            ← Back
          </button>
          <h2 style={{ margin: 0, fontSize: 20 }}>📅 Weekly Planner</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {completedCount}/{totalCount} tasks
          </span>
          <button
            onClick={() => setShowAddTask(true)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600
            }}
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={() => navigateWeek(-1)}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          ← Prev
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
          {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
        </span>
        <button
          onClick={() => navigateWeek(1)}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid var(--border-color)',
            background: 'var(--bg)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          Next →
        </button>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            padding: 20,
            width: 320,
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Add Task</h3>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task title..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                fontSize: 14,
                marginBottom: 12
              }}
            />
            <select
              value={newTask.subject}
              onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                fontSize: 14,
                marginBottom: 12
              }}
            >
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <select
                value={newTask.day}
                onChange={(e) => setNewTask({ ...newTask, day: parseInt(e.target.value) })}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: 14
                }}
              >
                {weekDays.map((day, idx) => (
                  <option key={idx} value={idx}>{day.toLocaleDateString('en-US', { weekday: 'short' })}</option>
                ))}
              </select>
              <select
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  fontSize: 14
                }}
              >
                {hours.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={addTask}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'flex', minWidth: 800 }}>
          {/* Time Column */}
          <div style={{ width: 60, borderRight: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
            <div style={{ height: 48, borderBottom: '1px solid var(--border-color)' }} />
            {hours.map(h => (
              <div key={h} style={{
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: 'var(--text-tertiary)',
                borderBottom: '1px solid var(--border-color)'
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* Day Columns */}
          <div style={{ flex: 1, display: 'flex' }}>
            {weekDays.map((day, dayIdx) => (
              <div
                key={dayIdx}
                style={{
                  flex: 1,
                  borderRight: '1px solid var(--border-color)',
                  minWidth: 100
                }}
              >
                {/* Day Header */}
                <div style={{
                  height: 48,
                  padding: '8px 4px',
                  borderBottom: '1px solid var(--border-color)',
                  background: isToday(day) ? 'var(--primary)' + '15' : 'var(--bg-secondary)',
                  textAlign: 'center',
                  borderLeft: isToday(day) ? '3px solid var(--primary)' : 'none'
                }}>
                  <div style={{ fontSize: 11, color: isToday(day) ? 'var(--primary)' : 'var(--text-secondary)' }}>
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: isToday(day) ? 'var(--primary)' : 'var(--text-primary)' }}>
                    {day.getDate()}
                  </div>
                </div>

                {/* Time Slots */}
                {hours.map(h => {
                  const slotTasks = getTasksForSlot(dayIdx, h);
                  return (
                    <div
                      key={h}
                      style={{
                        height: 40,
                        borderBottom: '1px solid var(--border-color)',
                        padding: 2,
                        position: 'relative'
                      }}
                    >
                      {slotTasks.map(task => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          style={{
                            background: task.completed ? '#10b981' : 'var(--primary)',
                            borderRadius: 4,
                            padding: '2px 6px',
                            fontSize: 10,
                            color: 'white',
                            cursor: 'pointer',
                            marginBottom: 2,
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.7 : 1
                          }}
                        >
                          {task.title}
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                            style={{
                              marginLeft: 4,
                              background: 'none',
                              border: 'none',
                              color: 'white',
                              cursor: 'pointer',
                              padding: 0,
                              fontSize: 10
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
