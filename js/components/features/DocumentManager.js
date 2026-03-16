const DocumentManager = ({ onClose }) => {
  const docs = [
    {name:'Math Notes.pdf',date:'2026-03-15'},
    {name:'Physics Summary.docx',date:'2026-03-14'},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>📁 Documents</h2>
      </div>
      <div style={{padding:20}}>
        {docs.map((d,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:14,background:'var(--bg-secondary)',borderRadius:12,marginBottom:8,border:'1px solid var(--border-color)'}}>
            <span style={{fontSize:24}}>📄</span>
            <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{d.name}</div><div style={{fontSize:12,color:'var(--text-secondary)'}}>{d.date}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
};
