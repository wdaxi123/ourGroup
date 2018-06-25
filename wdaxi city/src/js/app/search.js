require(['jquery', 'render', 'bscroll'], function($, render, bscroll) {

    // var stroge = window.localStorage;

    // var searchData = JSON.parse(stroge.getItem('search')) || [];

    $.ajax({
        url: '/api/searchKey',
        dataType: 'json',
        success: function(res) {
            render(res.ads, $('#type-tpl'), $('.type-tags'));
        },
        error: function(error) {
            console.warn(error)
        }
    });
    $('.type-tags').on('click', 'li', function() {
        var str = $(this).text().trim();
        $('.search-input input').val(str);
    })
    $('.search-input_btn').on('click', function() {
        var val = $('.search-input input').val();
        $('.type-tags').hide();
        $('.search-list').show();
        if (!val) {
            $('.search-list').html('<p>搜索信息不能为空</p>')
            searchData.unshift(val);
            // stroge.setItem('search', JSON.stringify(searchData));
            // render(searchData, $('#history-list'), $('.history-list'))
        } else {
            searchList(val);
        }
    });

    function searchList(val) {
        $.ajax({
            url: '/api/result?bookname=' + val,
            dataType: 'json',
            success: function(res) {
                if (!res.cont.length) {
                    $('.search-list').html('<p>暂无数据</p>');
                } else {
                    render(res.cont, $('#shlf-tpl'), $('.shlf-list'));
                }
            },
            error: function(error) {
                console.warn(error)
            }
        })
    };
})