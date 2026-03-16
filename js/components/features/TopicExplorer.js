const TopicExplorer = ({ onClose }) => {
  const topics = [
    {name:'Calculus',courses:12,icon:'📐'},
    {name:'Physics',courses:8,icon:'⚛️'},
    {name:'Chemistry',courses:6,icon:'🧪'},
    {name:'Biology',courses:10,icon:'🧬'},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>🔍 Explore Topics</h2>
      </div>
      <div style={{padding:20,display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
        {topics.map((t,i)=>(
          <div key={i} style={{background:'var(--bg-secondary)',borderRadius:12,padding:16,border:'1px solid var(--border-color)',textAlign:'center',cursor:'pointer'}}>
            <div style={{fontSize:32,marginBottom:8}}>{t.icon}</div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{t.name}</div>
            <div style={{fontSize:12,color:'var(--text-secondary)'}}>{t.courses} courses</div>
          </div>
        ))}
      </div>
    </div>
  );
};
