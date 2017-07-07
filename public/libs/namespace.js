var Namespace = (function() {
    var _listeners = {};
    var _dispatchEvent = function(eventName, properties) {
        if (!_listeners[eventName]) {
            return;
        }
        properties.event = eventName;
        for (var i = 0; i < _listeners[eventName].length; i++) {
            _listeners[eventName][i](properties);
        }
    };
    var _namespace = function(identifier) {
        var klasses = arguments[1] || false;
        var ns = window;
        if (identifier !== '') {
            var parts = identifier.split('.');
            for (var i = 0; i < parts.length; i++) {
                ns[parts[i]] = ns[parts[i]] || {};
                ns = ns[parts[i]];
            }
        }
        if (klasses) {
            for (var klass in klasses) {
                if (klasses.hasOwnProperty(klass)) {
                    ns[klass] = klasses[klass];
                }
            }
        }
        _dispatchEvent('create', {
            'identifier': identifier
        });
        return ns;
    };
    _namespace.exist = function(identifier) {
        if (identifier === '') {
            return true;
        }
        var parts = identifier.split('.');
        var ns = window;
        for (var i = 0; i < parts.length; i++) {
            if (!ns[parts[i]]) {
                return false;
            }
            ns = ns[parts[i]];
        }

        return true;
    };
    return _namespace;
})();