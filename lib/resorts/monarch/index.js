import { allText } from '../../tools/domutil.js';

export default {
  selector: '.lifts-table tbody tr',
  parse: {
    name: {
      child: 0, // First td contains the lift name
      // Strip out "(Tubing Park)" or similar suffixes
      fn: v => v.replace(/\s+\(.+\)\s*$/, '')
    },
    status: {
      child: 1, // Second td
      fn: node => {
        // Get the span text which contains "Closed", "Open", etc.
        const span = node.children?.find(c => c.name === 'span');
        return span ? allText(span) : 'closed';
      }
    }
  }
};
