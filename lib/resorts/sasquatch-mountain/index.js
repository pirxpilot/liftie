module.exports = {
  selector: 'ELEMENTGROUP',
  parse: {
    filter: element => {
      console.log(element.attribs);
    },
    name: {
      child: '.',
      fn: element => {
        console.log(element);
      }
    },
    status: {
      
    }
  }
};

