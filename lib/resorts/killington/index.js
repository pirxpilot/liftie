module.exports = {
  selector: '.lift_and_trails_report td .lift-title',
  parse: {
    name: 0,
    status: node => node.parent.next.children[0].attribs.class.split('-').pop()
  }
};
