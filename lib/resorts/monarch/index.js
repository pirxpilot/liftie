module.exports = {
  selector: '.lifts-table tbody tr',
  parse: {
    name: {
      child: 0,  // First td contains the lift name
      fn: v => {
        // Strip out "(Tubing Park)" or similar suffixes
        return v.replace(/\s*\([^)]*\)\s*$/, '').trim();
      }
    },
    status: {
      child: 1,  // Second td
      fn: node => {
        // Get the span text which contains "Closed", "Open", etc.
        const span = node.children?.find(c => c.name === 'span');
        if (span) {
          const text = span.children
            .filter(c => c.type === 'text')
            .map(c => c.data)
            .join('')
            .trim()
            .toLowerCase();
          return text;
        }
        return 'closed';
      }
    }
  }
};
