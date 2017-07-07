var version = function (req, res, next){
    res.json({version:'1.0.0'});  
};

module.exports = {
    'GET /api/version': version,
};