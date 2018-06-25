define([
    'jquery'
], function($) {
    var chapterId = 1;
    $.ajax({
        url: "/api/reader",
        dataType: 'json',
        data: {
            chapterNum: chapterId
        },
        success: function(data) {
            jsonp(data.jsonp, function(data) {
                console.log(data)
            })
        }
    })

    function jsonp(url, success) {

        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function(data) {
            success(data);
            document.head.removeChild(script);
        }
        script.src = url;
        document.head.appendChild(script);
    }
});