
# co-map

  Map a [co generator stream](https://github.com/juliangruber/co-stream) over a
  function.

## Usage

```js
var read = map(stream(), function(data, i){
  return i + ': ' + data;
});

var data;
while (data = yield read()) console.log(data);
```

## API

### map(read, fn)

  Call `fn` with each value `read` yields, plus its iteration index, and yield
  the return value.
  
  A falsy return yields skips a value and doesn't end the stream.

## Installation

```bash
$ npm install co-map
```

## License

  MIT
