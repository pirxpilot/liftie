var assert = require('assert');
var parse = require('../../lib/resorts/steamboat');

var data = [{
  "HighSpeed": "False",
  "Hours": "9:30 AM - 2:30 PM",
  "Name": "Bar U E",
  "Status": "0",
  "Type": "0"
}, {
  "HighSpeed": "False",
  "Hours": "9:00 AM - 4:00 PM",
  "Name": "Bashor",
  "Status": "0",
  "Type": "0"
}, {
  "HighSpeed": "False",
  "Hours": "8:45 AM - 3:30 PM",
  "Name": "Burgess Creek",
  "Status": "0",
  "Type": "1"
}, {
  "HighSpeed": "False",
  "Hours": "8:30 AM - 1:00 PM",
  "Name": "Christie III",
  "Status": "1",
  "Type": "1"
}, {
  "HighSpeed": "True",
  "Hours": "8:30 AM - 4:00 PM",
  "Name": "Christie Peak Express",
  "Status": "0",
  "Type": "3"
}, {
  "HighSpeed": "False",
  "Hours": "9:00 AM - 3:45 PM",
  "Name": "Elkhead",
  "Status": "0",
  "Type": "2"
}, {
  "HighSpeed": "False",
  "Hours": "8:45 AM - 3:15 PM",
  "Name": "Four Points",
  "Status": "0",
  "Type": "1"
}, {
  "HighSpeed": "True",
  "Hours": "8:30 AM - 4:00 PM",
  "Name": "Gondola",
  "Status": "0",
  "Type": "4"
}, {
  "HighSpeed": "False",
  "Hours": "9:00 AM - 3:00 PM",
  "Name": "Morningside",
  "Status": "0",
  "Type": "1"
}, {
  "HighSpeed": "True",
  "Hours": "9:00 AM - 3:15 PM",
  "Name": "Pony Express",
  "Status": "0",
  "Type": "2"
}, {
  "HighSpeed": "False",
  "Hours": "9:00 AM - 4:00 PM",
  "Name": "Preview",
  "Status": "0",
  "Type": "1"
}, {
  "HighSpeed": "False",
  "Hours": "12:00 PM - 3:15 PM",
  "Name": "Priest Creek",
  "Status": "1",
  "Type": "0"
}, {
  "HighSpeed": "False",
  "Hours": "10:00 AM - 3:30 PM",
  "Name": "Rough Rider",
  "Status": "0",
  "Type": "10"
}, {
  "HighSpeed": "False",
  "Hours": "9:00 AM - 3:30 PM",
  "Name": "South Peak",
  "Status": "0",
  "Type": "1"
}, {
  "HighSpeed": "True",
  "Hours": "9:00 AM - 3:15 PM",
  "Name": "Storm Peak Express",
  "Status": "0",
  "Type": "2"
}, {
  "HighSpeed": "True",
  "Hours": "9:00 AM - 3:15 PM",
  "Name": "Sundown Express",
  "Status": "0",
  "Type": "2"
}, {
  "HighSpeed": "True",
  "Hours": "9:00 AM - 3:15 PM",
  "Name": "Sunshine Express",
  "Status": "0",
  "Type": "2"
}, {
  "HighSpeed": "True",
  "Hours": "8:35 AM - 3:45 PM",
  "Name": "Thunderhead Express",
  "Status": "0",
  "Type": "2"
}];

/*global describe, it */
describe('parse steamboat', function() {

  it('should return lift status', function() {
    var status = parse(data),
      expected = {
        'Bar U E': 'open',
        'Bashor': 'open',
        'Burgess Creek': 'open',
        'Christie III': 'closed',
        'Christie Peak Express': 'open',
        'Elkhead': 'open',
        'Four Points': 'open',
        'Gondola': 'open',
        'Morningside': 'open',
        'Pony Express': 'open',
        'Preview': 'open',
        'Priest Creek': 'closed',
        'Rough Rider': 'open',
        'South Peak': 'open',
        'Storm Peak Express': 'open',
        'Sundown Express': 'open',
        'Sunshine Express': 'open',
        'Thunderhead Express': 'open'
      };
    assert.deepEqual(status, expected);
  });
});