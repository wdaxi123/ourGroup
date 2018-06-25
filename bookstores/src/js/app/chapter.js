define(['jquery', 'bscroll', 'render', 'header', 'getStorage', 'getRequest'],
    function($, bscroll, render, header, storage, getReq) {
        var fiction_id = getReq().fiction_id;
        var chapter_id = getReq().chapter_id;
        // console.log(chapter_id)
        $.ajax({
            url: '/api/chapterOld',
            dataType: 'json',
            data: {
                fiction_id: fiction_id
            },
            success: function(res) {
                // console.log(res);
                header({ title: '目录' });
                render($('#chapter-tpl'), res.item.toc, $('.chapter-list'));
                Scroll();

            },
            error: function(e) {
                console.warn(e);
            }
        });

        function Scroll() {
            var scroll = new bscroll('main', {
                click: true
            });
            console.log(chapter_id)

            if (chapter_id) {
                scroll.scrollToElement($('.chapter-list>li:eq(' + chapter_id + ')')[0]);
                $('.chapter-list>li:eq(' + chapter_id + ')').addClass('active').siblings().removeClass('active');
            } else {
                scroll.scrollToElement($('.chapter-list>li:last')[0]);
                $('.chapter-list>li:last').addClass('active').siblings().removeClass('active');
            }
        }
        $('.chapter-list').on('click', 'li', function() {
            window.location.href = '../../page/readBook.html?fiction_id=' + fiction_id;
            chapter_id = parseFloat($(this).attr('chapter_id'));
            storage.set('chapter_id', chapter_id);
        });
    });