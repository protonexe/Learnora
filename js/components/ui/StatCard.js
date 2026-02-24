const StatCard = ({ icon, label, value, change, color, delay }) => (
  <AnimatedCard delay={delay}>
    <Card hover elevated style={{ 
      background: 'var(--bg-secondary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        background: `linear-gradient(135deg, ${color}15, ${color}05)`,
        borderRadius: '50%',
      }} />
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between', 
        marginBottom: '16px', 
        position: 'relative' 
      }}>
        <div style={{ 
          width: '52px', 
          height: '52px', 
          borderRadius: 'var(--radius-lg)', 
          background: `linear-gradient(135deg, ${color}20, ${color}10)`, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Icon name={icon} size={24} color={color} />
        </div>
        <Badge variant="success" size="sm">{change}</Badge>
      </div>
      <div style={{ 
        fontSize: '32px', 
        fontWeight: '800', 
        marginBottom: '4px', 
        letterSpacing: '-0.03em', 
        position: 'relative' 
      }}>
        {value}
      </div>
      <div style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: '500' }}>
        {label}
      </div>
    </Card>
  </AnimatedCard>
);

window.StatCard = StatCard;