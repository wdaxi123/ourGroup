require(['jquery', 'render', 'base64'], function($, render) {

    var num = 1;
    getRender(num);
    $('.prev').on('click', function() {
        num--;
        num = num <= 1 ? num = 1 : num--;
        getRender(num)

    })
    $('.next').on('click', function() {
        num++;
        num = num >= 4 ? num = 4 : num++;
        getRender(num)
    })

    function getRender() {
        $.ajax({
            url: '/api/reading',
            data: {
                pagenum: num
            },
            dataType: 'json',
            success: function(data) {
                jsonp(data.jsonp, function(data) {
                    var data = JSON.parse($.base64('decode', data, true));
                    console.log(data)
                    $('b').html(num)
                    render(data, $('#content'), $('.content'))
                    $('.content').on('click', function() {
                        $('.nav').toggleClass('none')
                    })
                })
            }

        })
    }

    function jsonp(url, success) {
        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function(data) {
            success(data);
            document.head.removeChild(script)
        }
        script.src = url;
        document.head.appendChild(script)
    }
})