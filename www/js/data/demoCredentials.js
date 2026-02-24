// LOGIN CREDENTIALS FOR LEARNORA
// Use these credentials to test the application

const DemoCredentials = {
  // ==================== STUDENTS ====================
  students: [
    {
      username: 'emma.wilson',
      password: 'pass123',
      name: 'Emma Wilson',
      grade: '10th Grade',
      email: 'emma.wilson@school.edu'
    },
    {
      username: 'alex.johnson',
      password: 'pass123',
      name: 'Alex Johnson',
      grade: '9th Grade',
      email: 'alex.johnson@school.edu'
    },
    {
      username: 'sarah.smith',
      password: 'pass123',
      name: 'Sarah Smith',
      grade: '11th Grade',
      email: 'sarah.smith@school.edu'
    }
  ],

  // ==================== TEACHERS ====================
  teachers: [
    {
      username: 'mr.johnson',
      password: 'teacher123',
      name: 'Mr. Johnson',
      subject: 'Mathematics',
      department: 'Science',
      email: 'mr.johnson@school.edu'
    },
    {
      username: 'ms.smith',
      password: 'teacher123',
      name: 'Ms. Smith',
      subject: 'English',
      department: 'Humanities',
      email: 'ms.smith@school.edu'
    },
    {
      username: 'dr.lee',
      password: 'teacher123',
      name: 'Dr. Lee',
      subject: 'Physics',
      department: 'Science',
      email: 'dr.lee@school.edu'
    }
  ],

  // ==================== PARENTS ====================
  parents: [
    {
      username: 'parent.wilson',
      password: 'parent123',
      name: 'John Wilson',
      children: ['Emma Wilson'],
      email: 'john.wilson@email.com'
    },
    {
      username: 'parent.johnson',
      password: 'parent123',
      name: 'Jane Johnson',
      children: ['Alex Johnson'],
      email: 'jane.johnson@email.com'
    },
    {
      username: 'parent.brown',
      password: 'parent123',
      name: 'Mike Brown',
      children: ['Sarah Smith'],
      email: 'mike.brown@email.com'
    }
  ],

  // ==================== ADMINS ====================
  admins: [
    {
      username: 'admin',
      password: 'admin123',
      name: 'System Admin',
      email: 'admin@learnora.com'
    }
  ]
};

window.DemoCredentials = DemoCredentials;
