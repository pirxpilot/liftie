import { findText } from '../../tools/domutil.js';

export default {
  // both the lifts and the runs table have id="mpw-lifts" - anchor on the heading
  selector: '.elementor-widget-heading:contains(Alpine Lift Status) + .elementor-widget-shortcode #mpw-lifts tbody tr',
  parse: row => {
    const [name, status] = row.children.filter(c => c.name === 'td').map(findText);
    if (name && status) {
      return { name, status };
    }
  }
};
