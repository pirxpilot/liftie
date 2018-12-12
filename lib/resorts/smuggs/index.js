module.exports = {
  selector: 'lift description',
  parse
};

const regex = /<span class="title">(.+?)(?: Lift)?<\/span>/;

function parse(node) {
  // sending HTML as a part of XML CDATA - wrong on so many levels...
  const match = regex.exec(node.children[0].data);
  if (match) {
    return {
      name: match[1],
      status: node.parent.attribs.lift_status === "1" ? 'open' : "closed"
    };
  }
}
