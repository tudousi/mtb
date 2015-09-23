var crypto = require('crypto');


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
    }
}
