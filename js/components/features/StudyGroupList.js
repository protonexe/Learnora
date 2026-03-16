const StudyGroupList = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [groups, setGroups] = React.useState(() => JSON.parse(localStorage.getItem('study-groups') || '[]'));

  const mockGroups = [
    { id: 1, name: 'Calculus Masters', subject: 'Mathematics', members: 12, maxMembers: 20, description: 'Weekly study sessions for calculus', public: true },
    { id: 2, name: 'Physics PhD', subject: 'Physics', members: 8, maxMembers: 15, description: 'Advanced physics discussion group', public: true },
    { id: 3, name: 'Chem Club', subject: 'Chemistry', members: 15, maxMembers: 15, description: 'Organic chemistry prep', public: true },
  ];

  const displayGroups = groups.length > 0 ? groups : mockGroups;

  const joinGroup = (id) => {
    showToast?.('Joined group!', 'success');
  };

  return (
    <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onBack} style={styles.backButton}><Icon name="arrow-left" size={20} /></button>
        <h1 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: '700', margin: 0 }}>👥 Study Groups</h1>
      </div>

      <div style={styles.searchBox}>
        <input type="text" placeholder="Search groups..." style={styles.searchInput} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {displayGroups.map(group => (
          <div key={group.id} style={styles.groupCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={styles.groupName}>{group.name}</h3>
                <span style={styles.groupSubject}>{group.subject}</span>
              </div>
              <span style={styles.privacyBadge}>{group.public ? '🌐 Public' : '🔒 Private'}</span>
            </div>
            <p style={styles.groupDesc}>{group.description}</p>
            <div style={styles.groupFooter}>
              <span>👥 {group.members}/{group.maxMembers} members</span>
              <button onClick={() => joinGroup(group.id)} style={styles.joinButton}>Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  backButton: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '8px', cursor: 'pointer', display: 'flex' },
  searchBox: { marginBottom: '20px' },
  searchInput: { width: '100%', padding: '14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', fontSize: '14px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' },
  groupCard: { background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px' },
  groupName: { fontSize: '18px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' },
  groupSubject: { display: 'inline-block', fontSize: '12px', color: 'var(--primary-500)', background: 'var(--primary-100)', padding: '2px 8px', borderRadius: '4px', marginTop: '4px' },
  privacyBadge: { fontSize: '12px', color: 'var(--text-tertiary)' },
  groupDesc: { fontSize: '14px', color: 'var(--text-secondary)', margin: '12px 0' },
  groupFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  joinButton: { padding: '8px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }
};

window.StudyGroupList = StudyGroupList;
