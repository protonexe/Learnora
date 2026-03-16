import React from 'react';
import { X, FileText, Download, Share2, Printer, Eye, Calendar, Clock, User, BookOpen, Check, Star } from './Icon';

const CertificateGallery = ({ onClose }) => {
  const certificates = [
    { id: 1, title: 'Advanced Physics', date: 'Jan 15, 2024', instructor: 'Dr. Sarah Chen', grade: 'A+', icon: '⚛️', color: '#3b82f6' },
    { id: 2, title: 'Calculus Mastery', date: 'Dec 20, 2023', instructor: 'Prof. James', grade: 'A', icon: '📐', color: '#10b981' },
    { id: 3, title: 'Chemistry Fundamentals', date: 'Nov 10, 2023', instructor: 'Dr. Emily', grade: 'A-', icon: '🧪', color: '#f59e0b' },
  ];
  
  return (
    <div style={{ background: 'var(--card-bg)', borderRadius: 16, width: 500, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>🏆 My Certificates</h3>
          <button onClick={onClose} style={{ padding: 4, borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {certificates.map(cert => (
            <div key={cert.id} style={{ background: 'var(--bg)', borderRadius: 12, padding: 16, border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: 40, marginBottom: 12, textAlign: 'center' }}>🎓</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, textAlign: 'center' }}>{cert.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 8 }}>{cert.instructor}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
                <span>📅 {cert.date}</span>
                <span style={{ background: cert.color + '20', color: cert.color, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Grade: {cert.grade}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, padding: '8px', borderRadius: 6, border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontSize: 12 }}>Download</button>
                <button style={{ padding: 8, borderRadius: 6, border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateGallery;
