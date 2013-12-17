var swipe = require('swipe');
var pager = require('pager');
var classes = require('classes');

/*global setInterval,clearInterval */

module.exports = render;
module.exports.section = 1;

var DELAY = 15 * 60 * 1000; // update every 15 minutes


function swiper(el) {
  var ui = {
    swipe: swipe(el.swipe),
    pager: pager(el.pager)
  };

  function refresh(count) {
    ui.swipe.refresh();
    ui.pager.total(count).render();

    // hide/show pager
    if (count < 2) {
      classes(el.pager).add('hidden');
    } else {
      classes(el.pager).remove('hidden');
    }
  }

  function current() {
    return ui.swipe.currentVisible;
  }

  ui.pager.on('show', function(n) {
    ui.swipe.show(n, null, {
      silent: true
    });
  });
  ui.swipe.on('show', function(n) {
    ui.pager.select(n, {
      silent: true
    });
  });

  return {
    refresh: refresh,
    current: current
  };
}


function render(div, webcams) {
  var cams, timer, ui;

  function refresh() {
    cams.forEach(function (it) {
      var imgs, i, fn;
      imgs = it.node.querySelectorAll('img');
      fn = swap.bind(null, imgs, it);
      for (i = 0; i < imgs.length; i++) {
        imgs[i].onload = fn;
      }
      imgs[it.inactive].setAttribute('src', imgs[it.active].getAttribute('src'));
    });
  }

// div.webcam.mobile
//   a
//     img.active
//     img.inactive
//     .title
//   .notice

  function initCam(cam, webcam) {
    cam.querySelector('a').setAttribute('href', webcam.source);
    cam.querySelector('img.active').setAttribute('src', webcam.image);
    cam.querySelector('img.inactive').setAttribute('src', '');
    cam.querySelector('.title').innerHTML = webcam.name;
    cam.querySelector('.notice').innerHTML = webcam.notice || '';
    cams.push({
      node: cam,
      active: 0,
      inactive: 1
    });
  }

  function init() {
    var ul, li, i;
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
    cams = [];
    ul = div.querySelector('ul');
    li = ul.querySelectorAll('li');
    webcams.forEach(function (webcam, i) {
      var cam;
      if (i < li.length) {
        cam = li[i];
      }
      else {
        cam = ul.appendChild(li[0].cloneNode(true));
      }
      initCam(cam.querySelector('.desktop'), webcam);
      initCam(cam.querySelector('.mobile'), webcam.mobile || webcam);
    });
    for (i = Math.max(1, webcams.length); i < li.length; i++) {
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