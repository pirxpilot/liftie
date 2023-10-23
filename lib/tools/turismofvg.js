module.exports = {
  // Can't use `.c-snowreportdetail__tablerowcontent@landscape` because the @ symbol breaks the selector
  selector: '[class*="c-snowreportdetail__tablerowcontent@landscape"]',
  parse: {
    name: {
      child: '1/0',
    },
    status: {
      child: '0',
      attribute: 'class',
      regex: /o\-status\-\-(\w+)$/,
    },
  },
};
