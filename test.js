var co = require('co');
var map = require('./');
var assert = require('assert');

describe('map(read, fn)', function(){
  it('should map', function(done){
    co(function*(){
      var read = prefix(source(), 'data: ');
      var data;
      while (data = yield read()) {
        assert(/^data: [1-3]$/.test(data));
      }
    })(done);
    
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
  });
  
  it('should not end on falsy return values', function(done){
    co(function*(){
      var read = prefix(source(), 'data: ');
      assert('data: 2' == (yield read()));
      assert(!(yield read()));
    })(done);
    
    function prefix(source, str){
      var first = true;
      return map(source, function(data){
        if (first) {
          first = false;
          return;
        }
        return str + data;
      });
    }
    
    function source(){
      var i = 0;
      return function*(){
        if (++i <3) {
          return ''+i;
        }
      }
    }
  });
});
