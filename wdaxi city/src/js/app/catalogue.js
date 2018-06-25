require(['jquery', 'render', 'getUrl'], function($, render, getUrl) {
    var pageId = getUrl('latest_id');

    $.ajax({
        url: '/api/chapter',
        dataType: 'json',
        success: function(res) {
            var data = res.item;
            render(data.toc, $('#cata'), $('.cata'))
                // console.log(($('.cata li').data('chapter')));
            if ($('.cata li').data('chapter') === pageId) {
                $(this).addClass('on')
            }
        }
    })
})