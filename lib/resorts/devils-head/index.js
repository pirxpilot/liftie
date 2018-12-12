module.exports = {
  selector: 'h2:contains(Lift Status) < div + div .table-1 td:nth-child(odd)',
  parse: {
    name: 1,
    status: '+/0/0'
  }
};
