var fs = require('fs');
var express = require('express');
var router = express.Router();

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addApi(router, str) {
    var files = fs.readdirSync(__dirname + '/' + str);
    var js_files = files.filter(function (f) {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        var mapping = require(__dirname + '/' + str + '/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    var controllers_dir = dir || 'api';
    addApi(router, controllers_dir);
    return router;
};