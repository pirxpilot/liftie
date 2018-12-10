module.exports = {
  selector: '.SnowReport-Lift',
  parse: {
    name: 1,
    status: {
      child: '0/1/0',
      attribute: 'class',
      regex: /pti-(\S+)$/
    }
  }
};
