// Simple LocalStorage-based Database for Learnora
// Simulates a real database with collections/tables

class LocalDatabase {
  constructor(dbName = 'learnora_db') {
    this.dbName = dbName;
    this.data = this.loadData();
    this.initialized = false;
  }

  loadData() {
    try {
      const json = window.localStorage.getItem(this.dbName);
      if (json) {
        return JSON.parse(json);
      }
    } catch (e) {
      console.error('Failed to load DB from localStorage', e);
    }
    return {
      users: [],
      courses: [],
      assignments: [],
      stats: [],
      analytics: null,
      quizzes: [],
      classes: [],
      studentGrades: [],
      studentProgress: {}
    };
  }

  saveData() {
    try {
      window.localStorage.setItem(this.dbName, JSON.stringify(this.data));
    } catch (e) {
      console.error('Failed to save DB to localStorage', e);
    }
  }

  init(sampleData, demoCredentials) {
    if (this.initialized) return;
    
    if (!this.data.users.length && demoCredentials) {
      // Populate with demo users
      let users = [];
      ['students', 'teachers', 'parents'].forEach(role => {
        if (demoCredentials[role]) {
          const formattedRole = role === 'students' ? 'student' : (role === 'teachers' ? 'teacher' : 'parent');
          demoCredentials[role].forEach((u, i) => {
            users.push({ id: `${formattedRole}_${i}`, role: formattedRole, ...u });
          });
        }
      });
      this.data.users = users;
    }

    if (!this.data.courses.length && sampleData?.courses) {
      this.data.courses = sampleData.courses;
    }
    if (!this.data.assignments.length && sampleData?.assignments) {
      this.data.assignments = sampleData.assignments;
    }
    if (!this.data.stats.length && sampleData?.stats) {
      this.data.stats = sampleData.stats;
    }
    if (!this.data.analytics && sampleData?.analytics) {
      this.data.analytics = sampleData.analytics;
    }

    this.saveData();
    this.initialized = true;
    console.log('[Learnora] LocalDatabase initialized');
  }

  validateUser(role, username, password) {
    const match = this.data.users.find(u => u.role === role && u.username === username && u.password === password);
    return match || null;
  }

  getUserByUsername(username) {
    return this.data.users.find(u => u.username === username) || null;
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id) || null;
  }

  getStudents() {
    return this.data.users.filter(u => u.role === 'student');
  }

  getTeachers() {
    return this.data.users.filter(u => u.role === 'teacher');
  }

  getParents() {
    return this.data.users.filter(u => u.role === 'parent');
  }

  getClassesForTeacher(teacherId) {
    if (!Array.isArray(this.data.classes)) return [];
    return this.data.classes.filter(c => c.teacherId === teacherId);
  }

  getStudentsInClass(classId) {
    if (!Array.isArray(this.data.studentGrades)) return [];
    const gradeRecords = this.data.studentGrades.filter(g => g.classId === classId);
    return gradeRecords.map(g => this.getUserById(g.studentId)).filter(Boolean);
  }

  getChildrenForParent(parentId) {
    const parent = this.getUserById(parentId);
    if (!parent || !parent.children) return [];
    return parent.children.map(name => this.data.users.find(u => u.name === name)).filter(Boolean);
  }

  getStudentProgress(studentId) {
    return this.data.studentProgress[studentId] || {};
  }

  updateStudentProgress(studentId, progressData) {
    this.data.studentProgress[studentId] = progressData;
    this.saveData();
  }

  getAnalytics() {
    return this.data.analytics || {};
  }
}
