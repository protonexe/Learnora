const DebugPanel = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'#f43f5e',padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
        <button onClick={onClose} style={{padding:'8px 12px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.2)',color:'white',cursor:'pointer'}}>← Back</button>
        <h2 style={{margin:0,fontSize:20,color:'white'}}>🔧 Debug</h2>
      </div>
      <div style={{padding:20}}>
        <div style={{background:'var(--bg-secondary)',borderRadius:12,padding:16,border:'1px solid var(--border-color)',fontFamily:'monospace',fontSize:12}}>
          <div>Version: 1.0.0</div>
          <div>API: Connected</div>
          <div>Storage: 2.3GB used</div>
        </div>
      </div>
    </div>
  );
};
