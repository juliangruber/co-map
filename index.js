
module.exports = function map(read, fn){
  var i = 0;
  return function*(end){
    var data;
    while (!data) {
      data = yield read(end);
      if (end || !data) return;
      data = fn(data, i++);
    }
    return data;
  }
};