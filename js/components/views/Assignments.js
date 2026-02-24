const AssignmentsView = ({ assignments }) => {
  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const completedAssignments = assignments.filter(a => a.status === 'completed');

  return (
    <>
      <AnimatedCard delay={50}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Assignments
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Track your deadlines and submissions
          </p>
        </div>
      </AnimatedCard>
      
      {/* Pending */}
      <AnimatedCard delay={100}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="clock" size={18} color="var(--warning)" />
          Pending ({pendingAssignments.length})
        </h3>
      </AnimatedCard>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
        {pendingAssignments.map((a, idx) => (
          <AnimatedCard key={a.id} delay={150 + idx * 80}>
            <Card hover elevated padding="16px">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: 'var(--radius-md)', 
                    background: a.priority === 'high' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Icon name="file-text" size={20} color={a.priority === 'high' ? 'var(--danger)' : 'var(--warning)'} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{a.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>{a.subject}</p>
                  </div>
                </div>
                <Badge variant={a.priority === 'high' ? 'danger' : 'warning'} icon="clock">
                  Due in {a.due}
                </Badge>
              </div>
            </Card>
          </AnimatedCard>
        ))}
        {pendingAssignments.length === 0 && (
          <AnimatedCard delay={150}>
            <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-tertiary)' }}>
              <Icon name="check-circle" size={40} color="var(--success)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '14px' }}>All caught up! No pending assignments.</p>
            </div>
          </AnimatedCard>
        )}
      </div>
      
      {/* Completed */}
      <AnimatedCard delay={400}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon name="check-circle" size={18} color="var(--success)" />
          Completed ({completedAssignments.length})
        </h3>
      </AnimatedCard>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {completedAssignments.map((a, idx) => (
          <AnimatedCard key={a.id} delay={450 + idx * 80}>
            <Card padding="16px" style={{ opacity: 0.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: 'var(--radius-md)', 
                    background: 'rgba(16, 185, 129, 0.12)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <Icon name="check" size={20} color="var(--success)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{a.title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>{a.subject}</p>
                  </div>
                </div>
                <Badge variant="success" icon="check-circle">Completed</Badge>
              </div>
            </Card>
          </AnimatedCard>
        ))}
      </div>
    </>
  );
};

window.AssignmentsView = AssignmentsView;