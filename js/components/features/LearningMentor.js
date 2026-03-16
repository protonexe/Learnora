const LearningMentor = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>🎓 Mentor</h2>
      </div>
      <div style={{padding:40,textAlign:'center'}}>
        <div style={{fontSize:64,marginBottom:16}}>👨‍🏫</div>
        <h3 style={{margin:'0 0 8px 0',fontSize:18}}>Get Expert Help</h3>
        <p style={{color:'var(--text-secondary)',marginBottom:24}}>Connect with experienced mentors</p>
        <button style={{padding:'12px 24px',borderRadius:12,border:'none',background:'var(--primary)',color:'white',cursor:'pointer',fontWeight:600}}>Find Mentor</button>
      </div>
    </div>
  );
};
