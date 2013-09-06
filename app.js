/**
 * User: katat
 * Date: 9/5/13
 * Time: 9:25 AM
 */
var express = require('express');
var app = express();
var port = 2020;
var http = require('http');
var fs = require('fs');
var canvas = require('canvas');
var fav = require('./lib/fav')(canvas);
app.use(express.bodyParser());

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close();
            cb(file);
        });
    });
}

var convert = function(filename, cb){
    var icon = fav(filename+'.ico').getLargest();
    var file = fs.createWriteStream(filename+'.png');
    file.on('finish', function(){
        file.close();
        cb();
    })
    icon.createPNGStream().pipe(file);
}


app.get('/*', function(req, res){
    var url = req.params[0];
    console.log(url);
    download(url, 'test.ico', function(){
        convert('test', function(){
            res.send({success:true});
        })
    });
})

app.listen(port);
console.log('listening on port '+port);

module.exports = app;