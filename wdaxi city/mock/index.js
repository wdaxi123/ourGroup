//轮播图数据
var bannerData = require('./data/data.json');

var path1 = require('./data/recommend1.json');
var path2 = require('./data/recommend2.json');
var path3 = require('./data/recommend3.json');

var searchList = require('./data/search.json');
var searchKey = require('./data/searchKey.json');

var catalogue = require('./data/chapter-list.json');
// console.log(catalogue)

//阅读数据
var reading = require('./data/data1.json')
var reading2 = require('./data/data2.json');
var reading3 = require('./data/data3.json');
var reading4 = require('./data/data4.json')

var detail = require('./data/detail.json');
var jsonObj = {
    '/api/index': bannerData,
    '/api/list?pagenum=1&limit=10': path1,
    '/api/list?pagenum=2&limit=10': path2,
    '/api/list?pagenum=3&limit=10': path3,
    '/api/result': searchList,
    '/api/searchKey': searchKey,
    '/api/detail?bookId=352876': detail,
    '/api/reading?pagenum=1': reading,
    '/api/reading?pagenum=2': reading2,
    '/api/reading?pagenum=3': reading3,
    '/api/reading?pagenum=4': reading4,
    '/api/chapter': catalogue
}
module.exports = function(url) {

    if (/\/api\/result/.test(url)) {

        var str = url.split('?')[1];
        var val = decodeURIComponent(str.split('=')[1]);
        var reg = new RegExp(val, 'g');
        var obj = {
            mes: '暂无数据',
            cont: []
        };
        var newArr = searchList.items.filter(function(v, i) {
            return reg.test(v.title) || reg.test(v.intro) || reg.test(v.role[0][1])
        });
        if (newArr.length) {
            obj.mes = 'success';
            obj.cont = newArr;
        }
        return obj;
    };

    if (jsonObj[url]) {
        return jsonObj[url]
    } else {
        return null
    }
}