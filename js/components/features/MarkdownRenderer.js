const MarkdownRenderer = ({ content = '' }) => {
  // Simple markdown parser
  const parseMarkdown = (text) => {
    if (!text) return '';

    let html = text
      // Headers
      .replace(/^### (.*$)/gm, '<h3 style="font-size:18px;font-weight:700;margin:16px 0 8px;">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px;">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 style="font-size:24px;font-weight:700;margin:24px 0 12px;">$1</h1>')
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre style="background:var(--bg-tertiary);padding:12px;border-radius:8px;overflow:auto;"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code style="background:var(--bg-tertiary);padding:2px 6px;border-radius:4px;font-size:13px;">$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color:var(--primary-500);text-decoration:underline;">$1</a>')
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:12px 0;" />')
      // Lists
      .replace(/^\- (.*$)/gm, '<li style="margin:4px 0;">$1</li>')
      .replace(/^\* (.*$)/gm, '<li style="margin:4px 0;">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li style="margin:4px 0;list-style:decimal;">$1</li>')
      // Blockquotes
      .replace(/^> (.*$)/gm, '<blockquote style="border-left:3px solid var(--primary-500);padding-left:12px;color:var(--text-secondary);margin:12px 0;">$1</blockquote>')
      // Line breaks
      .replace(/\n\n/g, '</p><p style="margin:12px 0;line-height:1.6;">')
      .replace(/\n/g, '<br />');

    return `<p style="margin:12px 0;line-height:1.6;">${html}</p>`;
  };

  return (
    <div
      style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: 'var(--text-primary)'
      }}
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
};

window.MarkdownRenderer = MarkdownRenderer;
