// Description
//   A Hubot script for voting
//
// Configuration:
//   None
//
// Commands:
//   hubot vote <N> - vote to <N>
//   hubot vote result - display voting result
//   hubot vote set <max> <items> - init hubot-vote
//
// Author:
//   bouzuya <m@bouzuya.net>
//
var table;

table = require('table-b');

module.exports = function(robot) {
  var count, data, result;
  data = null;
  count = function() {
    return data.items.reduce(function(sum, i) {
      return sum + i.users.length;
    }, 0);
  };
  result = function() {
    var lines;
    lines = table(data.items.map(function(i, index) {
      var r;
      r = [i.users.length + ':', "[" + (index + 1) + "] " + i.name];
      if (i.users.length) {
        return r.concat("(" + (i.users.join(',')) + ")");
      } else {
        return r;
      }
    }, ['r', 'l', 'l']));
    return "result (" + (count()) + "/" + data.max + "):\n" + lines;
  };
  robot.respond(/vote set (\d+) (.+)$/i, function(res) {
    var items, max;
    max = parseInt(res.match[1], 10);
    items = res.match[2].split(',').map(function(i) {
      return i.trim();
    }).map(function(i) {
      return {
        name: i,
        users: []
      };
    });
    return data = {
      max: max,
      items: items
    };
  });
  robot.respond(/vote result$/i, function(res) {
    return res.send(result());
  });
  return robot.respond(/vote (\d+)$/i, function(res) {
    var number;
    if (data == null) {
      return res.send('no data');
    }
    number = parseInt(res.match[1], 10);
    if (!(number <= data.items.length)) {
      return res.send('invalid number');
    }
    if (!(count() < data.max)) {
      return res.send('finished');
    }
    data.items[number - 1].users.push(res.envelope.user.name);
    return res.send(result());
  });
};
