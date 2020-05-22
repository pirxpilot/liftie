module.exports = function(resort) {
  return {
    selector: `#${resort}-report .lifts .row`,
    parse: {
      name: 0,
      status: {
        child: '4/0/0',
        attribute: 'class',
        fn: v => v.split('_').pop()
      }
    }
  };
};
