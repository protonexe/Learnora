const AttendanceView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = React.useState({});
  const [students] = React.useState([
    { id: 1, name: 'Alice Johnson', present: true },
    { id: 2, name: 'Bob Smith', present: true },
    { id: 3, name: 'Carol Williams', present: false },
    { id: 4, name: 'David Brown', present: true },
    { id: 5, name: 'Eva Martinez', present: true },
    { id: 6, name: 'Frank Lee', present: null },
    { id: 7, name: 'Grace Kim', present: true },
    { id: 8, name: 'Henry Wang', present: null },
  ]);

  const markAttendance = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const getPresentCount = () => Object.values(attendance).filter(v => v === true).length;
  const getAbsentCount = () => Object.values(attendance).filter(v => v === false).length;

  const saveAttendance = () => {
    showToast('Attendance saved successfully!', 'success');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Attendance</h1>
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '13px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--success)20', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>{getPresentCount()}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Present</div>
        </div>
        <div style={{ background: 'var(--danger)20', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--danger)' }}>{getAbsentCount()}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Absent</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-secondary)' }}>{students.length - getPresentCount() - getAbsentCount()}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Not Marked</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
        {students.map((student, idx) => (
          <div key={student.id} style={{ padding: '16px 20px', borderBottom: idx < students.length - 1 ? '1px solid var(--border-color)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary-500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px' }}>
                {student.name.charAt(0)}
              </div>
              <span style={{ fontWeight: '600' }}>{student.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => markAttendance(student.id, true)} style={{ padding: '8px 16px', background: attendance[student.id] === true ? 'var(--success)' : 'var(--bg-tertiary)', color: attendance[student.id] === true ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>Present</button>
              <button onClick={() => markAttendance(student.id, false)} style={{ padding: '8px 16px', background: attendance[student.id] === false ? 'var(--danger)' : 'var(--bg-tertiary)', color: attendance[student.id] === false ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>Absent</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={saveAttendance} style={{ width: '100%', padding: '14px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}>
        Save Attendance
      </button>
    </div>
  );
};

window.AttendanceView = AttendanceView;
