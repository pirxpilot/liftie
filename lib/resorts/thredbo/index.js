module.exports = {
  selector: '.status-list-block:nth-of-type(-n+2) .status-block',
  parse: {
    name: '0/0',
    status: {
      child: '1/0/0',
      attribute: 'alt'
    }
  }
};
