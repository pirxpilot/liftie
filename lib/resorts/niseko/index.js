module.exports = {
  selector: 'li[id^="liftList_tag"] ul[id]',
  parse: {
    name: '0/0',
    status: {
      child: '3/0/0',
      attribute: 'src',
      regex: /\/([A-Z]+)_PICT.png/
    }
  }
};
