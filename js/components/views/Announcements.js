const AnnouncementsView = ({ onBack, showToast, isTeacher }) => {
  const isMobile = window.innerWidth <= 768;
  const [announcements, setAnnouncements] = React.useState([]);
  const [showCreate, setShowCreate] = React.useState(false);
  const [newAnnouncement, setNewAnnouncement] = React.useState({ title: '', content: '', courseId: '', priority: 'normal' });
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    if (window.Database) {
      const db = window.Database;
      setAnnouncements(db.getAllAnnouncements() || []);
      setCourses(db.getAllCourses() || []);
    }
  };

  const handleCreate = () => {
    if (window.Database && newAnnouncement.title && newAnnouncement.content) {
      window.Database.createAnnouncement(newAnnouncement);
      showToast('Announcement posted!', 'success');
      setShowCreate(false);
      setNewAnnouncement({ title: '', content: '', courseId: '', priority: 'normal' });
      loadData();
    }
  };

  const handleDelete = (id) => {
    if (window.Database) {
      window.Database.deleteAnnouncement(id);
      showToast('Announcement deleted', 'info');
      loadData();
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'var(--danger)';
      case 'urgent': return '#ef4444';
      default: return 'var(--primary-500)';
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Announcements</h1>
        {isTeacher && (
          <button onClick={() => setShowCreate(true)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            + New
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {announcements.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
            <p>No announcements yet.</p>
          </div>
        )}
        {announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((announcement, idx) => (
          <div key={announcement.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${getPriorityColor(announcement.priority)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>{announcement.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                  {new Date(announcement.createdAt).toLocaleDateString()} • {announcement.priority === 'urgent' ? '🔴 URGENT' : announcement.priority === 'high' ? '🟠 Important' : '📢 Announcement'}
                </p>
              </div>
              {isTeacher && (
                <button onClick={() => handleDelete(announcement.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '18px' }}>🗑️</button>
              )}
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>{announcement.content}</p>
          </div>
        ))}
      </div>

      {showCreate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', maxWidth: '500px', width: '100%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>New Announcement</h2>
            <input type="text" placeholder="Title" value={newAnnouncement.title} onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }} />
            <textarea placeholder="Content" value={newAnnouncement.content} onChange={e => setNewAnnouncement({...newAnnouncement, content: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', minHeight: '100px' }} />
            <select value={newAnnouncement.priority} onChange={e => setNewAnnouncement({...newAnnouncement, priority: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
              <option value="normal">Normal</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              <button onClick={handleCreate} style={{ flex: 1, padding: '12px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.AnnouncementsView = AnnouncementsView;
