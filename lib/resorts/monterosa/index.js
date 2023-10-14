module.exports = {
  selector: ".modulo-impianti__img.skirama div.skirama-icon[data-type='lift']",
  parse: {
    name: {
      attribute: 'title',
    },
    status: {
      attribute: 'data-status',
    }
  }
};
