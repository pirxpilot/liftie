module.exports = {
  selector: 'h2:contains(Lift Status) ~ .weather-facility__item',
  parse: {
    name: 1,
    status: 0
  }
};
