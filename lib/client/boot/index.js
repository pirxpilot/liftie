import about from '../about/index.js';
import minimax from '../minimax/index.js';
import resort from '../resort/index.js';
import state from '../state/index.js';
import stats from '../stats/index.js';
import tag from '../tag/index.js';
import height from './height.js';
import serviceWorker from './service-worker.js';

serviceWorker();
init();

function init() {
  const rnodes = Array.from(document.querySelectorAll('.resort'));

  const opens = state(rnodes, 'open', {
    on: 'shift + o',
    off: 'shift + x'
  });

  const starred = state(rnodes, 'starred');
  const starredTag = tag(document.querySelector('.tags .starred'));

  const resorts = rnodes.map(r => resort(r));

  resorts.forEach(r => {
    minimax(r.node, '.minimax')
      .state('open')
      .on(open => {
        if (open) {
          r.refresh(true);
        }
        opens.update();
      });
    minimax(r.node, '.star')
      .state('starred')
      .on(() => starredTag.update(starred.update().length));
    r.init();
  });
  window.setInterval(() => resorts.forEach(r => r.refresh()), 5 * 1000);
  about();
  opens.update();
  starredTag.update(starred.load().length);

  stats();
  height();
}
