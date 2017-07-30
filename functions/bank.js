var ajax = require('ajax-request');

var pays = [];
var slots = [':tangerine:', ':cookie:', ':heart:', ':floppy_disk:', ':minidisc:', ':cd:', ':film_frames:'];

module.exports.bank = function(message, result) {
    if (result === 'register') {
        ajax({
          url: 'http://192.168.1.150:3000/api/dodobot/bank/balance/'+message.author.id,//api address
          method: 'GET',
          json: true
        }, function(err, res, body) {
            if(err){
                console.log(err);
            }
            else{
                if (body.length === 0) {
                    ajax({
                      url: 'http://192.168.1.150:3000/api/dodobot/bank/register', //api address
                      method: 'POST',
                      data: {
                          userid: message.author.id,
                          balance: 100
                      },
                      json: true
                    },function(err, res, body) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            message.channel.send('Registered user starting balance: 100 ₪');
                        }
                    });
                }
                else {
                    message.channel.send('You have already registered!');
                }
            }
        });
    }
    else if (result === 'balance') {
        ajax({
          url: 'http://192.168.1.150:3000/api/dodobot/bank/balance/' + message.author.id,//api address
          method: 'GET',
          json: true
        }, function(err, res, body) {
            if(err){
                console.log(err);
            }
            else{
                if (body.length > 0) {
                    console.log(body[0].balance);
                    message.channel.send("Your balance: "+ body[0].balance + " ₪");
                }
            }
        });
    }
    else {
        message.channel.send('```Usage:\n!bank register - registers your account\n!bank balance - displays your account balance in Israeli New Shekel(₪)```');
    }

};

module.exports.payday = function(message, result) {
    var payd = false;
    pays.forEach(function(element) {
        if(element.userid === message.author.id){
            if (element.time.getDate() + 1 < new Date()) {
                payd = true;
                message.channel.send('You have already got your pay!');
            }
            else {
                payd = false;
            }
        }
    });
    if (!payd) {
        ajax({
          url: 'http://192.168.1.150:3000/api/dodobot/bank/balance/'+ message.author.id,//api address
          method: 'GET',
          json: true
        }, function(err, res, body) {
            if(err){
                console.log(err);
            }
            else{
                if (body.length > 0) {
                    var before = body[0].balance;
                    ajax({
                      url: 'http://192.168.1.150:3000/api/dodobot/bank/update', //api address
                      method: 'POST',
                      data: {
                          userid: message.author.id,
                          balance: before + 100
                      },
                      json: true
                    },function(err, res, body) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            var currentDate = new Date();
                            message.channel.send('You got payed 100 ₪');
                            message.channel.send(before+' ₪ -->'+ (before + 100)+' ₪');
                            pays.push({userid: message.author.id, time: currentDate});
                            console.log(currentDate);
                            console.log(currentDate.getDate()+1);
                        }
                    });
                }
                else {
                    message.channel.send('You have to register!');
                }
            }
        });
    }
};

module.exports.slot = function(message, result) {
    if (result === "") {
        message.channel.send("you need to bet something");
    }
    else {
        var money = parseInt(result);
        if(!isNaN(money)){
            var slotMashina;
            ajax({
              url: 'http://192.168.1.150:3000/api/dodobot/bank/balance/'+ message.author.id,//api address
              method: 'GET',
              json: true
            }, function(err, res, body) {
                if(err){
                    console.log(err);
                }
                else{
                    if (body.length > 0) {
                        var before = body[0].balance;
                        if ((before - money)<0) {
                            message.channel.send("You don't have enough money!");
                        }
                        else{
                            slotMashina = slotMashinas(money);
                            message.channel.send(slotMashina[3][0]);
                            message.channel.send(slotMashina[3][1]);
                            ajax({
                              url: 'http://192.168.1.150:3000/api/dodobot/bank/update', //api address
                              method: 'POST',
                              data: {
                                  userid: message.author.id,
                                  balance: before + parseInt(slotMashina[3][2])
                              },
                              json: true
                            },function(err, res, body) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    message.channel.send(before + '-->' + (before + slotMashina[3][2]) +' ₪');
                                }
                            });
                        }
                    }
                    else {
                        message.channel.send('You have to register!');
                    }
                }
            });
        }
        else {
            message.channel.send("That's not a number!");
        }
    }
};

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

function slotMashinas(money) {
    var slotMashina = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],['nothing','out', 0]];
    var endGame = "";
    var out = "";
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            slotMashina[i][j] = getRandomNum(0, slots.length - 1);
        }
        if (i === 1) {
            endGame = endGame + slots[slotMashina[i][0]] + " " + slots[slotMashina[i][1]] + " " + slots[slotMashina[i][2]] + " :arrow_left:\n";
        }
        else {
            endGame = endGame + slots[slotMashina[i][0]] + " " + slots[slotMashina[i][1]] + " " + slots[slotMashina[i][2]] + "\n";
        }
    }
    slotMashina[3][0] = endGame;
    if (slotMashina[1][0] === slotMashina[1][1] && slotMashina[1][1] === slotMashina[1][2]) {
        money = money*3;
        out = "Three the same. WOW! +3x!";
    }
    else if (slotMashina[1][0] === slotMashina[1][1] || slotMashina[1][1] === slotMashina[1][2] || slotMashina[1][0] === slotMashina[1][2]) {
        money = money*1.5;
        out = "Two the same. +1.5x!";
    }
    else {
        money = money*-1;
        out = "You lost. Better luck next time!";
    }
    slotMashina[3][1] = out;
    slotMashina[3][2] = money;
    return slotMashina;
}
