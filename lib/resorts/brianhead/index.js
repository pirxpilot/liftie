export default {
  selector: 'li[class|=m-lift-status]',
  parse: {
    name: '1/0',
    status: {
      child: '.',
      attribute: 'class',
      regex: '-(open|closed)$'
    }
  }
};
