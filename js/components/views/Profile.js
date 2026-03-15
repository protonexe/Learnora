const ProfileView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [user, setUser] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState({});
  const [stats, setStats] = React.useState({ courses: 0, quizzes: 0, hours: 0, streak: 0 });

  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    if (window.Database) {
      const db = window.Database;
      const currentUser = db.getUserById('student_0') || { name: 'Student User', email: 'student@learnora.com', role: 'student', avatar: '👨‍🎓' };
      setUser(currentUser);
      setEditData(currentUser);
      
      const courses = db.getEnrolledCourses('student_0') || [];
      const quizzes = db.getAllQuizzes() || [];
      setStats({
        courses: courses.length,
        quizzes: quizzes.length,
        hours: Math.floor(Math.random() * 50) + 10,
        streak: parseInt(localStorage.getItem('learnora-streak-current') || '0')
      });
    }
  };

  const handleSave = () => {
    if (window.Database) {
      const db = window.Database;
      const updatedUser = { ...user, ...editData };
      setUser(updatedUser);
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>My Profile</h1>
        <button onClick={() => setIsEditing(!isEditing)} style={{ padding: '8px 16px', background: isEditing ? 'var(--primary-500)' : 'var(--bg-tertiary)', color: isEditing ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
        <div 
          onClick={() => isEditing && document.getElementById('avatar-editor')?.classList.toggle('hidden')}
          style={{ 
            width: '100px', 
            height: '100px', 
            background: 'var(--primary-500)', 
            borderRadius: '50%', 
            margin: '0 auto 16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '48px',
            cursor: isEditing ? 'pointer' : 'default',
            border: isEditing ? '3px dashed var(--primary-300)' : 'none',
            transition: 'all 0.2s ease'
          }}
          title={isEditing ? 'Click to change avatar' : ''}
        >
          {user?.avatar || '👨‍🎓'}
        </div>
        
        {isEditing && (
          <div id="avatar-editor" style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: '0 0 8px 0' }}>Click an avatar to select:</p>
            <AvatarEditor 
              currentAvatar={editData.avatar || '👨‍🎓'}
              onSelect={(avatar) => setEditData({...editData, avatar})}
            />
          </div>
        )}
        
        {isEditing ? (
          <div style={{ maxWidth: '300px', margin: '0 auto' }}>
            <input type="text" value={editData.name || ''} onChange={e => setEditData({...editData, name: e.target.value})} placeholder="Name" style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <input type="email" value={editData.email || ''} onChange={e => setEditData({...editData, email: e.target.value})} placeholder="Email" style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <input type="text" value={editData.grade || ''} onChange={e => setEditData({...editData, grade: e.target.value})} placeholder="Grade/Class" style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <button onClick={handleSave} style={{ width: '100%', padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Save Changes</button>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>{user?.name || 'Student User'}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0 0 4px 0' }}>{user?.email || 'student@learnora.com'}</p>
            <p style={{ color: 'var(--text-tertiary)', margin: 0 }}>Grade: {user?.grade || '10th Grade'} • {user?.role || 'Student'}</p>
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary-500)' }}>{stats.courses}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Courses</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent-blue)' }}>{stats.quizzes}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Quizzes</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--success)' }}>{stats.hours}h</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Study Time</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--warning)' }}>🔥{stats.streak}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Day Streak</div>
        </div>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Account Settings</h3>
      <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
        {[
          { icon: 'bell', label: 'Notifications', desc: 'Manage notification preferences' },
          { icon: 'lock', label: 'Privacy', desc: 'Control your privacy settings' },
          { icon: 'shield', label: 'Security', desc: 'Password and security' },
          { icon: 'help-circle', label: 'Help & Support', desc: 'Get help with Learnora' },
        ].map((item, idx) => (
          <div key={idx} style={{ padding: '16px 20px', borderBottom: idx < 3 ? '1px solid var(--border-color)' : 'none', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--bg-tertiary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={item.icon} size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 2px 0' }}>{item.label}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{item.desc}</p>
            </div>
            <Icon name="chevron-right" size={20} color="var(--text-tertiary)" />
          </div>
        ))}
      </div>
    </div>
  );
};

window.ProfileView = ProfileView;
