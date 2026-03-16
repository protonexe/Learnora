const QuickStats = ({ onClose }) => {
  const stats = [
    {label:'Courses',value:'6'},
    {label:'Hours',value:'48'},
    {label:'Streak',value:'7'},
  ];

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        {stats.map((s,i)=>(
          <div key={i} style={{padding:'12px 24px',background:'var(--bg-secondary)',borderRadius:12,marginBottom:8,border:'1px solid var(--border-color)'}}>
            <span style={{fontSize:20,fontWeight:700,color:'var(--primary)'}}>{s.value}</span>
            <span style={{color:'var(--text-secondary)',marginLeft:8}}>{s.label}</span>
          </div>
        ))}
        <button onClick={onClose} style={{marginTop:16,padding:'10px 24px',borderRadius:8,border:'none',background:'var(--primary)',color:'white',cursor:'pointer'}}>Close</button>
      </div>
    </div>
  );
};
