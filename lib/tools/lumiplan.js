import toTitleCase from 'to-title-case';

export default {
  selector: '.POI_title:contains(Lifts) + .liaisons .POI_info',
  parse: {
    name: {
      child: '1/0/0',
      fn: toTitleCase
    },
    status: {
      child: '2/1',
      attribute: 'src',
      regex: /lp_runway_trail_(\w+)\.svg$/
    }
  }
};
