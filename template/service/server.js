
var logger = require('./logger')
var cors = require('cors')
var path = require('path')
var httpProxy = require('http-proxy')
var filter = require('./filter')
var expressTemplate = require('./express')
var express = require('express')
var log4js = require('./logger')
var fs = require('fs')
let port = require('../service/config').dev.port
// var crosshost = '192.168.26.49:8080'
var crosshost = '101.132.188.218:8080'
//'192.168.26.49:8080'
//'192.168.26.105:8080'
// '101.132.188.218:8080'
// var crosshost = 'http://dragon-dev.zhongan.io'
            // 'http://dragon-dev.zhongan.io'
            //'http://chenxu.tunnel.qydev.com'
            //'https://easy-mock.com'
            //'http://chenxu.tunnel.qydev.com'
             // '192.168.26.105:80'
            // '192.168.26.49:8080'
            // '172.16.10.34:8080'
            // 'hq-jdt-dev.zhongan.io'

function mkdirs(dirname, callback) {
  fs.exists(dirname, function (exists) {
      if (exists) {
          callback();
      } else {
          //console.log(path.dirname(dirname));
          mkdirs(path.dirname(dirname), function () {
              fs.mkdir(dirname, callback);
          });
      }
  });
}

//递归创建目录 同步方法
function mkdirsSync(dirname) {
  //console.log(dirname);
  if (fs.existsSync(dirname)) {
      return true;
  } else {
      if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
      }
  }
}

module.exports = function (app) {
  var expressproxy = require('express-http-proxy')
  var proxy = httpProxy.createProxyServer()
  proxy.on('error', function(e) {
    logger.error(e)
  })
  expressTemplate(app)
  app.use(cors({
    origin:['http://localhost:' + port],
    methods:['GET','POST'],
    alloweHeaders:['Content-Type', 'Authorization']
  }))

  app.use('/static', express.static(path.join(__dirname , '../dist/static')))

  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials','true')
    next();
  }
  app.use(allowCrossDomain)

  app.get('/', function(req, res) {
    res.render('index', { title: '测试11111' });
  })
  app.get('/share', function(req, res) {
    res.render('./share/index', { title: '测试11111' })
  })
  // app.get('/',function(req, res){
  //   res.send('Hello world!')
  // })
  // // app.get('/', function(req, res) {
  // //   res.render('index', { title: '测试11111' })
  // // })
  // app.get('/first',function(req, res){
  //   console.log('------------------')
  //   res.send('this is first!')
  // })
  // app.get('/save', function(req, res, next) {
  //     res.json({name:'aaa',pwd:'123'});
  // })
  app.use('/local', function (req, res, next){
    console.log('start local mock')
    let path = filter(req, res)
    path = './mock' + path + '.json'
    console.log(path)
    res.send(require(path))
  })
  // snap 快照
  app.use('/cross', expressproxy(crosshost, {
    proxyReqPathResolver: function(req, res) {
      console.log('start local mock')
      return require('url').parse(req.url).path;
    },
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
      data = JSON.parse(proxyResData.toString('utf8'));
      data.newProperty = 'exciting data';
      var result = JSON.stringify(data)

      function name() {
        var myDate = new Date()
        let o = {
          month: (myDate.getMonth() + 1) > 9 ? (myDate.getMonth() + 1) : '0' + (myDate.getMonth() + 1),
          day: (myDate.getDate() + 1) > 9 ? myDate.getDate() : '0' + myDate.getDate(),
          hours: (myDate.getHours() + 1) > 9 ? myDate.getHours() : '0' + myDate.getHours(),
          seconds: (myDate.getSeconds() + 1) > 9 ? myDate.getSeconds() : '0' + myDate.getSeconds()
        }
        return o.month.toString() + o.day.toString() + o.hours.toString() + o.seconds.toString() + '.json'
      }
      function mkdirs(dirname, callback) {
        fs.exists(dirname, function (exists) {
            if (exists) {
                callback();
            } else {
                //console.log(path.dirname(dirname));
                mkdirs(path.dirname(dirname), function () {
                    fs.mkdir(dirname, callback);
                });
            }
        });
      }

      mkdirs(path.join(__dirname , './snap', userReq.url), function(){
        fs.writeFile(path.join(__dirname , './snap', userReq.url, name()), result, { 'flag': 'a' }, function(err) {
          if (err) {
            throw err
          }
          console.log('Saved.')
        })
      })
      return result
    }
  }))
}
