export default {
  // trail tables share the same widget - anchor on the Ski Lifts heading
  selector: 'h3:contains(Ski Lifts) + div table tr:has(td)',
  parse: {
    name: '0',
    status: '1/0'
  }
};
