export default {
  // trail tables share the same widget - anchor on the Ski Lifts heading
  selector: 'h3:contains(Ski Lifts) + div table tr',
  parse: {
    filter: row => row.children[0]?.name === 'td',
    name: '0/0',
    status: '1/0'
  }
};
