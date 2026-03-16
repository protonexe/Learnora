const CourseProgress = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>📖 Course Progress</h2>
      </div>
      <div style={{padding:20}}>
        {[
          {name:'Mathematics',p:75,c:'#f43f5e'},
          {name:'Physics',p:60,c:'#14b8a6'},
          {name:'Chemistry',p:45,c:'#0ea5e9'},
        ].map((c,i)=>(
          <div key={i} style={{marginBottom:20}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
              <span style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{c.name}</span>
              <span style={{fontSize:14,fontWeight:700,color:c.c}}>{c.p}%</span>
            </div>
            <div style={{height:10,background:'var(--bg)',borderRadius:5}}>
              <div style={{height:'100%',width:c.p+'%',background:c.c,borderRadius:5}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
