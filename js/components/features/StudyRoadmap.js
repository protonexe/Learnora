const StudyRoadmap = ({ onClose }) => {
  const milestones = [
    {title:'Complete Basics',done:true},
    {title:'First Quiz',done:true},
    {title:'Week Streak',done:true},
    {title:'First Certificate',done:false},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>🗺️ Roadmap</h2>
      </div>
      <div style={{padding:20}}>
        {milestones.map((m,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
            <div style={{width:28,height:28,borderRadius:'50%',background:m.done?'#10b981':'var(--bg-secondary)',border:m.done?'none':'2px solid var(--border-color)',display:'flex',alignItems:'center',justifyContent:'center',color:m.done?'white':'var(--text-tertiary)',fontSize:12}}>
              {m.done && '✓'}
            </div>
            <span style={{fontSize:14,color:m.done?'var(--text-primary)':'var(--text-secondary)',textDecoration:m.done?'none':'none'}}>{m.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
