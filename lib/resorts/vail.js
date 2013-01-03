module.exports = {
  name: 'Vail',
  url: {
    host: 'http://www.vail.com',
    pathname: '/mountain/current-conditions/whats-open-today.aspx#Lifts#Top'
  },
  tags: ['Colorado'],
  parse: require('../tools/vail')
};
