export default {
  selector: '.wp-block-p3-wpo-container:nth-child(3) .wp-block-column',
  parse: {
    name: 0,
    status: {
      child: '1/0/0',
      attribute: 'src',
      fn: src => (src.includes('EASIEST-9') ? 'open' : 'closed')
    }
  }
};
