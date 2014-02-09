
module.exports = function map(read, fn){
  var i = 0;
  return function*(end){
    var data;
    while (!data) {
      data = 'function' == typeof read
        ? yield read(end)
        : read[i];
      if (end || !data) return;
      data = yield fn(data, i++);
    }
    return data;
  }
};