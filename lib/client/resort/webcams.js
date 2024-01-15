const swipe = require('swipe');
const pager = require('pager');

/*global setInterval,clearInterval */

module.exports = render;
module.exports.section = 1;
module.exports.type = 'webcams';

const DELAY = 15 * 60 * 1000; // update every 15 minutes


function swiper(el) {
  const ui = {
    swipe: swipe(el.swipe),
    pager: pager(el.pager)
  };

  function refresh(count) {
    ui.swipe.refresh();
    ui.pager.total(count).render();

    // hide/show pager
    el.pager.classList.toggle('hidden', count < 2);
  }

  function current() {
    return ui.swipe.currentVisible;
  }

  ui.pager.on('show', n => {
    ui.swipe.show(n, null, {
      silent: true
    });
  });
  ui.swipe.on('show', n => {
    ui.pager.select(n, {
      silent: true
    });
  });

  return {
    refresh,
    current
  };
}


function render(div, webcams) {
  let cams;
  let timer;
  let ui;

  function refresh() {
    cams.forEach(it => {
      const imgs = it.node.querySelectorAll('img');
      const fn = swap.bind(null, imgs, it);
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].onload = fn;
      }
      imgs[it.inactive].setAttribute('src', imgs[it.active].getAttribute('src'));
    });
  }

  // div.webcam
  //   a
  //     img.active
  //     img.inactive
  //     .title
  //   .notice

  function initCam(cam, { source, image, name, notice }) {
    cam.querySelector('a').setAttribute('href', source);
    cam.querySelector('img.active').setAttribute('src', image);
    cam.querySelector('img.inactive').setAttribute('src', '');
    cam.querySelector('.title').innerHTML = name;
    cam.querySelector('.notice').innerHTML = notice || '';
    cams.push({
      node: cam,
      active: 0,
      inactive: 1
    });
  }

  function init() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
    cams = [];
    const ul = div.querySelector('ul');
    const li = ul.querySelectorAll('li');
    webcams.forEach((webcam, i) => {
      let cam;
      if (i < li.length) {
        cam = li[i];
      } else {
        cam = ul.appendChild(li[0].cloneNode(true));
      }
      initCam(cam.querySelector('.webcam'), webcam);
    });
    for (let i = Math.max(1, webcams.length); i < li.length; i++) {
      ul.removeChild(li[i]);
    }
    if (!ui) {
      ui = swiper({
        swipe: div.querySelector('.swipe'),
        pager: div.querySelector('.pager')
      });
    }
    ui.refresh(webcams.length);

    if (!cams.length) {
      return false;
    }

    timer = setInterval(refresh, DELAY);
    return true;
  }

  function swap(imgs, it) {
    it.active = (it.active + 1) % 2;
    it.inactive = (it.inactive + 1) % 2;
    imgs[it.inactive].setAttribute('class', 'inactive');
    imgs[it.active].setAttribute('class', 'active');
    imgs[it.inactive].setAttribute('src', '');
  }

  // called every minute
  init();
}
