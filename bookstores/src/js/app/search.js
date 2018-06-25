define(['jquery', 'bscroll', 'render', 'header', 'getStorage'],
    function($, bscroll, render, header, storage) {
        header({ istrue: true });
        $.ajax({
            url: '/api/serach',
            dataType: 'json',
            success: function(res) {
                render($('#search-tags'), res, $('.search-list'));
                search();
            },
            error: function(e) {
                console.warn(e);
            }
        });


        function search() {
            searchClick();
            changeInput()
            searchList();

        }

        function searchList() {
            $('.search-list>li').on('click', function() {
                var val = $(this).text();
                $('.search-p>input').val(val);
                $('.search-result').html('');
                $('.search-result').show();
                $.ajax({
                    url: '/api/search_inp',
                    dataType: 'json',
                    data: {
                        val: val
                    },
                    success: function(res) {
                        if (res) {
                            render($('#search-res-tpl'), res.item, $('.search-result'));
                        } else {
                            $('.search-result').html('<p>暂无数据</p>');
                        }
                    },
                    error: function(e) {
                        console.warn(e);
                    }
                });
                $('.search-list').hide();
            });
        }

        function changeInput() {
            $('.search-p>input').on('input', function() {
                var val = $(this).val();
                if (!val) {
                    $('.search-list').show();
                    $('.search-result').hide();
                }
            });
        }

        // var history = storage.get(history) || [];

        function searchClick() {
            $('.search-p>i').on('click', function() {
                $('.search-result').html('');
                $('.search-result').show();
                var val = $('.search-p>input').val();
                if (!val) {
                    $('.search-result').html('<p>请输入内容</p>');
                } else {
                    var history = JSON.parse(storage.get('history')) || [];
                    if (history.indexOf(val) == -1) {
                        history.push(val);
                    }
                    storage.set('history', history);

                    var arrLi = [];
                    $.each($('.search-list>li'), function() {
                        arrLi.push($(this).text());
                    });
                    if (arrLi.indexOf(val) == -1) {
                        $('.search-list').append('<li>' + val + '</li>');
                    }

                    $.ajax({
                        url: '/api/search_inp',
                        dataType: 'json',
                        data: {
                            val: val
                        },
                        success: function(res) {
                            if (res) {
                                render($('#search-res-tpl'), res.item, $('.search-result'));
                            } else {
                                $('.search-result').html('<p>暂无数据</p>');
                            }
                        },
                        error: function(e) {
                            console.warn(e);
                        }
                    });
                }

                $('.search-list').hide();
            });
        }




        // var res = Ajax('/api/serach');
        // console.log(typeof res);
        // console.log(res);
        // render($('#search-tags'), res, $('.search-list'));    /异步执行，render中res为undefined
        // search();
        // function Ajax(url, data) {
        //     $.ajax({
        //         url: url,
        //         dataType: 'json',
        //         data: data,
        //         success: function(r) {
        //             console.log(r);
        //             console.log(typeof r)
        //             return r;
        //             // console.log(res);
        //             // render($('#search-res-tpl'), res.item, $('.search-result'));
        //         },
        //         error: function(e) {
        //             console.warn(e);
        //         }
        //     });
        // }
    });