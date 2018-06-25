define(['jquery', 'handle'], function($, handle) {
    function render(data, source, target, isFresh) {
        var text = source.html();

        var compile = handle.compile(text)

        handle.registerHelper('first', function(index, v2, pro) {
            if (index === v2) {
                return pro.fn(this);
            } else {
                return pro.inverse(this);
            }
            console.log(pro)
        });

        handle.registerHelper('num', function(inde, pro) {
            var inde = inde + 2;
            inde = inde < 10 ? '0' + inde : inde;
            return inde;
        });

        handle.registerHelper('limit', function(index, v2, pro) {
            if (index < v2) {
                return pro.fn(this);
            } else {
                return pro.inverse(this);
            }
        });

        handle.registerHelper('ceil', function(number) {
            return Math.floor(number / 10000);
        })

        var html = compile(data)
        if (!isFresh) {
            target.html(html)
        } else {
            target.append(html)
        }


    }
    return render;
})