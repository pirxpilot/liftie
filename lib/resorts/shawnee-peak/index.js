module.exports = {
  selector: '.trailCategory:nth-last-child(2) .trailRow__name',
  parse: {
    name: 1,
    status: {
      child: '0',
      attribute: 'alt'
    }
  }
};
