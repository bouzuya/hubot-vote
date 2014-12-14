# hubot-vote

A Hubot script for voting

## Installation

    $ npm install https://github.com/bouzuya/hubot-vote/archive/master.tar.gz

or

    $ npm install https://github.com/bouzuya/hubot-vote/archive/{VERSION}.tar.gz

## Example

      bouzuya> hubot vote set 3 foo, bar, baz
      bouzuya> hubot vote result
        hubot> result (0/3):
               0:  [1] foo
               0:  [2] bar
               0:  [3] baz
    emanon001> hubot vote 1
        hubot> result (1/3):
               1:  [1] foo (emanon001)
               0:  [2] bar
               0:  [3] baz
    mollifier> hubot vote 1
        hubot> result (2/3):
               2:  [1] foo (emanon001,mollifier)
               0:  [2] bar
               0:  [3] baz
      bouzuya> hubot vote 2
        hubot> result (3/3):
               2:  [1] foo (emanon001,mollifier)
               1:  [2] bar (bouzuya)
               0:  [3] baz

## Configuration

See [`src/scripts/vote.coffee`](src/scripts/vote.coffee).

## Development

`npm run`

## License

[MIT](LICENSE)

## Author

[bouzuya][user] &lt;[m@bouzuya.net][mail]&gt; ([http://bouzuya.net][url])

## Badges

[![Build Status][travis-badge]][travis]
[![Dependencies status][david-dm-badge]][david-dm]
[![Coverage Status][coveralls-badge]][coveralls]

[travis]: https://travis-ci.org/bouzuya/hubot-vote
[travis-badge]: https://travis-ci.org/bouzuya/hubot-vote.svg?branch=master
[david-dm]: https://david-dm.org/bouzuya/hubot-vote
[david-dm-badge]: https://david-dm.org/bouzuya/hubot-vote.png
[coveralls]: https://coveralls.io/r/bouzuya/hubot-vote
[coveralls-badge]: https://img.shields.io/coveralls/bouzuya/hubot-vote.svg
[user]: https://github.com/bouzuya
[mail]: mailto:m@bouzuya.net
[url]: http://bouzuya.net
