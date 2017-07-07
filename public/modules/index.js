(function(win) {
    win.buildJS = (function() {
        var _v = {
                modules: {},
                success: null,
                time: 0,
            },
            _f = {
                init: function(str, success) {
                    if (_f.isString(str) && _f.isFunction(success)) {
                        _v.time = new Date().getTime();
                        _v.success = success;
                        _f.loadStartJson(str);
                    } else if (!_f.isString(str)) {
                        console.error('init error : str mast be String');
                        return 'error';
                    } else if (!_f.isFunction(success)) {
                        console.error('init error : success mast be function');
                        return 'error';
                    };
                },
                isString: function(str) {
                    return (typeof str == 'string') && str.constructor == String;
                },
                isFunction: function(obj) {
                    return (typeof obj == 'function') && obj.constructor == Function;
                },
                useTime: function() {
                    var newTime = new Date().getTime();
                    var reuslt = newTime - _v.time;
                    _v.time = newTime;
                    return reuslt
                },
                loadStartJson: function(str) {
                    _f.getJson(str, function(reuslt) {
                        // $('body').append(JSON.stringify(reuslt, null, '<br>'));
                        for (var item in reuslt) {
                            if (reuslt.hasOwnProperty(item)) {
                                var module = reuslt[item];
                                _v.modules[item] = {
                                    isReady: false,
                                    loadjsObject: module,
                                };
                            }
                        };
                        _f.creatLoadjsList();
                    });
                },
                creatLoadjsList: function() {
                    var partArray = [];
                    for (var item in _v.modules) {
                        if (_v.modules.hasOwnProperty(item)) {
                            var element = _v.modules[item];
                            loadjs(element.loadjsObject.public, item);
                            partArray.push(item);
                        }
                    };
                    loadjs.ready(partArray, {
                        success: function() {
                            console.info('loadjs info : public all success; %c use : ' + _f.useTime() + ' ms ', "color:blue; background:#999;");
                            try {
                                _f.build();
                            } catch (error) {
                                console.error('build error : check your config.json');
                            }
                        },
                        error: function() {
                            console.error('loadjs error : can not load all modules');
                        }
                    });
                },
                checkAllReady: function(key, obj, success) {
                    var allReady = false;
                    for (var item in obj) {
                        if (obj.hasOwnProperty(item)) {
                            var element = obj[item];
                            if (!element[key]) {
                                allReady = false;
                                break;
                            } else {
                                allReady = true;
                            }
                        }
                    }
                    if (allReady) {
                        success();
                    }
                },
                getJson: function(str, success, error) {
                    $.ajax({
                        url: str,
                        type: "GET",
                        dataType: "JSON",
                        success: function(reuslt) {
                            success(reuslt)
                        },
                        error: function(e) {
                            if (error) {
                                error(e);
                            } else {
                                console.error(e);
                            }
                        }
                    });
                },
                build: function() {
                    for (var item in _v.modules) {
                        if (_v.modules.hasOwnProperty(item)) {
                            var module = _v.modules[item];
                            var depends = [];
                            for (var i = 0; i < module.loadjsObject.depend.length; i++) {
                                var element = Namespace(module.loadjsObject.depend[i]);
                                depends.push(element);
                            };
                            // console.log(Namespace(module.loadjsObject.start));
                            try {
                                var moduleObject = Namespace(module.loadjsObject.start)(depends);
                            } catch (error) {
                                console.error('build error : moduleObject error');
                                return;
                            };
                            for (var _item in moduleObject) {
                                if (moduleObject.hasOwnProperty(_item)) {
                                    var _element = moduleObject[_item];
                                    Namespace(module.loadjsObject.namespace)[_item] = _element;
                                }
                            };
                            module.isReady = true;
                            // console.info('build info : ' + item + ' part build success; use : %c ' + _f.useTime() + 'ms', "color:red");
                            _f.checkAllReady('isReady', _v.modules, function() {
                                console.info('build info : build success; %c use : ' + _f.useTime() + 'ms ', "color:blue; background:#999;");
                                _v.modules = {};
                                _v.success();
                                // delete _v.modules;
                            });
                        }
                    };
                },
            };
        // $(document).ready(function() {
        //     _f.init("/modules/config.json", function() {
        //         $('script').remove();
        //         console.log('Parsing the url');
        //     });
        // });
        return function(str, success) {
            _f.init(str, success);
        };
    })();
})(window);

$(document).ready(function() {
    buildJS("/modules/config.json", function() {
        $('script').remove();
        console.log('Parsing the url');
        Api.parseurl();
    });
});


// (function() {
//     function banBackSpace(e) {
//         var ev = e || window.event,
//             _o = ev.target || ev.srcElement,
//             t = _o.type || _o.getAttribute('type'),
//             _v = _o.getAttribute('readonly'),
//             _e = _o.getAttribute('enabled'),
//             _v = (_v == null) ? false : _v;
//         if (_v == 'readonly') {
//             _v = true;
//         };
//         _e = (_e == null) ? true : _e;
//         var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (_v == true || _e != true)) ? true : false;
//         var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;
//         if (flag2) {
//             return false;
//         }
//         if (flag1) {
//             return false;
//         }
//     };
//     document.onkeypress = banBackSpace;
//     document.onkeydown = banBackSpace;
// })();