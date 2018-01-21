var express = require('express');
var app = express();

var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var base58 = require('./base58');
var url = require('./models/url');


mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname , 'public')));



app.get('/',function (req,res) {

    res.sendFile(path.join(__dirname , 'views/index.html'));
});

app.post('api/shorten',function (req, res) {
    var longUrl = req.body.url;
    var shortUrl = '';

    url.findOne({long_url : longUrl}, function (err, doc) {
        if(doc){
            shortUrl = config.webhost + base58.encode(doc._id);
            res.send({'shortUrl':shortUrl});
        }
        else{
            var newUrl = url({
                long_url:longUrl

            });

            newUrl.save(function (err) {
                if(err) {
                    console.log(err);
                }

                shortUrl = config.webhost + base58.encode(newUrl._id);

                res.send({'shortUrl' : shortUrl})
            });


        }
    });
});

app.get('/:encoded_id', function (req, res) {
    var base58id = req.params.encoded_id;
    var id = base58.decode(base58id);

    url.findOne({_id:id},function (err, doc) {
        if(doc){
            res.redirect(doc.long_url);
        }
        else {
            res.redirect(config.webhost);
        }
    })
})

var server = app.listen(3000 , function () {
    console.log("chalu hoja!!!");
});