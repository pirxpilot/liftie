export default {
  // several pp-table widgets on the page (trails, parking, tubing) -
  // pick the one whose header is LIFTS
  selector: 'table:has(th:contains(LIFTS)) tbody tr',
  parse: {
    name: {
      child: '0/0',
      // drop trailing notes like "(open 10am-4pm during April operations)"
      regex: /^\s*([^(]+?)\s*(?:\(|$)/
    },
    status: '1/0'
  }
};
