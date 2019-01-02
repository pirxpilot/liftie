module.exports = {
  selector: '.legende_title:contains(Lifts) + .legende_piste li',
  parse: {
    name: 1,
    status: {
      child: 2,
      attribute: 'class',
      regex: /legende_(\w+)$/
    }
  }
};
