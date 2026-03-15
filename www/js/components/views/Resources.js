const ResourcesView = ({ onBack, showToast }) => {
  const isMobile = window.innerWidth <= 768;
  const [resources, setResources] = React.useState([
    { id: 1, title: 'Physics Formula Sheet', type: 'pdf', subject: 'Physics', size: '2.4 MB', icon: '📄', downloads: 1250 },
    { id: 2, title: 'Chemistry Periodic Table', type: 'pdf', subject: 'Chemistry', size: '1.8 MB', icon: '📄', downloads: 980 },
    { id: 3, title: 'Math Calculus Notes', type: 'pdf', subject: 'Mathematics', size: '3.2 MB', icon: '📄', downloads: 856 },
    { id: 4, title: 'Biology Cell Structure', type: 'image', subject: 'Biology', size: '4.1 MB', icon: '🖼️', downloads: 742 },
    { id: 5, title: 'History Timeline', type: 'pdf', subject: 'History', size: '1.5 MB', icon: '📄', downloads: 621 },
    { id: 6, title: 'English Grammar Guide', type: 'pdf', subject: 'English', size: '890 KB', icon: '📄', downloads: 534 },
    { id: 7, title: 'Geography World Map', type: 'image', subject: 'Geography', size: '5.6 MB', icon: '🖼️', downloads: 412 },
    { id: 8, title: 'Programming Cheat Sheet', type: 'pdf', subject: 'Computer Science', size: '450 KB', icon: '📄', downloads: 389 },
  ]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState('all');

  const subjects = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'History', 'English', 'Geography', 'Computer Science'];

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || r.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleDownload = (resource) => {
    showToast(`Downloading ${resource.title}...`, 'info');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '8px 12px 80px' : '16px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h1 style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: '700' }}>Resource Library</h1>
        <button style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
          + Upload
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Search resources..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, minWidth: '200px', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '14px' }} />
        <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', fontSize: '14px' }}>
          {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredResources.map((resource, idx) => (
          <div key={resource.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--bg-tertiary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                {resource.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>{resource.title}</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', margin: 0 }}>{resource.subject} • {resource.size}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>⬇️ {resource.downloads}</span>
              <button onClick={() => handleDownload(resource)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
          <p>No resources found matching your search.</p>
        </div>
      )}
    </div>
  );
};

window.ResourcesView = ResourcesView;
