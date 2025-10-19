import * as domutil from '../../tools/domutil.js';

export default {
  selector: '.liftStatus tr',
  parse: {
    name(node) {
      const child = domutil.child(node, 0);
      return domutil.allText(child).split('-')[0];
    },
    status: 1
  }
};
