module.exports = {
  selector: 'img[alt="chairlift icon"]',
  parse: {
    name: '../1',
    status: {
      child: '../../2',
      attribute: 'class',
      fn: s => s.slice(5)
    }
  }
};
