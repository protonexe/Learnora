const WeeklyGoals = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'linear-gradient(135deg,#f59e0b,#fbbf24)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20,color:'white'}}>🎯 Weekly Goals</h2>
      </div>
      <div style={{padding:20}}>
        {[
          {name:'Study 20 hours',cur:14,total:20},
          {name:'Complete 5 quizzes',cur:3,total:5},
          {name:'Review 3 chapters',cur:2,total:3},
        ].map((g,i)=>(
          <div key={i} style={{background:'var(--bg-secondary)',borderRadius:12,padding:16,marginBottom:12,border:'1px solid var(--border-color)'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
              <span style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{g.name}</span>
              <span style={{fontSize:14,fontWeight:700,color:'var(--primary)'}}>{Math.round(g.cur/g.total*100)}%</span>
            </div>
            <div style={{height:8,background:'var(--bg)',borderRadius:4}}>
              <div style={{height:'100%',width:(g.cur/g.total*100)+'%',background:'var(--primary)'}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
