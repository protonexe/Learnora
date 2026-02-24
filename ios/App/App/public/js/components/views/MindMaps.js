const MindMapsView = ({ onOpenMindMap }) => {
  const mindMaps = [
    { title: 'Physics Concepts', nodes: 12, lastEdited: '2 days ago', color: '#14b8a6' },
    { title: 'Math Formulas', nodes: 24, lastEdited: '5 hours ago', color: '#f43f5e' },
    { title: 'Chemistry Bonds', nodes: 8, lastEdited: '1 week ago', color: '#0ea5e9' }
  ];

  const templates = [
    { title: 'Concept Map', icon: 'share-2', desc: 'Central idea with branches' },
    { title: 'Flow Chart', icon: 'git-branch', desc: 'Process flow diagram' },
    { title: 'Timeline', icon: 'clock', desc: 'Chronological events' },
    { title: 'Comparison', icon: 'columns', desc: 'Side-by-side analysis' }
  ];

  return (
    <>
      {/* Header */}
      <AnimatedCard delay={50}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '24px' 
        }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
              Mind Maps
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Visualize concepts, organize thoughts, and connect ideas
            </p>
          </div>
          <Button 
            icon="plus" 
            onClick={onOpenMindMap}
            style={{ 
              background: 'var(--accent-blue)', 
              color: 'var(--bg-primary)',
              padding: '10px 20px',
              fontWeight: '600'
            }}
          >
            Create Mind Map
          </Button>
        </div>
      </AnimatedCard>
      
      {/* Quick Templates */}
      <AnimatedCard delay={100}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: 'var(--text-secondary)', 
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Start with a Template
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
            gap: '12px' 
          }}>
            {templates.map((template, idx) => (
              <div 
                key={idx} 
                onClick={onOpenMindMap}
                style={{ 
                  padding: '16px', 
                  background: 'var(--bg-primary)', 
                  borderRadius: 'var(--radius-md)', 
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  border: '1px solid var(--border-color)',
                  ':hover': {
                    borderColor: 'var(--accent-blue)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Icon name={template.icon} size={20} color="var(--accent-blue)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {template.title}
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  {template.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedCard>
      
      {/* My Mind Maps */}
      <AnimatedCard delay={150}>
        <Card elevated style={{ padding: '20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '16px' 
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>My Mind Maps</h3>
            <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
              {mindMaps.length} maps
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mindMaps.map((map, idx) => (
              <div 
                key={idx} 
                onClick={onOpenMindMap}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: 'var(--radius-md)', 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid transparent',
                  ':hover': {
                    borderColor: 'var(--border-color)',
                    background: 'var(--bg-tertiary)'
                  }
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: `linear-gradient(135deg, ${map.color}15, ${map.color}08)`,
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${map.color}30`,
                  flexShrink: 0
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={map.color} strokeWidth="2">
                    <circle cx="12" cy="5" r="3" />
                    <circle cx="5" cy="19" r="3" />
                    <circle cx="19" cy="19" r="3" />
                    <line x1="12" y1="8" x2="5" y2="16" />
                    <line x1="12" y1="8" x2="19" y2="16" />
                  </svg>
                </div>
                
                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: 'var(--text-primary)',
                    marginBottom: '3px'
                  }}>
                    {map.title}
                  </h4>
                  <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    fontSize: '12px', 
                    color: 'var(--text-tertiary)'
                  }}>
                    <span>{map.nodes} nodes</span>
                    <span>•</span>
                    <span>Edited {map.lastEdited}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    style={{
                      padding: '6px',
                      background: 'transparent',
                      border: '2px solid var(--border-strong)',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      opacity: 0.6,
                      transition: 'opacity 0.2s'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Duplicate functionality
                    }}
                  >
                    <Icon name="copy" size={16} color="var(--text-tertiary)" />
                  </button>
                  <button 
                    style={{
                      padding: '6px',
                      background: 'transparent',
                      border: '2px solid var(--border-strong)',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      opacity: 0.6,
                      transition: 'opacity 0.2s'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Delete functionality
                    }}
                  >
                    <Icon name="trash-2" size={16} color="var(--danger)" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State (shown if no maps) */}
          {mindMaps.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              color: 'var(--text-tertiary)'
            }}>
              <Icon name="share-2" size="32" style={{ marginBottom: '12px', opacity: 0.5 }} />
              <p style={{ fontSize: '14px' }}>No mind maps yet. Create your first one!</p>
            </div>
          )}
        </Card>
      </AnimatedCard>
      
      {/* Tips Section */}
      <AnimatedCard delay={200}>
        <div style={{ 
          marginTop: '24px',
          padding: '16px 20px',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Icon name="lightbulb" size={16} color="var(--accent-yellow)" />
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Pro Tip
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Start with a central concept and branch out to sub-topics. Use colors to categorize 
            different types of information for better visual memory retention.
          </p>
        </div>
      </AnimatedCard>
    </>
  );
};

window.MindMapsView = MindMapsView;
