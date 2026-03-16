const SubjectCard = ({ onClose }) => {
  const subjects = [
    {name:'Math',progress:75,color:'#f43f5e',icon:'📐'},
    {name:'Science',progress:60,color:'#14b8a6',icon:'🔬'},
    {name:'History',progress:45,color:'#8b5cf6',icon:'📜'},
    {name:'English',progress:80,color:'#f59e0b',icon:'📝'},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>📚 Subjects</h2>
      </div>
      <div style={{padding:20,display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
        {subjects.map((s,i)=>(
          <div key={i} style={{background:'var(--bg-secondary)',borderRadius:12,padding:16,border:'1px solid var(--border-color)'}}>
            <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
            <div style={{fontSize:16,fontWeight:600,color:'var(--text-primary)',marginBottom:8}}>{s.name}</div>
            <div style={{height:6,background:'var(--bg)',borderRadius:3,overflow:'hidden'}}>
              <div style={{height:'100%',width:s.progress+'%',background:s.color}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
