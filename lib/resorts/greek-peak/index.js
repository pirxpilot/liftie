import { allText } from '../../tools/domutil.js';

// day column cell carries lift-open/lift-closed class; in season the cell
// text is the opening time, so the class is the only reliable status signal
export default {
  selector: '#gp-lift-table tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const name = tds.find(c => c.attribs?.class?.includes('lift-col-name'));
    const day = tds.find(c => c.attribs?.class?.includes('lift-col-day'));
    const m = day?.attribs.class.match(/lift-(open|closed)/);
    if (name && m) {
      return { name: allText(name), status: m[1] };
    }
  }
};
