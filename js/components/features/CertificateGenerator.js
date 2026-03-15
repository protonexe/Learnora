const CertificateGenerator = ({ course, userName, completionDate, showToast }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateCertificate = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const certificateWindow = window.open('', '_blank');
      certificateWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate of Completion - ${course.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body {
              font-family: 'Inter', sans-serif;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px;
            }
            
            .certificate {
              background: #fff;
              border-radius: 20px;
              padding: 60px;
              max-width: 900px;
              width: 100%;
              text-align: center;
              box-shadow: 0 25px 80px rgba(0,0,0,0.3);
              position: relative;
              overflow: hidden;
            }
            
            .certificate::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 8px;
              background: linear-gradient(90deg, #667eea, #764ba2, #f59e0b, #10b981);
            }
            
            .badge {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 30px;
              font-size: 40px;
              box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            }
            
            h1 {
              font-family: 'Playfair Display', serif;
              font-size: 42px;
              color: #1a1a2e;
              margin-bottom: 10px;
              letter-spacing: 2px;
            }
            
            .subtitle {
              font-size: 16px;
              color: #666;
              margin-bottom: 40px;
              text-transform: uppercase;
              letter-spacing: 3px;
            }
            
            .recipient {
              font-family: 'Playfair Display', serif;
              font-size: 52px;
              color: #667eea;
              margin: 20px 0;
              font-weight: 700;
            }
            
            .text {
              font-size: 18px;
              color: #444;
              margin-bottom: 15px;
              line-height: 1.6;
            }
            
            .course-name {
              font-size: 28px;
              font-weight: 700;
              color: #1a1a2e;
              margin: 20px 0;
            }
            
            .date {
              font-size: 14px;
              color: #888;
              margin-top: 40px;
              padding-top: 30px;
              border-top: 1px solid #eee;
            }
            
            .footer {
              display: flex;
              justify-content: space-between;
              margin-top: 50px;
              padding-top: 30px;
              border-top: 1px solid #eee;
            }
            
            .footer-item {
              text-align: center;
            }
            
            .footer-label {
              font-size: 12px;
              color: #888;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 5px;
            }
            
            .footer-value {
              font-size: 16px;
              font-weight: 600;
              color: #1a1a2e;
            }
            
            .seal {
              position: absolute;
              bottom: 40px;
              right: 40px;
              width: 100px;
              height: 100px;
              background: linear-gradient(135deg, #f59e0b, #ef4444);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 40px;
              opacity: 0.9;
              box-shadow: 0 5px 20px rgba(245, 158, 11, 0.4);
            }
            
            @media print {
              body { background: white; }
              .certificate { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="badge">🎓</div>
            <h1>CERTIFICATE</h1>
            <p class="subtitle">of Completion</p>
            
            <p class="text">This is to certify that</p>
            <p class="recipient">${userName || 'Student Name'}</p>
            
            <p class="text">has successfully completed the course</p>
            <p class="course-name">${course.name}</p>
            
            <p class="text">
              ${course.chapters || 0} chapters • ${course.progress || 100}% completed
            </p>
            
            <div class="date">
              Issued on ${completionDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            
            <div class="footer">
              <div class="footer-item">
                <div class="footer-label">Instructor</div>
                <div class="footer-value">Learnora Academy</div>
              </div>
              <div class="footer-item">
                <div class="footer-label">Certificate ID</div>
                <div class="footer-value">LN-${Date.now().toString(36).toUpperCase()}</div>
              </div>
              <div class="footer-item">
                <div class="footer-label">Platform</div>
                <div class="footer-value">Learnora</div>
              </div>
            </div>
            
            <div class="seal">🏆</div>
          </div>
        </body>
        </html>
      `);
      certificateWindow.document.close();
      
      setIsGenerating(false);
      showToast?.('Certificate generated!', 'success');
    }, 500);
  };

  return { generateCertificate, isGenerating };
};

const CertificateCard = ({ course, onGenerate }) => {
  const isMobile = window.innerWidth <= 768;
  
  if (course.progress < 100) return null;
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: isMobile ? '20px' : '24px',
      color: '#fff',
      marginTop: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0' }}>
            🎓 Course Completed!
          </h3>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
            Congratulations! You're eligible for a certificate
          </p>
        </div>
        <button
          onClick={onGenerate}
          style={{
            padding: '12px 24px',
            background: '#fff',
            color: '#667eea',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Icon name="award" size={18} />
          Get Certificate
        </button>
      </div>
    </div>
  );
};

window.CertificateGenerator = CertificateGenerator;
window.CertificateCard = CertificateCard;
