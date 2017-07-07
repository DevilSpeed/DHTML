var storage = (function() {
    var _f = {
        error: function() {
            console.error('storage error : browser does not support');
            return 'error';
        },
        isLocalStorageSupported: function() {
            var testKey = 'test',
                storage = window.localStorage;
            try {
                storage.setItem(testKey, 'testValue');
                storage.removeItem(testKey);
                return true;
            } catch (error) {
                return false;
            }
        },
        set: function(key, data) {
            return window.localStorage.setItem(key, window.JSON.stringify(data));
        },
        get: function(key) {
            return eval('(' + window.localStorage.getItem(key) + ')');
        },
        remove: function(key) {
            return window.localStorage.removeItem(key);
        }
    };
    if (!_f.isLocalStorageSupported()) {
        return {
            set: error,
            get: error,
            remove: error
        }
    } else {
        return {
            set: _f.set,
            get: _f.get,
            remove: _f.remove
        }
    };
})