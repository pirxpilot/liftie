import { allText } from '../../tools/domutil.js';

export default {
  selector: 'li.primary-option.lift-opt div.border-primary span',
  parse: {
    name: node => {
      // Get all text content from the span, excluding img elements
      const text = allText(node);
      // Remove the " (Lift)" suffix
      return text.replace(/\s+\(Lift\)\s*$/i, '');
    },
    status: {
      child: 0, // the img element
      attribute: 'src',
      regex: /\/([^/]+)\.svg$/
    }
  }
};
