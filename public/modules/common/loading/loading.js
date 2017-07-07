var loading = (function() {
    var _f = {
            html: function(data) {
                var html = '';
                html += '<div id="loading" class="loading-common"><div class="loading-body ' + data.className + '"></div></div>';
                html = $(html);
                html.find('.loading-body').append(data.template);
                return html;
            },
            shwo: function(data) {
                data = data || {};
                data.template = data.template || 'loading...';
                data.className = data.className || '';
                if (!_v.full) {
                    _v.full = _f.html(data);
                    $('body').append(_v.full);
                } else {
                    console.warn('loading : loading already exists');
                };
            },
            hide: function() {
                if (_v.full) {
                    _v.full.remove();
                    _v.full = null;
                } else {
                    console.warn('loading : loading does not exist');
                };
            }
        },
        _v = {
            full: null,
        };
    return {
        show: _f.shwo,
        hide: _f.hide
    }
})