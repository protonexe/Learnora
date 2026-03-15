const EnrollmentView = ({ onBack, onNavigate, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [availableCourses, setAvailableCourses] = React.useState([]);
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('available');
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    if (window.Database) {
      const db = window.Database;
      const allCourses = db.getAllCourses() || [];
      const enrolled = db.getEnrolledCourses('student_0') || [];
      setAvailableCourses(allCourses);
      setEnrolledCourses(enrolled);
    }
  };

  const handleEnroll = (courseId) => {
    if (window.Database) {
      const success = window.Database.enrollStudentInCourse('student_0', courseId);
      if (success) {
        showToast('Successfully enrolled in course!', 'success');
        loadCourses();
      }
    }
  };

  const handleUnenroll = (courseId) => {
    if (window.Database) {
      window.Database.unenrollStudentFromCourse('student_0', courseId);
      showToast('Unenrolled from course', 'info');
      loadCourses();
    }
  };

  const filteredAvailable = availableCourses.filter(c => 
    !enrolledCourses.find(e => e.id === c.id) &&
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Course Enrollment</h1>
        <div style={{ width: '60px' }} />
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('available')} style={{ padding: '10px 20px', background: activeTab === 'available' ? 'var(--primary-500)' : 'var(--bg-secondary)', color: activeTab === 'available' ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Available ({filteredAvailable.length})
        </button>
        <button onClick={() => setActiveTab('enrolled')} style={{ padding: '10px 20px', background: activeTab === 'enrolled' ? 'var(--primary-500)' : 'var(--bg-secondary)', color: activeTab === 'enrolled' ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Enrolled ({enrolledCourses.length})
        </button>
      </div>

      {activeTab === 'available' && (
        <input type="text" placeholder="Search courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '14px' }} />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {(activeTab === 'available' ? filteredAvailable : enrolledCourses).map((course, idx) => (
          <div key={course.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: course.color || 'var(--primary-500)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                {course.icon || '📚'}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>{course.name}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>{course.chapters?.length || 0} chapters</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{course.description || 'No description available'}</p>
            {activeTab === 'available' ? (
              <button onClick={() => handleEnroll(course.id)} style={{ width: '100%', padding: '10px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                Enroll Now
              </button>
            ) : (
              <button onClick={() => handleUnenroll(course.id)} style={{ width: '100%', padding: '10px', background: 'var(--danger)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                Unenroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

window.EnrollmentView = EnrollmentView;
