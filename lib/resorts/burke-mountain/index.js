function hasClass(node, className) {
  if (node?.attribs?.class?.includes(className)) return true;
  if (node?.children) return node.children.some(c => hasClass(c, className));
  return false;
}

export default {
  selector: '.uk-h2:contains(Lift Status) + .fs-table tbody tr',
  parse: {
    name: {
      child: '0/0',
      regex: /(.*?)(\s+\d|$)/s
    },
    // in season the table has separate Open and Closed columns; off season it
    // collapses to a single status column - look for the icon in any of them
    status: row => {
      const cols = row.children.filter(c => c.type === 'tag').slice(1);
      if (cols.some(col => hasClass(col, 'uk-text-success'))) return 'open';
      if (cols.some(col => hasClass(col, 'uk-text-warning'))) return 'hold';
      if (cols.some(col => hasClass(col, 'uk-text-danger'))) return 'closed';
    }
  }
};
