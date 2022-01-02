module.exports = {
  selector: 'ELEMENTGROUP[NAME="LIFT"]',
  parse: {
    filter: element => {
      console.log(element);
    }
  }
};

