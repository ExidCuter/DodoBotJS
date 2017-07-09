const Discord = require('discord.js');
const bot = new Discord.Client();
var ffmpeg = require('ffmpeg');
var ajax = require('ajax-request');
var comp = require('./compli.js');

var prefix ='!';
var memePost = 0;
var connectionTo = null;
var inChannel = false;

bot.on('ready', () => {
  	console.log('I\'m Online\n');
});

bot.on('guildDelete', guild => {
    guild.defaultChannel.send(`${guild.name} has left!`);
});

bot.on('guildCreate', guild => {
    guild.defaultChannel.send(`${guild.name} has joined!`);
});

bot.on('guildMemberAdd', member => {
    var guild = member.guild;
    var name = member.user.username;
    guild.defaultChannel.send(name+' has joined!');
});

bot.on('guildMemberRemove', member => {
    var guild = member.guild;
    var name = member.user.username;
    guild.defaultChannel.send('bye '+name);
});

bot.on('guildBanAdd',(guild, user) => {
  	guild.defaultChannel.send(`${user.username} was just banned!`);
});

bot.on('guildBanRemove',(guild, user) => {
  	guild.defaultChannel.send(`${user.username} was just unbanned!`);
});

bot.on('message',(message) => {
    let args = message.content.split(' ').slice(1);
	var result = args.join(' ');
	memePost++;
	console.log(memePost);
	if(memePost>100){
		memePost=0;
        ajax({
          url: 'http://192.168.1.27:3000/api/meme/random',//api address
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
	}
	if (message.author.bot) return;

	if(message.content.startsWith(prefix+'help')) {
        message.reply('Available normal commands: ```hi``` - "Hello World!"\n ```help``` - Displays help\n\n ```cat```- Img of a cat\n\n```r8waifu``` - Rates your waifu\n\n```compliment``` - Compliments you\n\n```meme``` - Displays a meme\n ```say + line``` - Echos your line\n ```ping``` - Ping\n ```join``` - Joins a voice chanell\n ```leave``` - Leaves the voice channel \n\n```sound + soundName``` - plays a sound (how, x, bird, some, laugh, yaaa, nigga, norm)\n\n```play + num[1-30]``` - plays a song from a playlist\n\n\nAdmin commands: ```setgame``` - Sets the "playing game"\n ```del + howMany``` - Deletes howMany messages');
    }

    if(message.content.startsWith(prefix+'hi')) {
        message.reply('Hello World!');
    }

    if(message.content.startsWith(prefix+'kachiga')) {
        message.reply('http://www2.arnes.si/~djese1/kachiga.png');
    }

	if(message.content.startsWith(prefix+'compliment')) {
        message.reply(comp.getCompliment());
    }

	if(message.content.startsWith(prefix+'r8waifu')) {
		if(result=='')message.reply('no waifu :(');
		else if(result=='Rem'||result=='rem') message.reply('Your waifu __**'+result+'**__ is rated at ```11/10```');
		else message.reply('Your waifu __**'+result+'**__ is rated at ```'+(Math.floor(Math.random() * 7) + 3) + '/10```');
    }

	if(message.content.startsWith(prefix+'quoted')) {
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
		message.channel.send("ok sugar");
		message.channel.fetchMessages({limit: 2}).then(messages => message.channel.bulkDelete(messages));
		message.channel.send(quote + " ~ ©" + quoteGuy + ", 2017");

        ajax({
          url: 'http://192.168.1.27:3000/api/dodobot/quote', //api address
          method: 'POST',
          data: {
              who: quoteGuy,
              what: quote
          },
          json: true
        },function(err, res, body) {

        });
	}
    else if(message.content.startsWith(prefix+'quote')) {
        console.log("'"+result+"'");
        result = result.toLowerCase();
        ajax({
          url: 'http://192.168.1.27:3000/api/dodobot/quote/' + result, //api address
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
    }

    if(message.content== prefix+'cat'){
		message.channel.send('ok');
		let messagecount = parseInt(result);
		message.channel.fetchMessages({limit: 2}).then(messages => message.channel.bulkDelete(messages));
        message.channel.send('https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg');
    }
    if (message.content.startsWith(prefix + 'setgame') && message.author.id=='161795217803051008') {
		if (!result) {
			result = null;
		}
		bot.user.setGame(result);
    }

	if (message.content.startsWith(prefix + 'say')) {
		var temp = result;
		if (!temp) {
			message.channel.send('what?');
		}
		else{
			message.channel.send('ok');
			let messagecount = parseInt(result);
			message.channel.fetchMessages({limit: 2}).then(messages => message.channel.bulkDelete(messages));
			message.channel.send(temp);
		}
    }

    if (message.content.startsWith(prefix + 'ping')) {
    	message.channel.send(`\`${Date.now() - message.createdTimestamp} ms\``);
  	}

  	if (message.content.startsWith(prefix + "del") && message.author.id=='161795217803051008') { // admin user
		var messagecount = parseInt(result) + 1;
		message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
  	}

    if (message.content.startsWith(prefix + 'meme')) {
        ajax({
          url: 'http://192.168.1.27:3000/api/meme/random',
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
  	}

   if (message.content.startsWith(prefix + 'join')) {
		let voiceChan = message.member.voiceChannel;
		if (!voiceChan || voiceChan.type !== 'voice') {
			message.channel.send('No').catch(error => message.channel.send(error));
		} else if (message.guild.voiceConnection) {
			message.channel.send('I\'m already in a voice channel');
		} else {
			message.channel.send('Joining...').then(() => {
				voiceChan.join().then(connection => {
					message.channel.send('Joined successfully.').catch(error => message.channel.send(error));
					inChannel=true;
					console.log(inChannel);
					connectionTo = connection;
				}).catch(error => message.channel.send(error));
			}).catch(error => message.channel.send(error));
		}
	}

	else if (message.content.startsWith(prefix + 'leave')) {
		let voiceChan = message.member.voiceChannel;
		if (!voiceChan) {
			message.channel.send('I am not in a voice channel');
		} else {
			message.channel.send('Leaving...').then(() => {
				voiceChan.leave();
				inChannel=false;
				console.log(inChannel);
			}).catch(error => message.channel.send(error));
		}
	}

	if(message.content.startsWith(prefix + 'sound')){
		if(inChannel){
			if(result=='')dispatcher = connectionTo.playFile('./Music/lel.mp3');
			else {

				dispatcher = connectionTo.playFile('./Sound/'+result+'.mp3');
			}
		}
		else {
			message.channel.send("I'm not in a voice chanell");
		}
	}
	if(message.content.startsWith(prefix + 'play')){
		if(inChannel){
			if(result=='')dispatcher = connectionTo.playFile('./Music/lel.mp3');
			else {
				var song = result;
				dispatcher = connectionTo.playFile('./Music/song'+song+'.mp3');
			}
		}
		else {
			message.channel.send("I'm not in a voice chanell");
		}
	}
	if(message.content.startsWith(prefix + 'stop')){
		if(inChannel){
			dispatcher = connectionTo.playFile('./stop.mp3');
		}
		else {
			message.channel.send("I'm not in a voice chanell");
		}
	}

	if(message.content.startsWith(prefix + 'shoot')){
		if(result=='')message.channel.send("Boom! You are now deded!");
		else  message.channel.send("Boom! "+result+" is deded!");
	}

});

bot.login('Mjc3NDU4NzQxMDUyNTcxNjQ4.C3kqJg.14EXvfVyNksKVK0nf3kZG95bRmY');
