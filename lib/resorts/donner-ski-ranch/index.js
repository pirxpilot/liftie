export default {
  // lift status is a hand-edited Squarespace rich text block:
  // <p>Chair 1: <strong>Open</strong></p>
  selector: '.sqs-html-content p > strong',
  parse: {
    name: { child: '-', regex: /^\s*(.+?):\s*$/ },
    status: '.'
  }
};
