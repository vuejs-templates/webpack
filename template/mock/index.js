/**
 * @router
 * @author  stylehuan
 * @create  2016-12-14 09:49
 */
var proxy = require("express-http-proxy");
var mockData = require("./define");

var apiProxy = function () {
    if (!mockData.define.isProxy) {
        return proxy(mockData.define.domains.test1, {
            forwardPath: function (req, res) {
                return req._parsedUrl.path
            }
        });
    }
    return function (req, res, next) {
        if (req.baseUrl) {
            res.json(mockData.getInterFace(req.baseUrl));
        } else {
            res.json({
                "msg": "nodata"
            });
        }
    };
}();


module.exports = function (app) {
    //模拟数据
    var keys = mockData.interFaces.keys();  //遍历Key
    for (var key of keys) {
        app.use(key, apiProxy);
    }
};