export default {
  selector: '.content-row',
  parse: {
    name: '2/0/0',
    status: node => node.attribs['data-show']
  }
};
