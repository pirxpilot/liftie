var rating = require('rating'),
  day = 24 * 60 * 60 * 1000;

module.exports = render;
module.exports.section = 1;

// .powder
//   .powder-rating= resort.powder.rating
//   .notice
//     a

function render(div, powder) {
  var el;
  if (Date.now() - powder.timestamp > day) {
    return false;
  }
  el = div.querySelector('.powder-rating');
  el.innerHTML = '';
  if (typeof powder.rating === 'number') {
    rating(el, {
      star: '&#xe001;',
      value: powder.rating
    });
  }
  div.querySelector('.notice a')
    .setAttribute('href', 'http://whereshouldiski.com/#/resort/' + powder.id);
  return true;
}
