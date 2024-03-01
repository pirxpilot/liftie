module.exports = {
  selector: 'h2:contains(Chairlift Status) + div.lemmony-accordion-content > div',
  parse: {
    name: '0/0',
    status: {
      child: '1/0/0',
      attribute: 'alt',
    }
  }
};
