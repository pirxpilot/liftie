module.exports = {
  selector: '.skilifts .skilift',
  parse: {
    name: 1,
    status: {
      child: 0,
      attribute: 'class',
      regex: / ([a-z]+)$/
    }
  }
};
