# Description
#   A Hubot script for voting
#
# Configuration:
#   None
#
# Commands:
#   hubot vote <N> - vote to <N>
#   hubot vote result - display voting result
#   hubot vote set <max> <items> - init hubot-vote
#
# Author:
#   bouzuya <m@bouzuya.net>
#
table = require 'table-b'

module.exports = (robot) ->
  data = null

  count = ->
    data.items.reduce (sum, i) ->
      sum + i.users.length
    , 0

  result = ->
    lines = table(
      data.items.map (i, index) ->
        r = [i.users.length + ':', "[#{index + 1}] #{i.name}"]
        if i.users.length then r.concat("(#{i.users.join(',')})") else r
      , ['r', 'l', 'l'])
    """
    result (#{count()}/#{data.max}):
    #{lines}
    """

  robot.respond /vote set (\d+) (.+)$/i, (res) ->
    max = parseInt(res.match[1], 10)
    items = res.match[2].split(',').map((i) -> i.trim()).map (i) ->
      name: i
      users: []
    data = { max, items }

  robot.respond /vote result$/i, (res) ->
    res.send result()

  robot.respond /vote (\d+)$/i, (res) ->
    return res.send('no data') unless data?
    number = parseInt(res.match[1], 10)
    return res.send('invalid number') unless number <= data.items.length
    return res.send('finished') unless count() < data.max
    data.items[number - 1].users.push res.envelope.user.name
    res.send result()
