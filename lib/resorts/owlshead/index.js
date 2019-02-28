module.exports = {
  selector: '.legende_title:contains(Lifts) + .legende_piste li',
  parse: {
    name: 2,
    status: {
      child: 3,
      attribute: 'class',
      regex: /legende_(\w+)$/
    }
  }
};
