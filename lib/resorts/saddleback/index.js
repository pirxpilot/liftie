module.exports = {
  selector: '.weather-conditions + .ski-info-container tbody tr',
  parse: {
    name: '0',
    status: {
      child: '1/0/0',
      attribute: 'class',
      regex: /icon_snowreport_([a-z]+)$/
    }
  }
};
