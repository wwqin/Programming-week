var express=require('express');
var app =express();
var fs = require('fs');
var querystring = require('querystring');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.all('*', function(req, res, next) {
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   next();
});
//增加
app.get('/insert',function(req,res){
    console.log(req.query)
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wwqroot");
        console.log(req.query)
        dbo.collection("wwqdb").insertOne(req.query, function(err, res) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
        });
    });
    res.end();
});
//更新
app.get('/updata', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wwqroot");
        var myquery = req.query.old_data;
        var newvalues = { $set: req.query.new_data };
        dbo.collection("wwqdb").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("更新完成");
          db.close();
        });
    });
    res.end();
});
//删除
app.get('/delete', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wwqroot");
        var myquery = req.query;
        myquery.id = parseInt(myquery.id)
        dbo.collection("wwqdb").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("文档删除成功");
            db.close();
        });
    });
    res.end();
});
//查找
app.get('/find', function(req, res) {
    var obj;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wwqroot");
        dbo.collection("wwqdb").find(req.query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);//结果
            obj = result;
            db.close();
            res.send({status:200,data:obj});
        });
    });
});
var server = app.listen(8022,'127.0.0.1',function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("访问地址为 http://%s:%s", host, port)
 
});