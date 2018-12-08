var express = require('express');
var path = require('path');
var logger = require('morgan');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();


app.engine('html', ejs	.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置静态路径，包括css、js、html
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',index);
app.use(function(req,res,next){
	var err = new Error('Not Found Page!!!!');
	err.status = 404;
	next(err);
})
//服务器错误页面
app.use(function(err,req,res,next){
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
 	res.status(err.status || 500);
  	res.render('error');
})

module.exports = app;
//var app = http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
//  var base64Img = new Buffer(image).toString('base64');
//  client.generalBasic(base64Img).then(function (result) {
//  	var txt = result.words_result,
//  		hml='';
//  	for(var i=0;i<txt.length;i++){
//  		hml +=txt[i].words + '\n';
//  	}
//      res.end(hml);
//  });
//});

//app.listen(8080, function () {
//  console.log('listening on 8080');
//});
