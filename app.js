var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fs = require('fs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 3000;
console.log("Express server running on " + port);
app.listen(process.env.PORT || port);

app.post('/message/*', function(req,res){
    var msg = [];
    msg.push("name:" + req.body.name + "\n");
    msg.push("email:"+ req.body.email + "\n");
    msg.push("phone:"+ req.body.phone + "\n");
    msg.push("message:"+ req.body.message + "\n");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    msg.push("ip:" + ip + "\n\n");
    console.log(ip);
    fs.appendFile("./message.txt", msg.join(""), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
    res.send('Your message has been saved. I\'ll contact you later :)');
});