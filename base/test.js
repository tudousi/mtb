var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var commentSchema = Schema({
    discussion_id: String,
    parent_id: {type: Schema.Types.ObjectId, ref: 'Comment'},
    slug: String,
    full_slug: String,
    posted: {type: Date},
    author: String,
    text: String
});

var Comment = mongoose.model('Comment', commentSchema);
var discussion_id = 'article id';

mongoose.connect('mongodb://localhost/mcomment', function(err) {
    //insertComment();
    //insertComment('5604bb8ff446331c1aee096e', 'Jrmm');

    showComment();
});

function showComment(){
    Comment.find({discussion_id: discussion_id}).sort('full_slug').exec(function(err, doc){
        if(err) throw err;
        console.log(doc);
    })
    /*
    Comment.find({discussion_id: discussion_id}).sort('posted').exec(function(err, doc){
        if(err) throw err;
        console.log(doc);
    })
    */
}


function insertComment(parent, parent_slug){
    var slug;
    var posted;
    var full_slug;
    var comment;
    var slug_part;
    var full_slug_part;

    slug_part = createSlug(false, 4);                   // abcd
    posted = (new Date()).toLocaleDateString();         // 2015-05-06
    full_slug_part = posted + ':' + slug_part;          // 2015-05-06:abcd

    if(parent){
        Comment.findOne({_id: parent, slug: parent_slug}, function(err, doc){
            slug = doc['slug'] + '/' + slug_part;                       // abcd/defg
            full_slug = doc['full_slug'] + '/' + full_slug_part      // 2015-05-06:abcd/2015-05-07:defg
            var comment = new Comment({
                discussion_id: discussion_id,
                parent_id: doc['_id'],
                slug: slug,
                full_slug: full_slug,
                posted: posted,
                author: 'tudou',
                text: '1 floor'
            });
            comment.save(function(err){
                console.log('insertComment finshed!');
            })
            return;
        });
        return
    }

    slug = slug_part
    full_slug = full_slug_part

    comment = new Comment({
        parent_id: null,
        discussion_id: discussion_id,
        slug: slug_part,
        full_slug: full_slug,
        posted: posted,
        author: 'tudou',
        text: '1 floor'
    });
    comment.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log('insertComment finshed!');
        }
    });
}

/*
* randomWord 产生任意长度随机字母数字组合
* randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
* 生成3-32位随机串：randomWord(true, 3, 32)
* 生成43位随机串：randomWord(false, 43)
*/
function createSlug(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
