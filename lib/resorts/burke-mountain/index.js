export default {
  selector: '.uk-h2:contains(Lift Status) + .fs-table tbody tr',
  parse: {
    name: {
      child: '0/0',
      regex: /(.*?)(\s+\d|$)/s
    },
    status: row => {
      const children = row.children.filter(c => c.type === 'tag');
      const openCol = children[1];
      const closedCol = children[2]; // Might be undefined in old 2-col layout

      // Helper for new site structure (uikit classes)
      const hasClass = (node, className) => {
        if (node?.attribs?.class?.includes(className)) return true;
        if (node?.children) return node.children.some(c => hasClass(c, className));
        return false;
      };

      // New Logic (uk-text-success / danger inside col 1 or 2)
      if (hasClass(openCol, 'uk-text-success')) return 'open';
      if (hasClass(closedCol, 'uk-text-danger')) return 'closed';
    }
  }
};
