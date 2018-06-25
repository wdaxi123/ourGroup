require.config({
    baseUrl: '/js/',
    paths: {
        bscroll: 'libs/bscroll',
        handlebars: 'libs/handlebars-v4.0.11',
        jquery: 'libs/jquery-2.1.1.min',
        swiper: 'libs/swiper-4.1.6.min',
        text: 'libs/text', //注意作用与用法
        base64: 'libs/jquery.base64',
        jsonp: 'libs/jquery.jsonp',


        index: 'app/index',
        renderPage: 'app/renderPage',
        detail: 'app/detail',
        search: 'app/search',
        mine: 'app/mine',
        chapter: 'app/chapter',
        readBook: 'app/readBook',




        render: 'common/render',
        getSlideDirection: 'common/getSlideDirection',
        header: 'common/header',
        getStorage: 'common/getStorage',
        getRequest: 'common/getRequest',



        tplTb: '../page/tpl/tpl-tb.html',
        tplLr: '../page/tpl/tpl-lr.html',
        tplsd2: '../page/tpl/tpl-sd2.html',
        loadMore: '../page/tpl/tpl-load.html',
        tplHeader: '../page/tpl/tpl-header.html'

    },
    shim: {
        base64: {
            deps: ['jquery']
        }
    }
});