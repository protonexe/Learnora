const SubjectSelector = ({ onClose, onSelectSubject }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('all');
  
  const subjects = [
    { id: 1, name: 'Mathematics', icon: '📐', color: '#f43f5e', courses: 24, progress: 75 },
    { id: 2, name: 'Physics', icon: '⚛️', color: '#14b8a6', courses: 18, progress: 60 },
    { id: 3, name: 'Chemistry', icon: '🧪', color: '#0ea5e9', courses: 15, progress: 45 },
    { id: 4, name: 'Biology', icon: '🧬', color: '#10b981', courses: 20, progress: 80 },
    { id: 5, name: 'History', icon: '📚', color: '#8b5cf6', courses: 16, progress: 90 },
    { id: 6, name: 'English', icon: '📝', color: '#f59e0b', courses: 22, progress: 70 },
    { id: 7, name: 'Computer Science', icon: '💻', color: '#6366f1', courses: 30, progress: 55 },
    { id: 8, name: 'Geography', icon: '🌍', color: '#06b6d4', courses: 12, progress: 40 },
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
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
          <h2 style={{ margin: 0, fontSize: 20, color: 'white' }}>📚 Browse Subjects</h2>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
        {/* Search */}
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subjects..."
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 14
            }}
          />
        </div>

        {/* Level Filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 8 }}>
          {levels.map(level => (
            <button
              key={level.value}
              onClick={() => setSelectedLevel(level.value)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: 'none',
                background: selectedLevel === level.value ? 'var(--primary)' : 'var(--bg-secondary)',
                color: selectedLevel === level.value ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 13,
                whiteSpace: 'nowrap'
              }}
            >
              {level.label}
            </button>
          ))}
        </div>

        {/* Subjects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 16
        }}>
          {filteredSubjects.map(subject => (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(subject)}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: 16,
                padding: 20,
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: subject.color + '20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                marginBottom: 12
              }}>
                {subject.icon}
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: 16, color: 'var(--text-primary)' }}>
                {subject.name}
              </h3>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
                {subject.courses} courses
              </div>
              <div style={{ height: 6, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: subject.progress + '%',
                  background: subject.color,
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6, textAlign: 'right' }}>
                {subject.progress}% complete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
