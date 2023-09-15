module.exports = {
selector: "div.skidataliftstate[data-tag='lifts'] > table > tbody > tr:not(:first-child)",
  parse: {
    name: '3/1',
    status: {
      child: '0',
      attribute: 'class',
      regex: /(state state0|state state1|state state2)$/,
      fn: s => {
        if (s === 'state state1') {
          console.log('open');
          return 'open';
        } else if (s === 'state state0' || s === 'state state2'|| s === 'state state3'|| s === 'state state4') {
          console.log('closed');
          return 'closed';
        }
        console.log('unknown');
        return s;
      }
    }    
  }
};
