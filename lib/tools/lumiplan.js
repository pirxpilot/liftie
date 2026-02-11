import toTitleCase from 'to-title-case';

export default {
  selector: '.text:contains(Lifts) + .prl_affichage .prl_group',
  parse: {
    name: {
      child: '1/0',
      fn: toTitleCase
    },
    status: {
      child: '4/0',
      attribute: 'src',
      regex: /lp_runway_trail_(\w+)\.svg$|(\w)\.svg$/,
      fn: (statusWord, statusLetter) => {
        // Handle new bulletinv3 format (lp_runway_trail_opened.svg or lp_runway_trail_closed.svg)
        if (statusWord) {
          return statusWord === 'opened' ? 'open' : 'closed';
        }
        // Handle old bulletin format (O.svg, P.svg, etc.)
        if (statusLetter) {
          switch (statusLetter) {
            case 'O':
              return 'open';
            case 'P':
              return 'scheduled';
            default:
              return 'closed';
          }
        }
        return 'closed';
      }
    }
  }
};