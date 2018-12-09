module.exports = {
  selector: '.SnowReport-Lift',
  parse: {
    name: 0,
    status: {
      child: '1/1/0',
      attribute: 'class',
      regex: /pti-(\S+)$/
    }
  }
};
