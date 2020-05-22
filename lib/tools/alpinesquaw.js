// var debug = require('debug')('liftie:resort:alpinesquaw');
module.exports = function(resort) {
  return {
    selector: `#${resort}-report .lifts .row`,
    parse: {
      name: 0,
      status: {
        child: '4/0/0',
        attribute: 'class',
        fn: v => {
          var status = v.split('_').pop();
          if (status === "open") {
            return status;
          }
          else if (status === "close") {
            status = "closed";
            return status;
          }
          else if (status === "delayed") {
            status = "hold";
            return status;
          }
          else if (status === "scheduled") {
            status = "scheduled";
            return status;
          }
        }
      }
    }
  };
};