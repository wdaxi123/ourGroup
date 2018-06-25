define(['handlebars'], function(handlebars) {
    function render(id, data, obj, isRefresh) {
        var source = id.html();
        var complate = handlebars.compile(source);
        handlebars.registerHelper('limit', function(index, len) {
            if (index < len) {
                return true;
            } else {
                return false;
            }
        });
        handlebars.registerHelper('notOne', function(index, options) {
            if (index == 0 || index > 4) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        });
        handlebars.registerHelper('addIndex', function(index) {
            return index + 1;
        });
        handlebars.registerHelper('count', function(count) {
            return Math.ceil(count / 10000);
        });
        handlebars.registerHelper('split', function(copy) {
            return copy.split(';')[1].split('|')[1];
        })
        var html = complate(data)
        if (isRefresh) {
            obj.html(html);
        } else {
            obj.append(html);
        }
    }
    return render;
});