'use strict'
let baseTest = require('./baseTest');
let fs = require('fs');
let imageCensor = require('../src/index').imageCensor;
let bitmap = fs.readFileSync('assets/antiporn/porn.jpg');
let gif = fs.readFileSync('assets/antiporn/porn.gif');

let base64Img = new Buffer(bitmap).toString('base64');

let base64Img2 = new Buffer(gif).toString('base64');

let client = baseTest.createAll(imageCensor);

// client.antiPornGif(base64Img2).then(function(data) {
//     console.log('<antipornGif>: ' + JSON.stringify(data));
// });

// client.antiPorn(base64Img).then(function(data) {
//     console.log('<antiporn>: ' + JSON.stringify(data));
// });

// client.antiTerror(base64Img).then(function(data) {
//     console.log('<antiTerror>: ' + JSON.stringify(data));
// });

// var urls = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513240669554&di=e78897a8bb3e569646987f1522a0e47b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F2fdda3cc7cd98d10fbc64c0d2a3fb80e7bec90f8.jpg"]
// client.faceAudit([urls], 'url', 1).then(function(data) {
//     console.log('<faceAudit>: ' + JSON.stringify(data));
// });

// client.imageCensorUserDefined(base64Img, 'base64').then(function(data) {
//     console.log('<imageCensorUserDefined>: ' + JSON.stringify(data));
// }, function(e) {
//     console.log(e)
// });

// client.report(
//     [
//         {
//             api_url: "https://aip.baidubce.com/api/v1/solution/direct/img_censor",
//             correct: 0,
//             image: base64Img2
//         }
//     ]
// ).then(function(data) {
//     console.log('<report>: ' + JSON.stringify(data));
// }, function(e) {
//     console.log(e)
// });


// let bitmapOcr = fs.readFileSync('assets/OCR/general.jpg');
// let base64ImgOcr = new Buffer(bitmapOcr).toString('base64');

// client.imageCensorComb(base64ImgOcr, 'base64', ['ocr', 'antiporn']).then(function(data) {
//     console.log('<imageCensorComb>: ' + JSON.stringify(data));
// }, function(e) {
//     console.log(e)
// });
