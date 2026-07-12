import { allText, findText } from '../../tools/domutil.js';

// lift table is `table.status` with td.title/td.summit cells;
// trail tables use `table.status.trail` with different cell classes
export default {
  selector: 'table.status tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const title = tds.find(c => c.attribs?.class === 'title');
    const status = tds.find(c => c.attribs?.class === 'summit');
    if (title && status) {
      return { name: allText(title), status: findText(status) };
    }
  }
};
