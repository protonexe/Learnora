const KnowledgeBase = ({ onClose }) => {
  const topics = [
    {title:'Getting Started',icon:'🚀'},
    {title:'Account Help',icon:'⚙️'},
    {title:'Billing',icon:'💳'},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>📖 Knowledge Base</h2>
      </div>
      <div style={{padding:20}}>
        {topics.map((t,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:16,background:'var(--bg-secondary)',borderRadius:12,marginBottom:8,border:'1px solid var(--border-color)',cursor:'pointer'}}>
            <span style={{fontSize:24}}>{t.icon}</span>
            <span style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{t.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
