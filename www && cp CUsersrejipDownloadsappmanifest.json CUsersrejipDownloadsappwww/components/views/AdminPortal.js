const AdminPortal = ({ userId, onLogout, showToast }) => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [users, setUsers] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isMobile = window.innerWidth <= 768;

  const [showAddUserModal, setShowAddUserModal] = React.useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = React.useState(false);
  const [showConnectModal, setShowConnectModal] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', username: '', password: '', role: 'student', email: '' });
  const [newCourse, setNewCourse] = React.useState({ title: '', description: '', teacherId: '' });
  const [connection, setConnection] = React.useState({ parentId: '', studentId: '' });
  const [userConnections, setUserConnections] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (window.LearnoraDB) {
        const allUsers = await window.LearnoraDB.getAllUsers() || [];
        const allCourses = await window.LearnoraDB.getAllCourses() || [];
        const connections = await window.LearnoraDB.getParentStudentConnections ? await window.LearnoraDB.getParentStudentConnections() : [];
        
        setUsers(allUsers);
        setCourses(allCourses);
        setUserConnections(connections);
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    }
    setIsLoading(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        ...newUser,
        id: 'user_' + Date.now(),
        createdAt: new Date().toISOString()
      };
      
      if (window.LearnoraDB) {
        await window.LearnoraDB.createUser(userData);
      }
      
      setUsers([...users, userData]);
      showToast(`User added successfully!`, 'success');
      setShowAddUserModal(false);
      setNewUser({ name: '', username: '', password: '', role: 'student', email: '' });
    } catch (error) {
      showToast('Failed to add user', 'error');
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        ...newCourse,
        id: 'course_' + Date.now(),
        chapters: [],
        createdAt: new Date().toISOString()
      };
      
      if (window.LearnoraDB) {
        await window.LearnoraDB.createCourse(courseData);
      }
      
      setCourses([...courses, courseData]);
      showToast('Course added successfully!', 'success');
      setShowAddCourseModal(false);
      setNewCourse({ title: '', description: '', teacherId: '' });
    } catch (error) {
      showToast('Failed to add course', 'error');
    }
  };

  const handleCreateConnection = async (e) => {
    e.preventDefault();
    try {
      const connData = {
        parentId: connection.parentId,
        studentId: connection.studentId,
        createdAt: new Date().toISOString()
      };
      
      if (window.LearnoraDB && window.LearnoraDB.createParentStudentConnection) {
        await window.LearnoraDB.createParentStudentConnection(connData);
      }
      
      setUserConnections([...userConnections, connData]);
      showToast('Connection created successfully!', 'success');
      setShowConnectModal(false);
      setConnection({ parentId: '', studentId: '' });
    } catch (error) {
      showToast('Failed to create connection', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      if (window.LearnoraDB && window.LearnoraDB.deleteUser) {
        await window.LearnoraDB.deleteUser(userId);
      }
      setUsers(users.filter(u => u.id !== userId));
      showToast('User deleted', 'success');
    } catch (error) {
      showToast('Failed to delete user', 'error');
    }
  };

  const students = users.filter(u => u.role === 'student');
  const parents = users.filter(u => u.role === 'parent');
  const teachers = users.filter(u => u.role === 'teacher');

  const adminStats = [
    { label: 'Students', value: students.length, icon: 'users', color: '#8b5cf6' },
    { label: 'Parents', value: parents.length, icon: 'user-check', color: '#10b981' },
    { label: 'Teachers', value: teachers.length, icon: 'book-open', color: '#f59e0b' },
    { label: 'Courses', value: courses.length, icon: 'file-text', color: '#3b82f6' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-primary)', 
      backgroundImage: 'var(--gradient-mesh)',
      paddingBottom: isMobile ? '80px' : '24px'
    }}>
      <div style={{ padding: isMobile ? '12px' : '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: isMobile ? '16px' : '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: '700', marginBottom: '4px', letterSpacing: '-0.02em' }}>
              ⚙️ Admin Portal
            </h1>
            <p style={{ fontSize: isMobile ? '12px' : '14px', color: 'var(--text-secondary)' }}>
              Manage students, parents, teachers & courses
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={fetchData} style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
              🔄 Refresh
            </button>
            <button onClick={onLogout} style={{ padding: '8px 16px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {adminStats.map((stat, idx) => (
            <div key={idx} style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', backdropFilter: 'blur(12px)' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{stat.label}</p>
              <p style={{ fontSize: '28px', fontWeight: '800' }}>{isLoading ? '...' : stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
          {['dashboard', 'users', 'courses', 'connections'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '10px 20px',
              background: activeTab === tab ? 'var(--primary-500)' : 'var(--bg-secondary)',
              color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}>
              {tab === 'connections' ? '🔗 Connections' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '20px' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <button onClick={() => setShowAddUserModal(true)} style={{ padding: '20px', background: 'var(--bg-primary)', border: '2px dashed var(--border-color)', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>👤</div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Add User</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Add student, parent, or teacher</div>
              </button>
              <button onClick={() => setShowAddCourseModal(true)} style={{ padding: '20px', background: 'var(--bg-primary)', border: '2px dashed var(--border-color)', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📚</div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Add Course</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Create a new course</div>
              </button>
              <button onClick={() => setShowConnectModal(true)} style={{ padding: '20px', background: 'var(--bg-primary)', border: '2px dashed var(--border-color)', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔗</div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Link Parent-Student</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Connect parent to student</div>
              </button>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>All Users</h3>
              <button onClick={() => setShowAddUserModal(true)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                + Add User
              </button>
            </div>
            
            {/* Role Filter */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {['all', 'student', 'parent', 'teacher'].map(role => (
                <button key={role} style={{ padding: '6px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', textTransform: 'capitalize' }}>
                  {role} ({role === 'all' ? users.length : users.filter(u => u.role === role).length})
                </button>
              ))}
            </div>

            {isLoading ? <p>Loading...</p> : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Username</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Role</th>
                      <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px' }}>{user.name}</td>
                        <td style={{ padding: '12px' }}>{user.username}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 8px', background: user.role === 'student' ? '#8b5cf620' : user.role === 'parent' ? '#10b98120' : '#f59e0b20', borderRadius: '4px', fontSize: '12px', textTransform: 'capitalize' }}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>{user.email || '-'}</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <button onClick={() => handleDeleteUser(user.id)} style={{ padding: '4px 8px', background: '#ef444420', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>All Courses</h3>
              <button onClick={() => setShowAddCourseModal(true)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                + Add Course
              </button>
            </div>
            {isLoading ? <p>Loading...</p> : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {courses.map(course => {
                  const courseTeacher = teachers.find(t => t.id === course.teacherId);
                  return (
                    <div key={course.id} style={{ padding: '16px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-primary)' }}>
                      <h4 style={{ marginBottom: '8px' }}>{course.title}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>{course.description}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'var(--primary-500)' }}>{courseTeacher ? `👨‍🏫 ${courseTeacher.name}` : 'No teacher assigned'}</span>
                        <span style={{ color: 'var(--text-tertiary)' }}>{course.chapters?.length || 0} chapters</span>
                      </div>
                    </div>
                  );
                })}
                {courses.length === 0 && (
                  <p style={{ color: 'var(--text-secondary)', gridColumn: '1/-1', textAlign: 'center', padding: '20px' }}>No courses found</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>Parent-Student Connections</h3>
              <button onClick={() => setShowConnectModal(true)} style={{ padding: '8px 16px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                + Create Connection
              </button>
            </div>
            {userConnections.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                <p style={{ fontSize: '40px', marginBottom: '16px' }}>🔗</p>
                <p>No parent-student connections yet</p>
                <p style={{ fontSize: '13px' }}>Create connections to link parents with their children</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {userConnections.map((conn, idx) => {
                  const parent = parents.find(p => p.id === conn.parentId);
                  const student = students.find(s => s.id === conn.studentId);
                  return (
                    <div key={idx} style={{ padding: '16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10b98120', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600' }}>{parent?.name || 'Unknown Parent'}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Parent</div>
                      </div>
                      <div style={{ color: 'var(--text-tertiary)' }}>→</div>
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        <div style={{ fontWeight: '600' }}>{student?.name || 'Unknown Student'}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Student</div>
                      </div>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#8b5cf620', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎓</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '20px' }}>Add New User</h3>
            <form onSubmit={handleAddUser}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Full Name</label>
                <input required type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Username</label>
                <input required type="text" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Password</label>
                <input required type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Email</label>
                <input type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Role</label>
                <select required value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowAddUserModal(false)} style={{ padding: '10px 20px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Add User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Course</h3>
            <form onSubmit={handleAddCourse}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Course Title</label>
                <input required type="text" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Description</label>
                <textarea required value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} rows={3} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Assign Teacher</label>
                <select required value={newCourse.teacherId} onChange={e => setNewCourse({...newCourse, teacherId: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  <option value="">Select a teacher...</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowAddCourseModal(false)} style={{ padding: '10px 20px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Add Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Connection Modal */}
      {showConnectModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '20px' }}>Link Parent to Student</h3>
            <form onSubmit={handleCreateConnection}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Select Parent</label>
                <select required value={connection.parentId} onChange={e => setConnection({...connection, parentId: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  <option value="">Choose a parent...</option>
                  {parents.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Select Student</label>
                <select required value={connection.studentId} onChange={e => setConnection({...connection, studentId: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  <option value="">Choose a student...</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowConnectModal(false)} style={{ padding: '10px 20px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Create Connection</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

window.AdminPortal = AdminPortal;
