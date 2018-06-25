define(['jquery', 'render', 'base64', 'jsonp', 'getStorage', 'getRequest'], function($, render, base64, jsonp, storage, getRequest) {

    var fiction_id = getRequest().fiction_id;
    var chapter_id = parseFloat(storage.get('chapter_id')) || 1;
    var total;
    console.log(parseFloat(storage.get('chapter_id')))
    console.log(storage.get('chapter_id'))

    renderPage();


    function renderPage() {
        $.ajax({
            url: '/api/readList',
            dataType: 'json',
            success: function(res) {
                // console.log(res)
                total = res.length;
                // console.log(chapter_id)
                res = res.filter(function(item) {
                    // console.log(item.chapter_id, chapter_id)
                    if (item.chapter_id == chapter_id) {
                        // console.log(1)
                        return item;
                    }
                });
                // console.log(res)
                jsonp({
                    url: res[0].url,
                    callback: 'duokan_fiction_chapter',
                    cache: true,
                    success: function(d) {
                        d = JSON.parse($.base64.atob(d, true));
                        render($('#read-tpl'), d, $('.read'), true);
                    }
                });
            },
            error: function(e) {
                console.warn(e)
            }
        });
    }

    changeEvent()

    function changeEvent() {
        $('.read').on('click', function() {
            $('.mask-wrap').show();
            $('.page').text(chapter_id + '/' + total);
        });
        $('.middle').on('click', function() {
            $('.mask-wrap').hide();
        });
        $('.icon-circle-back').on('click', function() {
            window.location.href = '../../page/detail.html?fiction_id=' + fiction_id;
        });

        $('.catalog').on('click', function() {
            window.location.href = '../../page/chapter.html?fiction_id=' + fiction_id + '&chapter_id=' + chapter_id;
        });
        $('.next').on('click', function() {
            if (chapter_id < 10) {
                chapter_id++;
                $('.page').text(chapter_id + '/' + total);
                renderPage();
                storage.set('chapter_id', chapter_id);
            } else {
                chapter_id = 10;
                reminderToggle(chapter_id);
            }
        });
        $('.prev').on('click', function() {
            if (chapter_id > 1) {
                chapter_id--;
                $('.page').text(chapter_id + '/' + total);
                renderPage();
                storage.set('chapter_id', chapter_id);
            } else {
                chapter_id = 1;
                storage.set('chapter_id', chapter_id);
                reminderToggle(chapter_id);
            }
        });
    }


    function reminderToggle(chapter_id) {
        $('.reminder-wrap').show();
        $('.reminder>h3').text('第' + chapter_id + '章');
        if (chapter_id == 1) {
            $('.reminder>p').text('到顶了，上面没有章节啦');
        } else {
            $('.reminder>p').text('到尾了，下面没有章节啦');
        }
        $('.reminder>button').on('click', function() {
            $('.reminder-wrap').hide();
        });
        $('.reminder-mask').on('click', function() {
            $('.reminder-wrap').hide();
        });
    }
});