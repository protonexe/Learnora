const ProfilePage = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [profile, setProfile] = React.useState(() => JSON.parse(localStorage.getItem('user-profile') || '{}'));
  const [editing, setEditing] = React.useState(false);
  const [editData, setEditData] = React.useState(profile);

  const saveProfile = () => {
    setProfile(editData);
    localStorage.setItem('user-profile', JSON.stringify(editData));
    setEditing(false);
    showToast?.('Profile saved!', 'success');
  };

  const stats = { totalStudyHours: 127, coursesCompleted: 4, currentStreak: 12, totalXP: 4850 };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>👤 Profile</h1>
      </div>

      <div style={styles.profileCard}>
        <div style={styles.avatarSection}>
          <span style={styles.avatar}>{profile.avatar || '👨‍🎓'}</span>
          <button onClick={() => setEditing(true)} style={styles.editButton}>Edit Profile</button>
        </div>
        
        {editing ? (
          <div style={styles.editForm}>
            <input type="text" value={editData.name || ''} onChange={(e) => setEditData({...editData, name: e.target.value})} placeholder="Your name" style={styles.input} />
            <input type="text" value={editData.avatar || ''} onChange={(e) => setEditData({...editData, avatar: e.target.value})} placeholder="Avatar emoji" style={styles.input} />
            <input type="text" value={editData.bio || ''} onChange={(e) => setEditData({...editData, bio: e.target.value})} placeholder="Bio" style={styles.input} />
            <input type="text" value={editData.school || ''} onChange={(e) => setEditData({...editData, school: e.target.value})} placeholder="School/University" style={styles.input} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={saveProfile} style={styles.saveButton}>Save</button>
              <button onClick={() => setEditing(false)} style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        ) : (
          <div style={styles.profileInfo}>
            <h2 style={styles.profileName}>{profile.name || 'Student'}</h2>
            <p style={styles.profileBio}>{profile.bio || 'Learning enthusiast'}</p>
            {profile.school && <p style={styles.profileSchool}>🏫 {profile.school}</p>}
          </div>
        )}
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statBox}><span style={styles.statValue}>⏱️ {stats.totalStudyHours}h</span><span style={styles.statLabel}>Study Time</span></div>
        <div style={styles.statBox}><span style={styles.statValue}>📚 {stats.coursesCompleted}</span><span style={styles.statLabel}>Courses</span></div>
        <div style={styles.statBox}><span style={styles.statValue}>🔥 {stats.currentStreak}</span><span style={styles.statLabel}>Day Streak</span></div>
        <div style={styles.statBox}><span style={styles.statValue}>⭐ {stats.totalXP}</span><span style={styles.statLabel}>Total XP</span></div>
      </div>

      <div style={styles.menuCard}>
        <button style={styles.menuItem}><span>🔒</span> Account Settings</button>
        <button style={styles.menuItem}><span>🔔</span> Notification Preferences</button>
        <button style={styles.menuItem}><span>🎨</span> Theme & Appearance</button>
        <button style={styles.menuItem}><span>📚</span> Learning Goals</button>
        <button style={styles.menuItem}><span>🔐</span> Privacy & Security</button>
        <button style={styles.menuItem}><span>❓</span> Help & Support</button>
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  profileCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '24px', marginBottom: '20px', textAlign: 'center' },
  avatarSection: { textAlign: 'center', marginBottom: '16px' },
  avatar: { display: 'block', fontSize: '80px', margin: '0 auto 12px' },
  editButton: { padding: '8px 16px', background: 'var(--primary-100)', color: 'var(--primary-600)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  editForm: { textAlign: 'left' },
  input: { width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '14px', background: 'var(--bg-primary)', color: 'var(--text-primary)', marginBottom: '12px' },
  saveButton: { background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  cancelButton: { background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  profileInfo: { textAlign: 'center' },
  profileName: { fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0', color: 'var(--text-primary)' },
  profileBio: { fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 8px 0' },
  profileSchool: { fontSize: '14px', color: 'var(--text-tertiary)', margin: 0 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' },
  statBox: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', textAlign: 'center' },
  statValue: { display: 'block', fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' },
  statLabel: { fontSize: '12px', color: 'var(--text-tertiary)' },
  menuCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' },
  menuItem: { width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'none', border: 'none', borderBottom: '1px solid var(--border-color)', fontSize: '15px', cursor: 'pointer', textAlign: 'left', color: 'var(--text-primary)' }
};

window.ProfilePage = ProfilePage;
