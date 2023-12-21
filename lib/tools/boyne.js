module.exports = {
  selector: 'div.liftStatus-lift-icon',
  parse: {
    name: '+/0',
    status: {
      child: '0',
      attribute: 'alt'
    }
  }
};
