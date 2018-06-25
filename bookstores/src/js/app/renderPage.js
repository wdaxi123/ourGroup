define(['jquery', 'swiper', 'bscroll', 'render', 'text!tplTb', 'text!tplLr', 'text!tplsd2', 'text!loadMore', 'getSlideDirection'],
    function($, swiper, bscroll, render, tplTb, tplLr, tplsd2, loadMore, getDir) {
        $('body').append(tplTb);
        $('body').append(tplLr);
        $('body').append(tplsd2);
        $('body').append(loadMore);

        var pageNum = 0;

        function initPage() {
            $.ajax({
                url: '/api/index',
                dataType: 'json',
                type: 'post',
                data: {
                    pageNum: pageNum
                },
                success: function(res) {
                    // console.log(res);
                    renderPage(res);

                    swiperAll();

                    var indexBscroll = new bscroll('.slide1', {
                        probeType: 2,
                        click: true
                    });
                    indexBscroll.refresh();

                    LoadPage(indexBscroll);

                },
                error: function(e) {
                    console.log(e);
                }
            });
        }

        $('.search-div>em').on('click', function() {
            $(this).children('span').toggleClass('changeIcon');
            $('.slide2-cont>div').toggleClass('tb-cont');
        })

        function LoadPage(indexBscroll) {

            var heightAfter = window.getComputedStyle($('.index-swiper')[0], ':after').height;
            var heightBefore = window.getComputedStyle($('.index-swiper')[0], ':before').height;
            // console.log(heightBefore)
            var pullLoad = '上拉加载更多……',
                releaseLoad = '释放加载……',
                downReresh = '下拉刷新',
                releaseRefresh = '释放刷新';

            indexBscroll.on('scroll', function() {
                if (this.y < this.maxScrollY - parseFloat(heightAfter)) {
                    $('.index-swiper').attr('up', releaseLoad);
                } else if (this.y < this.maxScrollY - parseFloat(heightAfter) / 2) {
                    $('.index-swiper').attr('up', pullLoad);
                } else if (this.y > parseFloat(heightBefore)) {
                    $('.index-swiper').attr('down', releaseRefresh);
                } else if (this.y > parseFloat(heightBefore) / 2) {
                    $('.index-swiper').attr('down', downReresh);
                }
            });
            indexBscroll.on('scrollEnd', function() {
                $('.index-swiper').attr('up', pullLoad);
                $('.index-swiper').attr('down', downReresh);
            });
            indexBscroll.on('touchEnd', function() {
                if (this.y > 0) {
                    if ($('.index-swiper').attr('down') === releaseRefresh) {
                        location.reload();
                    }
                }
                if (this.y < this.maxScrollY) {
                    if ($('.index-swiper').attr('up') === releaseLoad) {
                        pageNum++;
                        $.ajax({
                            url: '/api/loadMore',
                            dataType: 'json',
                            // type: 'post',
                            data: {
                                pageNum: pageNum,
                                total: 3,
                                limit: 10
                            },
                            success: function(res) {
                                // console.log(res);
                                if (!res) {
                                    $('.loadMore>p').remove();
                                    $('.loadMore').append('<p style="line-height:55px;text-align:center">暂无数据</p>');
                                } else {
                                    render($('#loadMore-tpl'), res, $('.loadMore'));
                                }

                                // indexBscroll.refresh();
                            },
                            error: function(e) {
                                console.log(e);
                            }
                        });
                    }
                }
            });
        }

        function swiperAll() {
            // var indexSwiper;
            // var indexSwiper = new swiper('.index-wrap', {
            //     loop: true,
            //     on: {
            //         slideChangeTransitionStart: function() {
            //             var index = this.activeIndex;
            //             $('.index-tab em').eq(index).addClass('active').siblings().removeClass('active');
            //             if (index == 1) {
            //                 $('.line').addClass('move');
            //             } else {
            //                 $('.line').removeClass('move');
            //             }

            //         }
            //     }
            // });

            var indexSwiper = new swiper('.index-wrap');

            // 滑动处理
            var startX, startY;
            document.addEventListener('touchstart', function(ev) {
                startX = ev.touches[0].pageX;
                startY = ev.touches[0].pageY;
            }, false);
            document.addEventListener('touchend', function(ev) {
                var endX, endY;
                endX = ev.changedTouches[0].pageX;
                endY = ev.changedTouches[0].pageY;
                var direction = getDir(startX, startY, endX, endY);
                switch (direction) {
                    case 3:
                        // var indexSwiper = new swiper('.index-wrap');
                        indexSwiper.slideTo(1);
                        $('.line').addClass('move');
                        $('.index-tab em').eq(1).addClass('active').siblings().removeClass('active');
                        break;
                    case 4:
                        // indexSwiper = new swiper('.index-wrap');
                        indexSwiper.slideTo(0);
                        $('.index-tab em').eq(0).addClass('active').siblings().removeClass('active');
                        $('.line').removeClass('move');
                        break;
                    default:
                }
            }, false);

            $('.index-tab em').on('click', function() {
                indexSwiper.slideTo($(this).index());
                $(this).addClass('active').siblings().removeClass('active');
                if ($(this).index() == 1) {
                    $('.line').addClass('move');
                } else {
                    $('.line').removeClass('move');
                }
            });

            var banner = new swiper('.banner>.swiper-container', {
                loop: true,
                autoplay: true,
                noSwiping: true,
                noSwipingClass: 'stop-swiping',
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        }

        function renderPage(res) {
            render($('#banner-tpl'), res.items[0].data, $('.banner .swiper-wrapper'));
            render($('#bList-tpl'), res.items[0].data, $('.banner-inner'));
            render($('#hotWeek-tpl'), res.items[1], $('.hotWeek>div'));
            render($('#recommend1-tpl'), res.items[2].data, $('.recommend>div'));
            render($('#rmd-ul-tpl'), res.items[2].data, $('.recommend-ul'));
            render($('#recommend-tpl'), res.items[3].data, $('.gf-love>div'));
            render($('#recommend-tpl'), res.items[4].data, $('.bf-love>div'));
            render($('#hotWeek1-tpl'), res.items[5], $('.xm>div'));
            render($('#jx-tpl'), res.items[6].data, $('.jx>div'));
            render($('#slide2-tpl'), res.items[1].data, $('.slide2-cont'));
        }

        return initPage;
    });