const WeeklyProgress = ({ onClose }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [2.5, 3.2, 1.8, 4.0, 2.0, 3.5, 2.8];
  const max = Math.max(...hours);

  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>📊 Weekly Progress</h2>
      </div>
      <div style={{padding:20}}>
        <div style={{display:'flex',alignItems:'flex-end',gap:8,height:150}}>
          {hours.map((h,i)=>(
            <div key={i} style={{flex:1,textAlign:'center'}}>
              <div style={{background:'var(--primary)',borderRadius:'4px 4px 0 0',height:(h/max)*120,minHeight:10}}/>
              <div style={{fontSize:11,color:'var(--text-secondary)',marginTop:6}}>{days[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
