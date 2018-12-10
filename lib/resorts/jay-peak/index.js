module.exports = {
  selector: '.SnowReport-Lift',
  parse: {
    name: 0,
    status: {
      child: '2/1/0',
      attribute: 'class',
      regex: /pti-(\S+)$/
    }
  }
};
