module.exports = {
  name: 'Snowmass',
  url: {
    host: 'http://www.aspensnowmass.com',
    pathname: '/snowmass/grooming'
  },
  tags: ['Colorado', 'Aspen'],
  parse: require('../tools/aspen')
};
