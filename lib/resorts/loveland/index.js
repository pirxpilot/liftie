import { findText } from '../../tools/domutil.js';

export default {
  selector: '.tablepress-table-name',
  parse(node) {
    const [name, status] = findText(node).split('-');
    return {
      name: name,
      status: status
    };
  }
};
