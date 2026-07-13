export default {
  // trail tables use table.status.trail - skip them
  selector: 'table.status:not(.trail) tr:has(td)',
  parse: {
    name: '0',
    status: '1/0'
  }
};
