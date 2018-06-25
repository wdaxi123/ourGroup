define(['jquery', 'render', 'text!tplHeader'], function($, render, tplHeader) {
    $('body').append(tplHeader);

    function headerRender(data) {
        render($('#tpl-header'), data, $('header'));
        $('span.icon-back').on('click', function() {
            history.go(-1);
        });
        $('span.icon-home').on('click', function() {
            location.replace('http://localhost:8778/');
        });
    }
    return headerRender;
});