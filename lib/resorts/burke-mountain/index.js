export default {
  selector: '.fs-table tbody tr, #lifts tbody tr',
  parse: {
    filter: row => {
      const children = row.children.filter(c => c.type === 'tag');
      return children.length >= 2;
    },
    name: row => {
      const children = row.children.filter(c => c.type === 'tag');
      const nameCol = children[0];
      const getText = n => {
        if (n.type === 'text') return n.data;
        if (n.children) return n.children.map(getText).join('');
        return '';
      };
      const text = getText(nameCol).trim();
      return text.split(/\s\d/)[0].trim();
    },
    status: row => {
      const children = row.children.filter(c => c.type === 'tag');
      const openCol = children[1];
      const closedCol = children[2]; // Might be undefined in old 2-col layout

      // Helper for new site structure (uikit classes)
      const hasClass = (node, className) => {
        if (node.attribs?.class?.includes(className)) return true;
        if (node.children) return node.children.some(c => hasClass(c, className));
        return false;
      };

      // 1. Try New Logic (uk-text-success / danger inside col 1 or 2)
      if (hasClass(openCol, 'uk-text-success')) return 'open';
      if (closedCol && hasClass(closedCol, 'uk-text-danger')) return 'closed';

      // 2. Try Old Logic Fallback (Col 1 -> Child 0 -> Class attribute)
      // Corresponds to: child: '1/0', attribute: 'class'
      if (openCol && openCol.children) {
        const statusNode = openCol.children.filter(c => c.type === 'tag')[0];
        if (statusNode?.attribs?.class) {
          // Return the class content (e.g., 'open', 'closed')
          // Liftie usually maps this, but returning the raw class is often sufficient/expected
          return statusNode.attribs.class;
        }
      }

      return 'closed';
    }
  }
};
