define(function() {
    // ?fiction_id=352876&name=11
    function getRquest() {
        var str = location.search;
        if (str.indexOf('?') != -1) {
            var arr = str.slice(1).split('&');
            var obj = {};
            arr.forEach(function(v, i) {
                var n = v.split('=');
                obj[n[0]] = n[1];
            });
            return obj; // 函数====返回数据 
        }
    }
    return getRquest; // 返回函数
});