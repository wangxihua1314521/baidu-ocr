var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var request = require("request");


var AipOcr = require('../src/index').ocr;
var fs = require('fs');
var http = require('http');

var formidable = require("formidable");
var fs = require('fs');
var TITLE = 'formidable上传示例';
var AVATAR_UPLOAD_FOLDER = '/avatar/';
var domain = "http://localhost:8090";


router.get('/',function(req, res, next) {
	res.render('index', {
		title:"百度OCR---测试"
    })
});


/* 图片上传路由 */
router.post('/uploader', function(req, res) {
//	console.log("是否执行")
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {
    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
//  console.log(files);

    var extName = '';  //后缀名
    switch (files.fulAvatar.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.render('index', { title: TITLE });
      return;
    }

    var avatarName = Math.random() + '.' + extName;
    //图片写入地址；
    var newPath = form.uploadDir + avatarName;
    //显示地址；
    var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    console.log("newPath",newPath);
    fs.renameSync(files.fulAvatar.path, newPath);  //重命名
    //设置APPID/AK/SK（前往百度云控制台创建应用后获取相关数据）
    //个人
//	var APP_ID = "11249570";
//	var API_KEY = "OZNMNFVz3eLDbngbAVhA7SaC";
//	var SECRET_KEY = "7gLfyk7Dl5w5fvj5WOBdqqlcloBrtP9p";
	
	//公司
	var APP_ID = "14413112";
	var API_KEY = "M36G5AxgQ45se3Lcu0LDzYqp";
	var SECRET_KEY = "0ikFYRM2bp7I8TryoFDHGP0IOCANGnGG";
	var client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);
    var image = fs.readFileSync(newPath);
    
	var base64Img = new Buffer(image).toString('base64');
//	console.log(base64Img)
	var hml = ''
	//文字识别通用版
	var options = {};
	options["language_type"] = "CHN_ENG";
	options["detect_direction"] = "true";
	options["detect_language"] = "true";
	options["probability"] = "true";
	//普通
//	client.generalBasic(base64Img, options).then(function (result) {
//		res.json({
//	      "ocr_txt":result
//	    });
//	});
	//含有位置
	// 调用通用文字识别（含位置信息版）, 图片参数为本地图片
	options["recognize_granularity"] = "small";
	client.general(base64Img,options).then(function(result) {
	    res.json({
	      "ocr_txt":result
	    });
	})

	//高精度版
//	var options = {};
//	options["detect_direction"] = "true";
//	options["probability"] = "true";
//	client.accurateBasic(base64Img, options).then(function (result) {
//		res.json({
//	      "ocr_txt":result
//	    });
//	});
//	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
//	res.json(hml);
  });
});


module.exports = router;


