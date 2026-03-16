const CourseDetail = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'linear-gradient(135deg,#f43f5e,#ec4899)',padding:40,textAlign:'center',color:'white'}}>
        <button onClick={onClose} style={{position:'absolute',top:16,left:16,padding:'8px 12px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>←</button>
        <div style={{fontSize:48,marginBottom:16}}>📐</div>
        <h2 style={{margin:0,fontSize:24}}>Mathematics</h2>
        <p style={{opacity:0.8}}>12 Chapters • 24 Hours</p>
      </div>
      <div style={{padding:20}}>
        <div style={{background:'var(--primary)',color:'white',padding:16,borderRadius:12,textAlign:'center',marginBottom:16,fontWeight:600}}>Continue Learning</div>
        <h3 style={{fontSize:14,color:'var(--text-secondary)',marginBottom:12}}>Chapters</h3>
        {['1. Introduction','2. Algebra Basics','3. Linear Equations','4. Quadratic Functions'].map((c,i)=>(
          <div key={i} style={{padding:14,background:'var(--bg-secondary)',borderRadius:10,marginBottom:8,border:'1px solid var(--border-color)'}}>{c}</div>
        ))}
      </div>
    </div>
  );
};
