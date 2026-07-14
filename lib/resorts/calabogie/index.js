export default {
  // trail status page is a grid of elementor headings flowing in triplets:
  // trail name, status, snowmaking state - no per-lift data;
  // anchor on the status headings, name is in the preceding widget container
  selector: '[class*=trail-grid] h3:contains(Open), [class*=trail-grid] h3:contains(Closed)',
  parse: {
    // some names carry a trailing zero-width space
    name: { child: '../../../-', regex: /^([^​]+)/ },
    status: '.'
  }
};
