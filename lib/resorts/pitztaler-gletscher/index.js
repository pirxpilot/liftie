import { allText } from '../../tools/domutil.js';

// lift table in #liftStatus (pistes live in an identical table elsewhere);
// status is a colored dot - class "tableDot closed" or bare "tableDot" (open)
export default {
  selector: '#liftStatus table tbody tr',
  parse: row => {
    const cells = row.children.filter(c => c.name === 'td');
    const nameCell = cells.find(c => c.attribs?.scope === 'row' && c.attribs?.class?.includes('hideOnMobile'));
    const statusCell = cells.find(c => c.attribs?.class?.split(/\s+/).includes('status'));
    const dot = statusCell?.children.find(c => c.name === 'div' && c.attribs?.class?.includes('tableDot'));
    if (!nameCell || !dot) {
      return;
    }
    const status = dot.attribs.class.replace('tableDot', '').trim();
    return { name: allText(nameCell), status: status || 'open' };
  }
};
