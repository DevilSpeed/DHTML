var parseurl = (function(options) {
    var Api = options[0];
    var _v = {
        layout: {
            name: null,
            event: null,
            template: null,
        },
        main: {
            event: null,
        },
        history: {
            url: '',
        }
    }
    var _f = {
        init: function() {
            var url = _f.formatUrl();
            console.log('get Config by : ' + url);
            // 监听前进后退事件
            window.addEventListener("popstate", function(event) {
                var currentState = event.state;
                if (currentState) {
                    _f.formatUrl(currentState.url);
                } else {
                    console.log(currentState);
                }
            });
            $('body').on('click', 'a', function() {
                _f.formatUrl($(this).attr('ui-href'));
            })
        },
        formatUrl: function(url) { //格式化URL
            pathname = url || location.pathname;
            _v.history.url = pathname;
            pathname != '/' ? (url = '/portal' + pathname + '/config.json') : (url = '/portal/index/config.json');
            if (_v.layout.event) {
                _v.layout.event.clearContent();
            };
            _f.initJson(url);
        },
        initJson: function(url) {
            _f.get(url, function(result) {
                _f.readerLayout(result, function() {
                    _f.readerPortal(result, function() {
                        console.log('reader success');
                        // window.history.pushState({ url: _v.history.url }, 0, _v.history.url);
                    });
                });
            })
        },
        readerLayout: function(result, success) {
            // 判断资源路径路径是否存在
            if (Api.verify.judeType(result, 'object')) {
                // 存在时判断layout名称是否一致
                if (_v.layout.name != result.layout.name) {
                    _v.layout.name = result.layout.name;
                    // 重载layout
                    console.log('Layout is inconsistent, reload the layout');
                    // 获取模板路径
                    _f.get(result.layout.url, function(result) {
                        var layoutResult = result
                        _f.get(layoutResult.controller, function(result) {
                            _v.layout.event = eval(result)(layoutResult, success);
                        });
                    });
                } else if (_v.layout.name == result.layout.name && _v.layout.event) {
                    // 直接刷新内容
                    console.log('Layout is consistent, reload the template');
                    success(result);
                };
            } else {
                _f.initJson('/portal/index/config.json');
                // window.history.pushState({
                //     url: '/index',
                // }, '首页', '/index');
            }
        },
        readerPortal: function(config, success) {
            _f.get(config.controller, function(result) {
                _v.main.event = eval(result)(config, _v.layout.event.getMain(), success);
            });
        },
        get: function(url, success) {
            Api.GET({
                url: url,
                success: function(result) {
                    success(result);
                }
            });
        },
    };
    return {
        parseurl: _f.init,
    }
})