export default {
  // each lift renders as <details> with a lift-title row; the status icon div
  // carries title="open"/"closed" (occasionally a raw term id, coerced away)
  selector: 'div.lift-title',
  parse: {
    name: '1',
    status: {
      child: '0/0',
      attribute: 'title'
    }
  }
};
