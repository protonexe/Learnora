const PaymentHistory = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'var(--bg)',color:'var(--text-primary)',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20}}>💳 Payment History</h2>
      </div>
      <div style={{padding:20}}>
        {[
          {date:'March 15, 2026',amount:'$9.99',status:'Completed'},
          {date:'Feb 15, 2026',amount:'$9.99',status:'Completed'},
        ].map((p,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:16,background:'var(--bg-secondary)',borderRadius:12,marginBottom:8,border:'1px solid var(--border-color)'}}>
            <div><div style={{fontSize:14,fontWeight:600,color:'var(--text-primary)'}}>{p.date}</div><div style={{fontSize:12,color:'var(--text-secondary)'}}>{p.amount}</div></div>
            <span style={{padding:'4px 12px',background:'#10b98115',color:'#10b981',borderRadius:6,fontSize:12,fontWeight:600}}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
