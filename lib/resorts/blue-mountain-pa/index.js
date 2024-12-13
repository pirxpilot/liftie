const liftNames = [
  "Comet Quad",
  "Challenge Express",
  "Main Street Express",
  "Vista Chair",
  "Summit School Conveyor",
  "Frontier Conveyor Lower",
  "Frontier Conveyor Middle",
  "Frontier Conveyor Upper",
  "Valley School Triple",
  "Valley Conveyor Lower",
  "Valley Conveyor Middle",
  "Valley Conveyor Upper",
];

module.exports = {
  selector: ".wp-block-column.is-layout-flow.wp-block-column-is-layout-flow",
  parse: {
    filter: (node) => {
      for (const child of Array.from(node.children)) {
        if (child.name === "h5" && child.children && child.children[0]) {
          const textContent = child.children[0].data;
          if (liftNames.includes(textContent.trim())) {
            return true;
          }
        }
      }
      return false;
    },
    name: "0",
    status: {
      child: "1/0/0",
      attribute: "src",
      fn: (src) => {
        return src.includes("EASIEST-9") ? "open" : "closed";
      },
    },
  },
};
