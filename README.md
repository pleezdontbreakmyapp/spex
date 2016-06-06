# Specialized Promise Extensions

[![Build Status](https://travis-ci.org/vitaly-t/spex.svg?branch=master)](https://travis-ci.org/vitaly-t/spex)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/spex/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/spex?branch=master)
[![Join the chat at https://gitter.im/vitaly-t/spex](https://badges.gitter.im/vitaly-t/spex.svg)](https://gitter.im/vitaly-t/spex?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[batch], [page], [sequence] - promise methods for the following patterns:
* [Data Throttling & Load Balancing](docs/concept/throttling.md)
* [Linked and Detached Sequencing](docs/concept/sequencing.md)
* [Streaming and Paging](docs/concept/streaming.md)
* [Batch Processing](docs/concept/batch.md)

## Installing

```
$ npm install spex
```

## Usage

* For any [Promises/A+] library: [Promise], [Bluebird], [When], [Q], [RSVP], etc.
```javascript
var promise = require('bluebird');
var spex = require('spex')(promise);
```
* For ES6 Promise:
```javascript
var spex = require('spex')(Promise);
```

See also: [client-side usage](docs/client.md).

## API

* [Module]
* Methods
  - [batch] 
  - [page]
  - [sequence]
  - [stream](docs/concept/stream.md)
    - [read]

## Testing

* Clone the repository (or download, if you prefer):

```
$ git clone https://github.com/vitaly-t/spex
```

* Install the library's DEV dependencies:

```
$ npm install
```

* To run all tests:

```
$ npm test
```

* To run all tests with coverage:

```
$ npm run coverage
```

## License

Copyright (c) 2016 Vitaly Tomilov (vitaly.tomilov@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

  
[Module]:https://github.com/vitaly-t/spex/blob/master/docs/code/module.md
[batch]:https://github.com/vitaly-t/spex/blob/master/docs/code/batch.md
[page]:https://github.com/vitaly-t/spex/blob/master/docs/code/page.md
[sequence]:https://github.com/vitaly-t/spex/blob/master/docs/code/sequence.md
[read]:https://github.com/vitaly-t/spex/blob/master/docs/code/stream/read.md
[Promises/A+]:https://promisesaplus.com/
[Promise]:https://github.com/then/promise
[Bluebird]:https://github.com/petkaantonov/bluebird
[When]:https://github.com/cujojs/when
[Q]:https://github.com/kriskowal/q
[RSVP]:https://github.com/tildeio/rsvp.js
