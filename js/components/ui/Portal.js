const Portal = ({ children, container = document.body }) => {
  const [mountNode, setMountNode] = React.useState(null);

  React.useEffect(() => {
    const div = document.createElement('div');
    container.appendChild(div);
    setMountNode(div);
    return () => container.removeChild(div);
  }, [container]);

  return mountNode ? ReactDOM.createPortal(children, mountNode) : null;
};

window.Portal = Portal;
