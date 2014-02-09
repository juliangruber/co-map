var co = require('co');
var map = require('./');

co(function*(){
  var read = prefix(source(), 'data: ');
  var data;
  while (data = yield read()) console.log(data);
})();

function prefix(source, str){
  return map(source, function(data){
    return str + data;
  });
}

function source(){
  var i = 0;
  return function*(){
    if (i++ <3) return ''+i;
  }
}