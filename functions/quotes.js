var ajax = require('ajax-request');

module.exports.quoted = function(message, result) {
    var quoteGuy = "";
    var quote = "";
    var ist = false;
    for(var i = 0;i<result.length;i++){
        if(!ist){
            if(result[i]==' '){
                ist = true;
            }
            else quoteGuy+=result[i];
        }
        else{
            quote+=result[i];
        }
    }
    quoteGuy = quoteGuy.toLowerCase();
    console.log("tola je to'"+quoteGuy+"'");
    message.channel.send(quote + " ~ ©" + quoteGuy + ", 2017");
    ajax({
        url: 'http://192.168.1.150:3000/api/dodobot/quote', //api address
        method: 'POST',
        data: {
            who: quoteGuy,
            what: quote
        },
        json: true
    },function(err, res, body) {

    });
};

module.exports.quote = function(message, result) {
    console.log("'"+result+"'");
    result = result.toLowerCase();
    ajax({
        url: 'http://192.168.1.150:3000/api/dodobot/quote/' + result, //api address
        method: 'GET',
        json: true
    }, function(err, res, body) {
        if(err){
            console.log(err);
        }
        else{
            if (body.length===0) {
                message.channel.send('No quotes from "' + result + '"');
            }
            else {
                console.log(body[0]);
                var rand =  Math.floor(Math.random() * body.length);
                message.channel.send(body[rand].what + " ~ ©" + body[rand].who + ", 2017");
            }
        }
    });
};
