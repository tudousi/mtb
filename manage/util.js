var crypto = require('crypto');
var fs = require('fs');
var util = require('util');
module.exports = {
    sha1: function(str){
        var hash = crypto.createHash('sha1');
        hash.update(str);
        return hash.digest('hex');
    },
    mixin: function(dest, src){
        for(var key in src){
            dest[key] = src[key];
        }
    },
    regexp: {
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    // debugger
    debugger: function(name, data){
        if(typeof data == 'object'){
            fs.writeFile('./debugger/' + name, util.inspect(data));
        }else{
            fs.writeFile('./debugger/' + name, data);
        }
    }

}
