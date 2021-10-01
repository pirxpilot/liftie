module.exports = {
  selector: '#container_elenco_impianti_pi .impiantipiste .dati.riga:nth-child(n+3):nth-child(-n+16)',
  parse: {
    name: 1,
    status: {
      child: '0/0',
      attribute: 'title'
    }
  }
};
