const ClassManagementView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [classes, setClasses] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState(null);
  const [showCreate, setShowCreate] = React.useState(false);
  const [newClass, setNewClass] = React.useState({ name: '', subject: '', grade: '' });

  React.useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = () => {
    if (window.Database) {
      const db = window.Database;
      setClasses([
        { id: 1, name: 'Mathematics 101', subject: 'Mathematics', grade: '10th', students: 25, icon: '📐' },
        { id: 2, name: 'Physics A', subject: 'Physics', grade: '11th', students: 18, icon: '🔬' },
        { id: 3, name: 'Chemistry Honors', subject: 'Chemistry', grade: '11th', students: 22, icon: '🧪' },
      ]);
    }
  };

  const handleCreateClass = () => {
    if (newClass.name && newClass.subject) {
      const classObj = { ...newClass, id: Date.now(), students: 0, icon: '📚' };
      setClasses([...classes, classObj]);
      showToast('Class created successfully!', 'success');
      setShowCreate(false);
      setNewClass({ name: '', subject: '', grade: '' });
    }
  };

  const classStudents = [
    { id: 1, name: 'Alice Johnson', email: 'alice@school.edu', grade: 'A', attendance: '95%' },
    { id: 2, name: 'Bob Smith', email: 'bob@school.edu', grade: 'B+', attendance: '88%' },
    { id: 3, name: 'Carol Williams', email: 'carol@school.edu', grade: 'A-', attendance: '92%' },
    { id: 4, name: 'David Brown', email: 'david@school.edu', grade: 'B', attendance: '85%' },
    { id: 5, name: 'Eva Martinez', email: 'eva@school.edu', grade: 'A', attendance: '98%' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Class Management</h1>
        <button onClick={() => setShowCreate(true)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          + New Class
        </button>
      </div>

      {!selectedClass ? (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {classes.map((cls, idx) => (
            <div key={cls.id} onClick={() => setSelectedClass(cls)} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '56px', height: '56px', background: 'var(--primary-500)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>{cls.icon}</div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{cls.name}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>{cls.subject} • {cls.grade}</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>👥 {cls.students} students</span>
                <Icon name="chevron-right" size={20} color="var(--text-tertiary)" />
              </div>
            </div>
          ))}
          {classes.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
              <p>No classes yet. Create your first class!</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <button onClick={() => setSelectedClass(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Icon name="arrow-left" size={20} /></button>
            <div style={{ width: '48px', height: '48px', background: 'var(--primary-500)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{selectedClass.icon}</div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{selectedClass.name}</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>{selectedClass.subject} • {selectedClass.grade} Grade</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary-500)' }}>{classStudents.length}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Students</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>92%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg Attendance</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent-blue)' }}>B+</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg Grade</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--warning)' }}>5</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Assignments</div>
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Student Roster</h3>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600' }}>Student</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600' }}>Grade</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '600' }}>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map((student, idx) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>{student.name}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '13px' }}>{student.email}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}><span style={{ padding: '4px 12px', background: 'var(--primary-500)20', color: 'var(--primary-500)', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{student.grade}</span></td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: parseInt(student.attendance) > 90 ? 'var(--success)' : 'var(--text-secondary)' }}>{student.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', maxWidth: '400px', width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Create New Class</h2>
            <input type="text" placeholder="Class Name" value={newClass.name} onChange={e => setNewClass({...newClass, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <input type="text" placeholder="Subject" value={newClass.subject} onChange={e => setNewClass({...newClass, subject: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <input type="text" placeholder="Grade Level" value={newClass.grade} onChange={e => setNewClass({...newClass, grade: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              <button onClick={handleCreateClass} style={{ flex: 1, padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.ClassManagementView = ClassManagementView;
