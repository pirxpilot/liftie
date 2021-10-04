module.exports = {
  selector: '.lift-status-section .lift-status-info',
  parse: {
    name: 2,
    status: {
      child: '0/0',
      attribute: 'class',
      regex: '_([a-z]+)$'
    }
  }
};
