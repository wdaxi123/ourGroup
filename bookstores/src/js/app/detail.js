define(['jquery', 'bscroll', 'render', 'header', 'getRequest'],
    function($, bscroll, render, header, getReq) {
        var fiction_id = getReq().fiction_id;
        $.ajax({
            url: '/api/chapterOld' + location.search,
            dataType: 'json',
            success: function(res) {
                // console.log(res);
                header({ title: res.item.title });
                render($('#detail-template'), res, $('main>div'));
                $('.catalog').on('click', function() {
                    window.location.href = '../../page/chapter.html?fiction_id=' + fiction_id;
                });
                $('.read').on('click', function() {
                    window.location.href = '../../page/readBook.html?fiction_id=' + fiction_id;
                })

            },
            error: function(e) {
                console.warn(e);
            }
        });
    });