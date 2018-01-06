module.exports = {
  selector: '.hm-status_wrapper:not(.hm-status_collapsible) .hm-status',
  parse: {
    name: -1,
    status: {
      child: 0,
      attribute: 'class',
      fn: text => text.split('_').pop()
    }
  }
};
