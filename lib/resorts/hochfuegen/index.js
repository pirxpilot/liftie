import * as domutil from '../../tools/domutil.js';

export default {
  selector: 'h3:contains(Lifte) ~ table .liftrows',
  parse(node) {
    return {
      name: domutil.childText(node, '2/0'),
      status: domutil.child(node, '0/0/0').attribs.alt
    };
  }
};
