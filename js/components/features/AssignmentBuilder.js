const AssignmentBuilder = ({ onSave, showToast }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [points, setPoints] = React.useState(100);
  const [attachments, setAttachments] = React.useState([]);
  const isMobile = window.innerWidth <= 768;

  const subjects = ['Mathematics', 'Science', 'History', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art', 'Music'];

  const saveAssignment = () => {
    if (!title.trim()) {
      showToast?.('Please enter an assignment title', 'error');
      return;
    }
    onSave?.({
      title,
      description,
      subject,
      dueDate,
      points,
      attachments,
      createdAt: Date.now(),
      status: 'pending'
    });
    showToast?.('Assignment created!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '20px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 16px 0' }}>Assignment Details</h3>
        
        <input
          type="text"
          placeholder="Assignment title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '14px'
          }}
        >
          <option value="">Select Subject</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <textarea
          placeholder="Assignment instructions..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            fontSize: '14px',
            resize: 'none'
          }}
        />

        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '6px', display: 'block' }}>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '6px', display: 'block' }}>Points</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={saveAssignment}
        style={{
          padding: '16px',
          background: 'var(--primary-500)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '700',
          color: '#fff'
        }}
      >
        Create Assignment
      </button>
    </div>
  );
};

window.AssignmentBuilder = AssignmentBuilder;
