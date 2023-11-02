const toTitleCase = require("to-title-case");

module.exports = {
  selector: '.text:contains(Lifts) + .prl_affichage .prl_group',
  parse: {
    name: {
      child: '1/0',
      fn: toTitleCase
    },
    status: {
      child: '4/0',
      attribute: 'src',
      regex: /(.)\.svg$/,
      fn: statusLetter => {
        switch (statusLetter) {
          case 'O':
            return 'open';
          case 'P':
            return 'scheduled';
          default:
            return 'closed';
        }
      }
    }
  }
};
