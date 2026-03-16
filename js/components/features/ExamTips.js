const ExamTips = ({ onClose }) => {
  const tips = [
    {title:'Start Early',desc:'Begin studying at least 2 weeks before'},
    {title:'Practice Past Exams',desc:'Use previous exams to familiarize yourself'},
    {title:'Take Breaks',desc:'Short breaks improve retention'},
    {title:'Stay Healthy',desc:'Sleep well and stay hydrated'},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>💡 Exam Tips</h2>
      </div>
      <div style={{padding:20}}>
        {tips.map((t,i)=>(
          <div key={i} style={{background:'var(--bg-secondary)',borderRadius:12,padding:16,marginBottom:12,border:'1px solid var(--border-color)'}}>
            <div style={{fontSize:16,fontWeight:600,color:'var(--text-primary)',marginBottom:4}}>{t.title}</div>
            <div style={{fontSize:13,color:'var(--text-secondary)'}}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
