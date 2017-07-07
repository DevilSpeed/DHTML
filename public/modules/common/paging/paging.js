var paging = (function(options) {
    var _typeof = options[0];
    var pageOption = function(data, index) {
            var html = '';
            html += '<option value="' + data + '" ' + (data == index ? 'selected="selected"' : '') + '>' + data + '</option>';
            return html;
        },
        hasPaging = function(totalCount, data) {
            var pages = Math.ceil(parseInt(totalCount) / parseInt(data.count));
            if (pages <= 1 && data.index == 1) {
                return false;
            } else {
                return pages;
            };
        },
        template = function(option, pages, type) {
            var passingData = $.extend(true, {}, option);
            var element = passingData.element.empty('');
            var index = parseInt(passingData.data.index);
            if (!pages) {
                return;
            };
            // 上一页
            var prev = '';
            if (index > 1) {
                prev = $('<span class="prev current" >上一页</span>');
                prev.unbind().bind('click', function() {
                    var newData = $.extend(true, {}, option);
                    newData.data.index = parseInt(newData.data.index) - 1;
                    _f.init(newData, type);
                });
            } else {
                prev = $('<span class="disabled">上一页</span>');
            };
            element.append(prev);
            if (type == 'wap') {
                element.attr("class", "paging forwap");
                // select
                var html = $('<div class="select">当前第<span><select></select></span>页</div>');

                for (var i = 0; i < pages; i++) {
                    html.find('select').append(pageOption(i + 1, index));
                };

                html.find('select').change(function() {
                    var newData = $.extend(true, {}, option);
                    newData.data.index = $(this).find('option:selected').val();
                    _f.init(newData, type);
                });
                element.append(html);
            } else {
                element.attr("class", "paging");
                if (index != 1 && index >= 4 && pages != 4) {
                    var first = $('<span class="tcdNumber">' + 1 + '</span>');
                    first.click(function() {
                        var newData = $.extend(true, {}, option);
                        newData.data.index = 1;
                        _f.init(newData, type);
                    });
                    element.append(first);
                };
                if (index - 2 > 2 && index <= pages && pages > 5) {
                    element.append('<span class="disabled">...</span>');
                };
                var start = index - 2,
                    end = index + 2;
                if ((start > 1 && index < 4) || index == 1) {
                    end++;
                };
                if (index > pages - 4 && index >= pages) {
                    start--;
                };

                function middleButton(index, element) {
                    element.bind('click', function() {
                        var newData = $.extend(true, {}, option);
                        newData.data.index = parseInt(index);
                        _f.init(newData, type);
                    });
                };
                for (; start <= end; start++) {
                    if (start <= pages && start >= 1) {
                        if (start != index) {
                            var middle = $('<span class="tcdNumber">' + start + '</span>');
                            middleButton(start, middle);
                            element.append(middle);
                        } else {
                            element.append('<span class="current">' + start + '</span>');
                        }
                    }
                };
                if (index + 2 < pages - 1 && index >= 1 && pages > 5) {
                    element.append('<span class="disabled">...</span>');
                };
                if (index != pages && index < pages - 2 && pages != 4) {
                    var last = $('<span class="tcdNumber">' + pages + '</span>');
                    last.click(function() {
                        var newData = $.extend(true, {}, option);
                        newData.data.index = parseInt(pages);
                        _f.init(newData, type);
                    });
                    element.append(last);
                };
            };
            // 下一页
            var next = '';
            if (index < pages) {
                next = $('<span class="next current">下一页</span>');
                next.click(function() {
                    var newData = $.extend(true, {}, option);
                    newData.data.index = parseInt(newData.data.index) + 1;
                    _f.init(newData, type);
                });
            } else {
                next = $('<span class="disabled">下一页</span>');
            }
            element.append(next);
        },
        _f = {
            init: function(option, type) {
                if (option) {
                    option.ajaxEvent(option.data, function(result) {
                        var totalCount = option.totalCountEvent(result);
                        var pages = hasPaging(totalCount, option.data)
                        option.success(result, pages);
                        template(option, pages, type);
                    })
                } else {
                    console.error('paging error : parameters must be an object');
                };
            },
        };
    return {
        paging: _f.init
    }
})