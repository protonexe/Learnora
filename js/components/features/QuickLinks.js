const QuickLinks = ({ onClose }) => {
  const links = [
    {name:'Dashboard',icon:'🏠'},
    {name:'Courses',icon:'📚'},
    {name:'Settings',icon:'⚙️'},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px'}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
      </div>
      <div style={{padding:20}}>
        {links.map((l,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:16,background:'var(--bg-secondary)',borderRadius:12,marginBottom:8,border:'1px solid var(--border-color)'}}>
            <span style={{fontSize:20}}>{l.icon}</span>
            <span style={{fontSize:14,fontWeight:600}}>{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
