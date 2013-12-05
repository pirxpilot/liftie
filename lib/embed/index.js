/*global document, window */

function el(attrs) {
  var attrStr = Object.keys(attrs).map(function(attr) {
    return attr +  '="' + attrs[attr] + '"';
  }).join(' ');

  return ['<iframe ',
    attrStr,
    '/>'
  ].join('');
}

function addWidget(parent, resort) {
  var html = el({
    'class': 'lift-status ' + resort,
    src: 'http://liftie.info/widget/resort/' + resort,
    scrolling: 'no'
  });

  parent.insertAdjacentHTML('afterBegin', html);
}

function receiveMessage(event)
{
  // from liftie?
  if (event.origin !== "http://liftie.info") {
    return;
  }
  // anything interesting?
  if (!event.data.height) {
    return;
  }
  var iframe = document.querySelector('iframe[src$="' + event.data.resort + '"]');
  if (iframe) {
    iframe.style.height = event.data.height + 'px';
  }
}

function embed() {
  var i, els = document.querySelectorAll('.liftie-widget[data-resort]');
  if (els.length) {
    window.addEventListener("message", receiveMessage, false);
  }
  for(i = 0; i < els.length; i++) {
    addWidget(els[i], els[i].getAttribute('data-resort'));
  }
}

embed();