export default {
  selector: '.rm',
  parse: {
    name: 2,
    status: {
      child: 0,
      attribute: 'class',
      fn: v => v.split(' ').pop()
    }
  }
};
