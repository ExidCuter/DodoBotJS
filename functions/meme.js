var ajax = require('ajax-request');

module.exports.meme = function(message) {
    ajax({
      url: 'http://192.168.1.150:3000/api/meme/random',//api address
      method: 'GET',
      json: true
    }, function(err, res, body) {
        if(err){
            console.log(err);
        }
        else{
            console.log(body[0].file);
            message.channel.send("Title: "+ body[0].title);
            message.channel.send(body[0].file);
        }
    });
};
