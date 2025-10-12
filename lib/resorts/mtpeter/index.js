export default {
  selector: '#content > div > div:nth-child(4) > div > table > tbody > tr', // selector for all <tr> elements under <tbody>
  parse: {
    filter: node => node.children.length > 0, // only process <tr> elements with children
    name: '0', // The first <td> in each <tr> (the name of the lift)
    status: {
      child: '1' // The second <td> in each <tr> (the status of the lift)
    }
  }
};
