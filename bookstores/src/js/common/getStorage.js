define(function() {
    var storage = window.localStorage;
    var obj = {
        set: function(key, val) {
            if (!val) {
                this.remove(key);
            }
            storage.setItem(key, JSON.stringify(val));
        },
        get: function(key) {
            return storage.getItem(key);
        },
        remove: function(key) {
            storage.removeItem(key);
        },
        clear: function() {
            storage.clear();
        }
    }
    return obj;
});