module.exports = {
  selector: 'h4:contains(Lift Status) < .liftStat + .liftStat > .lift_title',
  parse: {
    name: '0/1',
    status: '+/0'
  }
};
