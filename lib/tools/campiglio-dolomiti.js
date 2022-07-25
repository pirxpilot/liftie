module.exports = index => ({
  selector: `.piste-overview:nth-of-type(${index}) .col-6:first-child dt`,
  parse: {
    name: 2,
    status: {
      child: '0',
      attribute: 'title'
    }
  }
});
