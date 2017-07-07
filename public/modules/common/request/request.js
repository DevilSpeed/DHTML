var request = (function(options) {
    var loading = options[0]();

    function a(d, t) {
        if (!d.unloading) loading.show();
        $.ajax({
            // url: "http://192.168.1.102:8090" + d.url,
            url: d.url,
            data: d.data,
            type: t,
            success: function(r) {
                if (!d.unloading) loading.hide();
                d.success(r);
            },
            error: function(a, b, c) {
                if (!d.unloading) loading.hide();
                if (d.error) d.error(a, b, c);
            }
        });
    };
    return {
        GET: function(s) {
            a(s, 'GET');
        },
        POST: function(s) {
            a(s, 'POST');
        },
        DELETE: function(s) {
            a(s, 'DELETE');
        },
        PUT: function(s) {
            a(s, 'PUT');
        },
    }
})