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

  async init(sampleData, demoCredentials) {
    if (this.data.initialized) {
      return; // Already initialized
    }

    console.log('Initializing database with sample data...');

    // Load users
    let users = [];
    if (demoCredentials) {
      ['students', 'teachers', 'parents'].forEach(role => {
        if (demoCredentials[role]) {
          const formattedRole = role === 'students' ? 'student' : (role === 'teachers' ? 'teacher' : 'parent');
          demoCredentials[role].forEach((u, i) => {
            users.push({
              id: `${formattedRole}_${i}`,
              role: formattedRole,
              ...u
            });
          });
        }
      });
    }

    // Assign random classes to students
    const classes = [
      { id: 'c1', name: 'Mathematics 101', teacherId: 'teacher_0', icon: '📐', color: '#f43f5e' },
      { id: 'c2', name: 'Physics 102', teacherId: 'teacher_1', icon: '⚛️', color: '#14b8a6' },
      { id: 'c3', name: 'Chemistry 103', teacherId: 'teacher_2', icon: '🧪', color: '#0ea5e9' },
      { id: 'c4', name: 'Biology 104', teacherId: 'teacher_0', icon: '🧬', color: '#10b981' }
    ];

    const studentGrades = [];
    users.filter(u => u.role === 'student').forEach(student => {
      classes.forEach(cls => {
        studentGrades.push({
          id: `grade_${student.id}_${cls.id}`,
          studentId: student.id,
          classId: cls.id,
          score: Math.floor(Math.random() * 30) + 70 // 70 to 100
        });
      });
    });

    this.data = {
      initialized: true,
      users: users,
      courses: sampleData?.courses || [],
      assignments: sampleData?.assignments || [],
      stats: sampleData?.stats || [],
      analytics: sampleData?.analytics || null,
      classes: classes,
      studentGrades: studentGrades,
      studentProgress: {}
    };

    this.saveData();
  }

  // --- Users ---
  async getUserByUsername(username) {
    return this.data.users.find(u => u.username === username);
  }

  async getUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  async getStudents() {
    return this.data.users.filter(u => u.role === 'student');
  }

  async getChildrenForParent(parentId) {
    const parent = await this.getUserById(parentId);
    if (!parent) return [];
    return this.data.users.filter(u => u.role === 'student' && parent.children.includes(u.name));
  }

  // --- Teacher Portal ---
  async getClassesForTeacher(teacherId) {
    const teacherClasses = this.data.classes.filter(c => c.teacherId === teacherId);
    return teacherClasses.map(cls => {
      const grades = this.data.studentGrades.filter(g => g.classId === cls.id);
      const avgScore = grades.length > 0 
        ? Math.round(grades.reduce((acc, curr) => acc + curr.score, 0) / grades.length) 
        : 0;
      return {
        ...cls,
        students: grades.length,
        avgScore,
        assignments: Math.floor(Math.random() * 5) + 3 // mockup
      };
    });
  }

  async getRecentStudentsForTeacher(teacherId) {
    const classes = await this.getClassesForTeacher(teacherId);
    const classIds = classes.map(c => c.id);
    const grades = this.data.studentGrades.filter(g => classIds.includes(g.classId));
    
    return grades.map(g => {
      const student = this.data.users.find(u => u.id === g.studentId);
      const cls = classes.find(c => c.id === g.classId);
      let status = 'good';
      if (g.score >= 85) status = 'excellent';
      if (g.score < 75) status = 'needs-improvement';

      return {
        id: g.id,
        name: student?.name || 'Unknown',
        class: cls?.name || 'Unknown',
        score: g.score,
        status: status
      };
    }).sort((a, b) => b.score - a.score);
  }

  async getPendingAssignments(teacherId) {
    // Mock assignments linked to teacher classes
    const classes = await this.getClassesForTeacher(teacherId);
    if (classes.length === 0) return [];
    
    return [
      { id: 1, title: 'Chapter 1 Quiz', class: classes[0].name, due: 'Today', submissions: `${Math.floor(Math.random()*20)}/${classes[0].students}` },
      { id: 2, title: 'Midterm Report', class: classes[0].name, due: 'Tomorrow', submissions: `5/${classes[0].students}` },
    ];
  }

  // --- Student Progress ---
  async updateStudentProgress(studentId, courseId, progress) {
    if (!this.data.studentProgress[studentId]) {
      this.data.studentProgress[studentId] = {};
    }
    this.data.studentProgress[studentId][courseId] = progress;
    this.saveData();
  }

  async getStudentProgress(studentId) {
    return this.data.studentProgress[studentId] || {};
  }

  async getCourses() {
    return this.data.courses;
  }
  
  async getAssignments() {
    return this.data.assignments;
  }

  async getStats() {
    return this.data.stats;
  }
  
  async getAnalytics() {
    return this.data.analytics;
  }

  // General Updates
  async updateGrade(studentId, classId, newScore) {
    const gradeIndex = this.data.studentGrades.findIndex(g => g.studentId === studentId && g.classId === classId);
    if (gradeIndex !== -1) {
      this.data.studentGrades[gradeIndex].score = newScore;
      this.saveData();
    }
  }
}

// LocalDatabase is used as a fallback by CloudDatabase
// Do NOT set window.LearnoraDB here - CloudDatabase.js handles that
