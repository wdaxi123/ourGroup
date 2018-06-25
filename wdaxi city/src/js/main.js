require.config({
    baseUrl: '/js/',
    paths: {
        jquery: 'libs/jquery',
        flexible: 'libs/flexible',
        handle: 'libs/handlebars-v4.0.11',
        swiper: 'libs/swiper-4.1.6.min',
        index: 'app/index',
        render: 'common/render',
        text: 'libs/require.text',
        app: '../page/',
        search: 'app/search',
        bscroll: 'libs/bscroll',
        detail: 'app/detail',
        getUrl: 'common/getUrl',
        base64: 'libs/jquery.base64',
        reading: 'app/reading',
        catalogue: 'app/catalogue'
    },
    shim: {
        base64: {
            exports: 'base64',
            deps: ['jquery']
        }
    }
})


require(['flexible'])