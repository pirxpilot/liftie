function img2status(img) {
  var m = /st-(\S+\S+)\.png$/.exec(img);
  return m && m[1];
}

module.exports = {
  selector: '.lift',
  parse: {
    name: '0/0',
    status: {
      child: '1/0',
      attribute: 'src',
      fn: img2status
    }
  }
};
