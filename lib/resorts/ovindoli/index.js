module.exports = {
  selector: 'table:contains("Nome"):contains("Tipo"):contains("Stato") tbody tr',
  parse: {
    name: '0/0',
    status: {
      child: '2/0/0/1',
      regex: /(Aperto|Chiuso)/
    },
  },
};
