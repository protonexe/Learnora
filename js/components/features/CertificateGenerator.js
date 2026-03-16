import React from 'react';
import { Award, Download, Share2, Calendar, Clock, Star, CheckCircle } from './Icon';

const CertificateGenerator = ({ onClose }) => {
  const [certificate, setCertificate] = React.useState({
    name: 'John Doe',
    course: 'Advanced Physics',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    grade: 'A+',
    hours: 48
  });
  const [template, setTemplate] = React.useState(1);
  
  const templates = [
    { id: 1, name: 'Classic', colors: ['#1a1a2e', '#f5f5f5', '#c9a227'] },
    { id: 2, name: 'Modern', colors: ['#0f172a', '#1e293b', '#3b82f6'] },
    { id: 3, name: 'Elegant', colors: ['#1c1917', '#fafaf9', '#d97706'] },
    { id: 4, name: 'Nature', colors: ['#14532d', '#f0fdf4', '#22c55e'] },
  ];
  
  const downloadCertificate = () => {
    const content = `
╔══════════════════════════════════════════════════════════════════╗
║                        CERTIFICATE OF COMPLETION                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║        This is to certify that                                     ║
║                                                                   ║
║                    ${certificate.name.toUpperCase()}                     ║
║                                                                   ║
║        has successfully completed the course                      ║
║                                                                   ║
║                    ${certificate.course.toUpperCase()}                       ║
║                                                                   ║
║        Date: ${certificate.date}                                   ║
║        Study Hours: ${certificate.hours} hours                            ║
║        Grade: ${certificate.grade}                                          ║
║                                                                   ║
║                     Learnora Education Platform                   ║
║                                                                   ║
╚══════════════════════════════════════════════════════════════════╝
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${certificate.name.replace(/\s+/g, '_')}_${certificate.course.replace(/\s+/g, '_')}_Certificate.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const currentTemplate = templates.find(t => t.id === template) || templates[0];
  
  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: 16,
      padding: 24,
      maxWidth: 600
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Award size={20} /> Certificate Generator
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
              Your Name
            </label>
            <input
              type="text"
              value={certificate.name}
              onChange={(e) => setCertificate({ ...certificate, name: e.target.value })}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
              Course Name
            </label>
            <input
              type="text"
              value={certificate.course}
              onChange={(e) => setCertificate({ ...certificate, course: e.target.value })}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
                Grade
              </label>
              <input
                type="text"
                value={certificate.grade}
                onChange={(e) => setCertificate({ ...certificate, grade: e.target.value })}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: 'var(--text-secondary)', fontSize: 13 }}>
                Hours
              </label>
              <input
                type="number"
                value={certificate.hours}
                onChange={(e) => setCertificate({ ...certificate, hours: e.target.value })}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)', fontSize: 13 }}>
              Template Style
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: `2px solid ${template === t.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    margin: '0 auto 4px',
                    background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[2]})`
                  }} />
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{t.name}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={downloadCertificate}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 10,
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontWeight: 600
              }}
            >
              <Download size={18} /> Download
            </button>
            <button
              style={{
                padding: 14,
                borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'transparent',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
        
        <div style={{
          background: `linear-gradient(135deg, ${currentTemplate.colors[0]}, ${currentTemplate.colors[1]})`,
          borderRadius: 12,
          padding: 24,
          minHeight: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          border: `4px solid ${currentTemplate.colors[2]}`
        }}>
          <div style={{ fontSize: 10, color: currentTemplate.colors[2], letterSpacing: 4, marginBottom: 16 }}>
            CERTIFICATE OF COMPLETION
          </div>
          <div style={{ fontSize: 12, color: currentTemplate.colors[1], marginBottom: 16 }}>
            This is to certify that
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: currentTemplate.colors[2], marginBottom: 16 }}>
            {certificate.name}
          </div>
          <div style={{ fontSize: 12, color: currentTemplate.colors[1], marginBottom: 16 }}>
            has successfully completed
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: currentTemplate.colors[2], marginBottom: 20 }}>
            {certificate.course}
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: 11, color: currentTemplate.colors[1] }}>
            <span>📅 {certificate.date}</span>
            <span>⏱ {certificate.hours} hrs</span>
            <span>⭐ {certificate.grade}</span>
          </div>
          <div style={{ marginTop: 20, fontSize: 10, color: currentTemplate.colors[1], opacity: 0.7 }}>
            Learnora Education Platform
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
