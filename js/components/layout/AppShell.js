const AppShell = ({ sidebar, main, header, footer }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      {header && <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>{header}</header>}
      <div style={{ display: 'flex', flex: 1 }}>
        {sidebar && <aside style={{ width: '240px', flexShrink: 0 }}>{sidebar}</aside>}
        <main style={{ flex: 1, minWidth: 0 }}>{main}</main>
      </div>
      {footer && <footer>{footer}</footer>}
    </div>
  );
};

window.AppShell = AppShell;
