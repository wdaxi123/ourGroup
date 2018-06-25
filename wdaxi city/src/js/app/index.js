require(['jquery', 'swiper', 'render'], function($, swiper, render) {
    //实例化  tab切换
    var mySwiper = new swiper('.tab-content', {
        on: {
            slideChangeTransitionStart: function() {
                fn(this.activeIndex)
            }
        }
    });

    $('.header span').on('click', function() {
        var index = $(this).index();
        fn(index)
        mySwiper.slideTo(index)
    })

    function fn(index) {
        $('.header span').eq(index).addClass('active').siblings().removeClass('active');
    };

    $('.right span').on('click', function() {
        $(this).toggleClass('btn-switch');
        $('.right-list').toggleClass('right-shelf')
    });

    //初始化渲染页面
    $.ajax({
        url: '/api/index',
        dataType: 'json',
        success: function(res) {
            var DATA1 = res.items[0];
            //本周最火数据
            var weekData = res.items[1];
            //重磅推荐
            var recommendData = res.items[2];
            //女生最爱
            var girlData = res.items[3];
            //男生最爱
            var boyData = res.items[4];
            //限时免费
            var timeData = res.items[5];
            // console.log(timeData)
            //精选专题
            var themeData = res.items[6];
            // console.log(themeData);
            //轮播图数据
            var banData = DATA1.data.data.slice(0, 2);
            //导航数据
            var navData = DATA1.data.data.slice(2);
            //渲染banner图
            render(banData, $('#banner-list'), $('.banner-list'));
            var bannerSwiper = new swiper('.banner', {
                // autoplay: true,
                loop: true,
                click: false
            });
            //渲染导航
            render(navData, $('#nav'), $('.nav'));
            //渲染 本周最火
            render(weekData, $('#weekHot'), $('.weekHot'));
            //渲染 重磅推荐
            render(recommendData, $('#recommend'), $('.recommend'));
            //女生最爱
            render(girlData, $('#girl'), $('.girl'));
            //男生最爱
            render(boyData, $('#boy'), $('.boy'));

            render(boyData, $('#right-list'), $('.right-list'));
            //限时免费
            render(timeData, $('#time'), $('.time'));
            //精选专题
            render(themeData, $('#theme'), $('.theme'));
            //上拉加载数据
            var num = 0;
            upload(num)
        },
        error: function(error) {
            console.warn(error)
        }
    })

    //上拉加载数据
    function upload(num) {

        var clintH = $('.scroll').height();
        $('.scroll').on('scroll', function() {
            var that = this;
            var MaxH = $(this).children().height() - clintH;
            if ($(this).scrollTop() + 40 > MaxH) {
                $(this).off('scroll');
                num++;
                if (num >= 3) {
                    $('.load').html($('.load').data('inner'));
                    return false
                }
                up(num, that);
            }
        })
    }

    function up(num, that) {
        $.ajax({
            url: '/api/list',
            data: {
                pagenum: num,
                limit: 10
            },
            dataType: 'json',
            success: function(res) {
                var data = res.items;
                render(data, $('#inner'), $('.inner'), true);
                $(that).on('scroll');
                upload(num)
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }
})