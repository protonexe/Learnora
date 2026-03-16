const CourseSearch = ({ onClose }) => {
  return (
    <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'var(--bg-primary)',zIndex:1000,overflow:'auto'}}>
      <div style={{background:'var(--bg-secondary)',borderBottom:'1px solid var(--border-color)',padding:'16px 20px'}}>
        <input type="text" placeholder="Search courses..." style={{width:'100%',padding:'12px',borderRadius:8,border:'1px solid var(--border-color)',background:'var(--bg)'}}/>
      </div>
      <div style={{padding:20,textAlign:'center',color:'var(--text-secondary)'}}>Type to search courses</div>
    </div>
  );
};
