import { allText, findText } from '../../tools/domutil.js';

// lift status is a hand-edited Squarespace rich text block:
// <p>Chair 1: <strong>Open</strong></p>
export default {
  selector: '.sqs-html-content p',
  parse: p => {
    const m = allText(p).match(/^\s*(.+?):\s*$/);
    const strong = p.children.find(c => c.name === 'strong');
    if (m && strong) {
      return { name: m[1], status: findText(strong) };
    }
  }
};
