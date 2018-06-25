define(['jquery', 'renderPage'], function($, renderPage) {

    renderPage();

    // function initPage() {
    //     $.ajax({
    //         url: '/api/index',
    //         dataType: 'json',
    //         success: function(res) {

    //             console.log(res);
    //             render($('#banner-tpl'), res.items[0].data, $('.banner .swiper-wrapper'));
    //             render($('#bList-tpl'), res.items[0].data, $('.banner-inner'));
    //             render($('#hotWeek-tpl'), res.items[1], $('.hotWeek>div'));
    //             render($('#recommend1-tpl'), res.items[2].data, $('.recommend>div'));
    //             render($('#rmd-ul-tpl'), res.items[2].data, $('.recommend-ul'));
    //             render($('#recommend-tpl'), res.items[3].data, $('.gf-love>div'));
    //             render($('#recommend-tpl'), res.items[4].data, $('.bf-love>div'));
    //             render($('#hotWeek1-tpl'), res.items[5], $('.xm>div'));
    //             render($('#jx-tpl'), res.items[6].data, $('.jx>div'));
    //             render($('#slide2-tpl'), res.items[1].data, $('.slide2-cont'));


    //             var indexSwiper = new swiper('.index-wrap', {
    //                 // loop: true,
    //                 on: {
    //                     slideChangeTransitionStart: function() {
    //                         var index = this.activeIndex;
    //                         $('.index-tab em').eq(index).addClass('active').siblings().removeClass('active');
    //                         if (index == 1) {
    //                             $('.line').addClass('move');
    //                         } else {
    //                             $('.line').removeClass('move');
    //                         }

    //                     }
    //                 }
    //             });
    //             $('.index-tab em').on('click', function() {
    //                 indexSwiper.slideTo($(this).index());
    //             });


    //             var banner = new swiper('.banner>.swiper-container', {
    //                 loop: true,
    //                 autoplay: true,
    //                 noSwiping: true,
    //                 noSwipingClass: 'stop-swiping',
    //                 pagination: {
    //                     el: '.swiper-pagination',
    //                 },
    //             });
    //             var indexBscroll = new bscroll('.slide1', {
    //                 probeType: 2,
    //                 click: true
    //             });
    //         },
    //         error: function(e) {
    //             console.log(e.message);
    //         }
    //     });
    // }

});