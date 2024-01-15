/*global document, window */

function el(attrs) {
  const attrStr = Object.keys(attrs).map((attr) => `${attr}="${attrs[attr]}"`).join(' ');

  return ['<iframe ',
    attrStr,
    '></iframe>'
  ].join('');
}

function addWidget(parent, resort, style) {
  const query = style ? `?style=${encodeURIComponent(style)}` : '';
  let html = el({
    'class': `lift-status ${resort}`,
    src: `https://liftie.info/widget/resort/${resort}${query}`,
    scrolling: 'no'
  });
  html += '<p class="liftie-link">Lift status by <a href="https://liftie.info" target="_blank">Liftie</a></p>';
  parent.insertAdjacentHTML('afterBegin', html);
}

function receiveMessage(event) {
  // from liftie?
  if (!/^https?:\/\/liftie.info$/.test(event.origin)) {
    return;
  }
  // anything interesting?
  if (!event.data.height) {
    return;
  }
  const iframe = document.querySelector(`.liftie-widget[data-resort="${event.data.resort}"] iframe`);
  if (iframe) {
    iframe.style.height = `${event.data.height}px`;
  }
}

function embed() {
  let i;
  const els = document.querySelectorAll('.liftie-widget[data-resort]');
  if (els.length) {
    window.addEventListener("message", receiveMessage, false);
  }
  for (i = 0; i < els.length; i++) {
    addWidget(els[i], els[i].getAttribute('data-resort'), els[i].getAttribute('data-style'));
  }
}

embed();
