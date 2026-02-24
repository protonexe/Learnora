const TeacherPortal = ({ userId, onLogout, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const { theme } = useTheme();
  const [selectedClass, setSelectedClass] = React.useState(null);
  const isMobile = window.innerWidth <= 768;

  const [showAssignModal, setShowAssignModal] = React.useState(false);
  const [showMessageModal, setShowMessageModal] = React.useState(false);
  const [newAssignment, setNewAssignment] = React.useState({ title: '', classId: '', dueDate: '', description: '' });
  const [selectedRecipient, setSelectedRecipient] = React.useState(null);
  const [messageContent, setMessageContent] = React.useState('');

  const [classes, setClasses] = React.useState([]);
  const [recentStudents, setRecentStudents] = React.useState([]);
  const [pendingAssignments, setPendingAssignments] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (window.LearnoraDB && userId) {
        const cls = await window.LearnoraDB.getClassesForTeacher(userId);
        const students = await window.LearnoraDB.getRecentStudentsForTeacher(userId);
        const assignments = await window.LearnoraDB.getPendingAssignments(userId);
        setClasses(cls || []);
        setRecentStudents(students || []);
        setPendingAssignments(assignments || []);
      }
    };
    fetchData();
  }, [userId]);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.classId || !newAssignment.dueDate) {
      showToast('Please fill in all required fields', 'warning');
      return;
    }

    try {
      const cls = classes.find(c => c.id === newAssignment.classId);
      await window.LearnoraDB.addAssignment({
        ...newAssignment,
        teacherId: userId,
        class: cls ? cls.name : 'Unknown Class',
        submissions: '0/24'
      });
      showToast('Assignment created successfully', 'success');
      setShowAssignModal(false);
      setNewAssignment({ title: '', classId: '', dueDate: '', description: '' });
      const updatedAssignments = await window.LearnoraDB.getPendingAssignments(userId);
      setPendingAssignments(updatedAssignments || []);
    } catch (error) {
      showToast('Failed to create assignment', 'error');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageContent.trim() || !selectedRecipient) return;

    try {
      await window.LearnoraDB.sendMessage(userId, selectedRecipient.id, messageContent);
      showToast('Message sent to ' + selectedRecipient.name, 'success');
      setMessageContent('');
      setShowMessageModal(false);
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  };

  const teacherStats = [
    { label: 'Total Students', value: recentStudents.length || '0', icon: 'users', color: '#f43f5e', change: '+12' },
    { label: 'Classes', value: classes.length || '0', icon: 'book-open', color: '#14b8a6', change: 'Active' },
    { label: 'Assignments', value: pendingAssignments.length || '0', icon: 'file-text', color: '#0ea5e9', change: `${pendingAssignments.length} pending` },
    { label: 'Avg. Score', value: `${classes.length ? Math.round(classes.reduce((a,c)=>a+c.avgScore,0)/classes.length) : 0}%`, icon: 'award', color: '#10b981', change: '+3%' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)', 
      backgroundImage: 'var(--gradient-mesh)',
      paddingBottom: isMobile ? '80px' : '24px'
    }}>
      <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: isMobile ? '16px' : '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: isMobile ? '20px' : '26px', 
              fontWeight: '700', 
              marginBottom: '4px',
              letterSpacing: '-0.02em'
            }}>
              👨‍🏫 Teacher Dashboard
            </h1>
            <p style={{ fontSize: isMobile ? '12px' : '14px', color: 'var(--text-secondary)' }}>
              Manage your classes and students
            </p>
          </div>
          <button 
            onClick={onLogout}
            style={{
              padding: isMobile ? '6px 12px' : '8px 16px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: isMobile ? '8px' : '12px',
          marginBottom: isMobile ? '16px' : '24px'
        }}>
          {teacherStats.map((stat, idx) => (
            <AnimatedCard key={idx} delay={idx * 50} style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: isMobile ? '12px' : '16px',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: isMobile ? '11px' : '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: '500' }}>{stat.label}</p>
                  <p style={{ fontSize: isMobile ? '22px' : '24px', fontWeight: '700' }}>{stat.value}</p>
                </div>
                <div style={{
                  width: isMobile ? '32px' : '40px',
                  height: isMobile ? '32px' : '40px',
                  borderRadius: 'var(--radius-md)',
                  background: stat.color + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon name={stat.icon} size={isMobile ? 16 : 18} color={stat.color} />
                </div>
              </div>
              <p style={{ fontSize: isMobile ? '10px' : '11px', color: stat.color, marginTop: isMobile ? '8px' : '10px', fontWeight: '600' }}>
                {stat.change}
              </p>
            </AnimatedCard>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '4px' : '8px', 
          marginBottom: isMobile ? '16px' : '24px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0',
          overflowX: 'auto',
          paddingRight: '4px'
        }}>
          {['dashboard', 'classes', 'students', 'assignments'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: isMobile ? '8px 12px' : '12px 20px',
                background: activeTab === tab ? 'var(--primary-500)' : 'transparent',
                color: activeTab === tab ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: `2px solid ${activeTab === tab ? 'var(--primary-500)' : 'var(--border-strong)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '600',
                transition: 'all var(--transition-fast)',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: isMobile ? '12px' : '24px' }}>
            <AnimatedCard delay={100} style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <h3>Your Classes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {classes.map(cls => (
                  <div key={cls.id} style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{cls.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '600' }}>{cls.name}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{cls.students} students</p>
                    </div>
                    <p style={{ fontWeight: '700', color: cls.color }}>{cls.avgScore}%</p>
                  </div>
                ))}
              </div>
            </AnimatedCard>
            <AnimatedCard delay={150} style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <h3>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {recentStudents.slice(0, 5).map(student => (
                  <div key={student.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Avatar name={student.name} size="sm" />
                      <p style={{ fontWeight: '600' }}>{student.name}</p>
                    </div>
                    <Badge label={`${student.score}%`} color="#10b981" />
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        )}

        {activeTab === 'classes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {classes.map(cls => (
              <AnimatedCard key={cls.id} style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{cls.icon}</div>
                <h4 style={{ fontWeight: '700' }}>{cls.name}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{cls.students} enrolled students</p>
              </AnimatedCard>
            ))}
          </div>
        )}

        {activeTab === 'students' && (
          <div style={{ background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Student</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Class</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Grade</th>
                  <th style={{ padding: '16px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map(student => (
                  <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Avatar name={student.name} size="sm" />
                        <span style={{ fontWeight: '600' }}>{student.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>{student.class}</td>
                    <td style={{ padding: '16px' }}><Badge label={`${student.score}%`} color="#10b981" /></td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button 
                        onClick={() => { setSelectedRecipient(student); setShowMessageModal(true); }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--primary-500)', cursor: 'pointer' }}
                      >
                        <Icon name="mail" size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'assignments' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>Active Assignments</h3>
              <Button onClick={() => setShowAssignModal(true)} size="sm" icon="plus">New Assignment</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {pendingAssignments.map(assign => (
                <AnimatedCard key={assign.id} style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontWeight: '700' }}>{assign.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{assign.class}</p>
                  <div style={{ marginTop: '16px' }}>
                    <p style={{ fontSize: '12px', marginBottom: '4px' }}>Submissions: {assign.submissions}</p>
                    <ProgressBar value={40} />
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </>
        )}

        {/* Modals */}
        {showAssignModal && (
          <Modal title="New Assignment" onClose={() => setShowAssignModal(false)}>
            <form onSubmit={handleCreateAssignment}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px' }}>Title</label>
                <input type="text" value={newAssignment.title} onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} required />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px' }}>Class</label>
                <select value={newAssignment.classId} onChange={e => setNewAssignment({...newAssignment, classId: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} required>
                  <option value="">Select Class</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px' }}>Due Date</label>
                <input type="date" value={newAssignment.dueDate} onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)' }} required />
              </div>
              <Button type="submit" fullWidth>Create Assignment</Button>
            </form>
          </Modal>
        )}

        {showMessageModal && (
          <Modal title={`Message to ${selectedRecipient?.name}`} onClose={() => setShowMessageModal(false)}>
            <form onSubmit={handleSendMessage}>
              <textarea 
                value={messageContent} 
                onChange={e => setMessageContent(e.target.value)} 
                placeholder="Type message..."
                style={{ width: '100%', height: '100px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', marginBottom: '16px' }}
                required
              />
              <Button type="submit" fullWidth icon="send">Send Message</Button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

window.TeacherPortal = TeacherPortal;
