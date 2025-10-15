module.exports = {
  selector: 'li.primary-option.lift-opt div.border-primary span',
  parse: {
    name: node => {
      // Get all text content from the span, excluding img elements
      const text = node.children
        .filter(c => c.type === 'text')
        .map(c => c.data)
        .join('')
        .trim();
      // Remove the " (Lift)" suffix
      return text.replace(/\s*\(Lift\)\s*$/i, '').trim();
    },
    status: {
      child: 0, // the img element
      attribute: 'src',
      fn: v => {
        // Extract status from image filename like '/img/sr/closed.svg'
        const match = v.match(/\/([^/]+)\.svg$/);
        return match ? match[1] : 'closed';
      }
    }
  }
};
