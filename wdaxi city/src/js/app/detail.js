require(['jquery', 'render', 'getUrl'], function($, render, getUrl) {
    var id = getUrl('bookId');
    console.log(id)
    $.ajax({
        url: '/api/detail?bookId=' + id,
        dataType: 'json',
        success: function(res) {
            render(res.item, $('#detail-tpl'), $('.detail'));

            render(res.item, $('#con-tpl'), $('.detail-con'));

            render(res.item, $('#New-tpl'), $('.New'));

            $('.detail-con').on('click', function() {
                $(this).toggleClass('on');
            });

            render(res.item.tags, $('#type-tpl'), $('.type'))
            var data = res.author_books;
            // console.log(data)
            render(data, $('#others-tpl'), $('.others-con'))
            render(res.item, $('#infro-tpl'), $('.infro'))
            $('.read').on('click', function() {
                window.location.href = '../../page/reading.html';
            })

            $('.New').on('click', function() {
                var id = $('.newPage').data('new')
                console.log(id)
                window.location.href = '../../page/catalogue.html?latest_id=' + id;
            })

        },
        error: function(error) {
            console.warn(error)
        }

    })
})