var bookDetail = require('./data/bookDetail.json');
var home = require('./data/home.json');
var searchKey = require('./data/searchKey.json');
var recommend1 = require('./data/recommend/recommend1.json');
var recommend2 = require('./data/recommend/recommend2.json');
var recommend3 = require('./data/recommend/recommend3.json');
var oldNine = require('./data/352876.json');
var chapterOld = require('./data/chapter-list.json');
var readList = require('./data/read-list.json');

// var naArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// var urls = require('url');

var dataJson = {
    '/api/index': home,
    '/api/detail': bookDetail,
    '/api/serach': searchKey,
    '/api/loadMore?pageNum=1&total=3&limit=10': recommend1,
    '/api/loadMore?pageNum=2&total=3&limit=10': recommend2,
    '/api/loadMore?pageNum=3&total=3&limit=10': recommend3,
    '/api/search_inp?val=择天记': oldNine,
    '/api/chapterOld?fiction_id=352876': chapterOld,
    '/api/readList': readList
}
module.exports = function(url) {
    // console.log(dataJson[url])
    // var name = urls.parse(url, true).query;
    // console.log(name)

    if (!dataJson[url]) {
        return null;
    } else {
        // var name = urls.parse(url, true).query;
        // console.log(name)
        //     // console.log(name.length)

        // if (name == null) {
        //     console.log(1)
        // } else {
        //     var data = naArr.filter(function(item, index) {
        //         if (index > 5) {
        //             // console.log(item)
        //             return item;
        //         }
        //     });
        //     console.log(data)
        // }
        return dataJson[url];
    }

}