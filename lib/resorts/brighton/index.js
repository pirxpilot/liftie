module.exports = {
  selector: 'section[id^="conditions_lifts"] li > div',
  parse: {
    name: 1,
    status: {
      child: '0/0',
      attribute: 'alt',
    }
  }
};
