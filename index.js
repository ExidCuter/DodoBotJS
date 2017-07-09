const Discord = require('discord.js');
const bot = new Discord.Client();
var ffmpeg = require('ffmpeg');
var ajax = require('ajax-request');

bot.on('ready', () => {
  	console.log('I\'m Online\nI\'m Online');
});

var array = [
	"ur smile is contagious.",
	"u look great today.",
	"u r a smart cookie.",
	"I bet u make babies smile.",
	"u have impeccable manners.",
	"I like ur style.",
	"u have the best laugh.",
	"I appreciate u.",
	"u are the most perfect u there is.",
	"u are enough.",
	"u r strong.",
	"ur perspective is refreshing.",
	"u r an awesome friend.",
	"u light up the room.",
	"u deserve a hug right now.",
	"u should be proud of urself.",
	"u r more helpful than u realize.",
	"u have a great sense of humor.",
	"u've got all the right moves!",
	"Is that ur picture next to 'charming' in the dictionary?",
	"ur kindness is a balm to all who encounter it.",
	"u r all that and a super-size bag of chips.",
	"On a scale from 1 to 10, u r an 11.",
	"u are brave.",
	"u r even more beautiful on the inside than u are on the outside.",
	"ur eyes are breathtaking.",
	"u have the courage of ur convictions.",
	"If cartoon bluebirds were real, a bunch of them would be sitting on ur shoulders singing right now.",
	"u are making a difference.",
	"u r like sunshine on a rainy day.",
	"u bring out the best in other people.",
	"ur ability to recall random factoids at just the right time is impressive.",
	"u r a great listener.",
	"How is it that u always look great, even in sweatpants?",
	"Everything would be better if more people were like u!",
	"I bet u sweat glitter.",
	"u were cool way before hipsters were cool.",
	"That color is perfect on u.",
	"Hanging out with u is always a blast.",
	"u always know -- and say -- exactly what I need to hear when I need to hear it.",
	"u smell really good.",
	"u may dance like no one's watching, but everyone's watching because u r an amazing dancer!",
	"Being around u makes everything better!",
	"When u say, 'I meant to do that,' I totally believe u.",
	"When u r not afraid to be urself is when u r most incredible.",
	"Colors seem brighter when u r around.",
	"u r more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)",
	"That thing u don't like about urself is what makes u so interesting.",
	"u r wonderful.",
	"u have cute elbows. For reals! (u r halfway through the list. Don't stop now! u should be giving at least one awesome compliment every day!)",
	"Jokes are funnier when u tell them.",
	"u r better than a triple-scoop ice cream cone. With sprinkles.",
	"ur bellybutton is kind of adorable.",
	"ur hair looks stunning.",
	"u r one of a kind!",
	"u r inspiring.",
	"If u were a box of crayons, u'd be the giant name-brand one with the built-in sharpener.",
	"u should be thanked more often. So thank u!!",
	"Our community is better because u r in it.",
	"Someone is getting through something hard right now because u've got their back. ",
	"u have the best ideas.",
	"u always know how to find that silver lining.",
	"Everyone gets knocked down sometimes, but u always get back up and keep going.",
	"u r a candle in the darkness.",
	"u r a great example to others.",
	"Being around u is like being on a happy little vacation.",
	"u always know just what to say.",
	"u r always learning new things and trying to better urself, which is awesome.",
	"If someone based an Internet meme on u, it would have impeccable grammar.",
	"u could survive a Zombie apocalypse.",
	"u r more fun than bubble wrap.",
	"When u make a mistake, u fix it.",
	"Who raised u? They deserve a medal for a job well done.",
	"u r great at figuring stuff out.",
	"ur voice is magnificent.",
	"The people u love are lucky to have u in their lives.",
	"u r like a breath of fresh air.",
	"u r gorgeous -- and that's the least interesting thing about u, too.",
	"u r so thoughtful.",
	"ur creative potential seems limitless.",
	"ur name suits u to a T.",
	"u r irresistible when u blush.",
	"Actions speak louder than words, and urs tell an incredible story.",
	"Somehow u make time stop and fly at the same time.",
	"When u make up ur mind about something, nothing stands in ur way.",
	"u seem to really know who u are.",
	"Any team would be lucky to have u on it.",
	"In high school I bet u were voted 'most likely to keep being awesome.'",
	"I bet u do the crossword puzzle in ink.",
	"Babies and small animals probably love u.",
	"If u were a scented candle they'd call it Perfectly Imperfect (and it would smell like summer).",
	"There's ordinary, and then there's u.",
	"u r someone's reason to smile.",
	"u r even better than a unicorn, because u r real.",
	"How do u keep being so funny and making everyone laugh?",
	"u have a good head on ur shoulders.",
	"Has anyone ever told u that u have great posture?",
	"The way u treasure ur loved ones is incredible.",
	"u r really something special.",
	"u r a gift to those around u.",
	"People enjoy u accidentally touching their butt while putting on ur seat-belt.",
	"u have a very nice butt",
	"i like ur teeth",
	"wow, u look very strong",
	"i wud be honored to have ur babies",
	"u can do it"
]

var prefix ='!'
var memePost=0
var connectionTo = null
var inChannel=false

//bot.on('',''=>{});
bot.on('guildDelete', guild =>{//bot join
    guild.defaultChannel.sendMessage(`${guild.name} has left!`);
});

bot.on('guildCreate', guild =>{//bot leave
    guild.defaultChannel.sendMessage(`${guild.name} has joined!`);
});

bot.on('guildMemberAdd', member =>{
    let guild = member.guild;
    var name = member.user.username;
    guild.defaultChannel.sendMessage(name+' has joined!');
});

bot.on('guildMemberRemove', member =>{
    let guild = member.guild;
    var name = member.user.username;
    guild.defaultChannel.sendMessage('bye '+name);
});

bot.on('guildBanAdd',(guild, user) => {
  	guild.defaultChannel.sendMessage(`${user.username} was just banned!`);
});

bot.on('guildBanRemove',(guild, user) => {
  	guild.defaultChannel.sendMessage(`${user.username} was just unbanned!`);
});

bot.on('message',(message) => {
    let args = message.content.split(' ').slice(1);
	var result = args.join(' ');
	memePost++;
	console.log(memePost);
	if(memePost>100){
		memePost=0;
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
                message.channel.sendMessage("Title: "+ body[0].title);
                message.channel.sendMessage(body[0].file);
            }
        });
	}
	if (message.author.bot) return;

	if(message.content.startsWith(prefix+'help')) {
        message.reply('Available normal commands: ```hi``` - "Hello World!"\n ```help``` - Displays help\n\n```ow + quick/comp``` - Your OW statistics\n ```cat```- Img of a cat\n\n```r8waifu``` - Rates your waifu\n\n```compliment``` - Compliments you\n\n```meme``` - Displays a meme\n ```say + line``` - Echos your line\n ```ping``` - Ping\n ```join``` - Joins a voice chanell\n ```leave``` - Leaves the voice channel \n\n```sound + soundName``` - plays a sound (how, x, bird, some, laugh, yaaa, nigga, norm)\n\n```play + num[1-30]``` - plays a song from a playlist\n\n\nAdmin commands: ```setgame``` - Sets the "playing game"\n ```del + howMany``` - Deletes howMany messages');
    }

    if(message.content.startsWith(prefix+'hi')) {
        message.reply('Hello World!');
    }

    if(message.content.startsWith(prefix+'kachiga')) {
        message.reply('http://www2.arnes.si/~djese1/kachiga.png');
    }

	if(message.content.startsWith(prefix+'compliment')) {
        if(message.author.id=='255800869558288384')message.reply('HANZO SUKCS DICKS!');
		else message.reply(array[Math.floor(Math.random() * 107)  + 1]);
    }

	if(message.content.startsWith(prefix+'r8waifu')) {
		if(result=='')message.reply('no waifu :(');
		else if(result=='Rem'||result=='rem') message.reply('Your waifu __**'+result+'**__ is rated at ```11/10```');
		else message.reply('Your waifu __**'+result+'**__ is rated at ```'+(Math.floor(Math.random() * 7) + 3) + '/10```');
    }

	if(message.content.startsWith(prefix+'quoted')) {				//quotes
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
          url: 'http://192.168.1.27:3000/api/dodobot/quote',
          method: 'POST',
          data: {
              who: quoteGuy,
              what: quote
          },
          json: true
        },function(err, res, body) {

        });
	}else if(message.content.startsWith(prefix+'quote')) {
        console.log("'"+result+"'");
        result = result.toLowerCase();
        ajax({
          url: 'http://192.168.1.27:3000/api/dodobot/quote/' + result,
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
	if(message.content.startsWith(prefix+'ow')) {
		var zblj = false;
		if (result == "quick")
        {
			let messagecount = parseInt(result);
            switch (message.author.id)
            {
				case "161795217803051008": message.channel.sendMessage("|owimg ExidCuter#2336"); break;
                case "243073419044847626": message.channel.sendMessage("|owimg Brynreich#2737"); break;
                case "255800869558288384": message.channel.sendMessage("|owimg ExPie#21935"); break;
				default:message.channel.sendMessage("no user");  zblj=true;break;
            }
			if(!zblj) message.channel.fetchMessages({limit: 2}).then(messages => message.channel.bulkDelete(messages));
        }
        else if (result == "comp")
        {
			let messagecount = parseInt(result);
            switch (message.author.id)
            {
                case "161795217803051008": message.channel.sendMessage("|owcompimg ExidCuter#2336"); break;
                case "243073419044847626": message.channel.sendMessage("|owcompimg Brynreich#2737"); break;
                case "255800869558288384": message.channel.sendMessage("|owcompimg ExPie#21935"); break;
				default:message.channel.sendMessage("no user"); zblj=true; break;
            }
			if(!zblj)message.channel.fetchMessages({limit: 2}).then(messages => message.channel.bulkDelete(messages));

        }
    }

    if(message.content== prefix+'cat'){
		message.channel.sendMessage('ok');
		let messagecount = parseInt(result);
		message.channel.fetchMessages({limit: 2}).then(messages => message.channel.bulkDelete(messages));
        message.channel.sendMessage('https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg');
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
			message.channel.sendMessage('what?');
		}
		else{
			message.channel.sendMessage('ok');
			let messagecount = parseInt(result);
			message.channel.fetchMessages({limit: 2}).then(messages => message.channel.bulkDelete(messages));
			message.channel.sendMessage(temp);
		}
    }

    if (message.content.startsWith(prefix + 'ping')) {
    	message.channel.sendMessage(`\`${Date.now() - message.createdTimestamp} ms\``);
  	}

  	if (message.content.startsWith(prefix + "del") && message.author.id=='161795217803051008') {
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
                message.channel.sendMessage("Title: "+ body[0].title);
                message.channel.sendMessage(body[0].file);
            }
        });
  	}

   if (message.content.startsWith(prefix + 'join')) {
		let voiceChan = message.member.voiceChannel;
		if (!voiceChan || voiceChan.type !== 'voice') {
			message.channel.sendMessage('No').catch(error => message.channel.sendMessage(error));
		} else if (message.guild.voiceConnection) {
			message.channel.sendMessage('I\'m already in a voice channel');
		} else {
			message.channel.sendMessage('Joining...').then(() => {
				voiceChan.join().then(connection => {
					message.channel.sendMessage('Joined successfully.').catch(error => message.channel.sendMessage(error));
					inChannel=true;
					console.log(inChannel);
					connectionTo = connection;
				}).catch(error => message.channel.sendMessage(error));
			}).catch(error => message.channel.sendMessage(error));
		}
	}

	else if (message.content.startsWith(prefix + 'leave')) {
		let voiceChan = message.member.voiceChannel;
		if (!voiceChan) {
			message.channel.sendMessage('I am not in a voice channel');
		} else {
			message.channel.sendMessage('Leaving...').then(() => {
				voiceChan.leave();
				inChannel=false;
				console.log(inChannel);
			}).catch(error => message.channel.sendMessage(error));
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
			message.channel.sendMessage("I'm not in a voice chanell");
		}
	}
	if(message.content.startsWith(prefix + 'play')){
		if(inChannel){
			if(result=='')dispatcher = connectionTo.playFile('./Music/lel.mp3');
			else {
				var song = result;//parseInt(result);
				dispatcher = connectionTo.playFile('./Music/song'+song+'.mp3');
				/*dispatcher.on("end", end => {
					song++;
					dispatcher = connectionTo.playFile('./Music/song'+song+'.mp3');
				});*/
			}
		}
		else {
			message.channel.sendMessage("I'm not in a voice chanell");
		}
	}
	if(message.content.startsWith(prefix + 'stop')){
		if(inChannel){
			dispatcher = connectionTo.playFile('http://www2.arnes.si/~djese1/stop.mp3');
		}
		else {
			message.channel.sendMessage("I'm not in a voice chanell");
		}
	}
	//dispatcher = connection.playFile('./Audio/lel.mp3');


	if(message.content.startsWith(prefix + 'shoot')){
		if(result=='')message.channel.sendMessage("Boom! You are now deded!");
		else  message.channel.sendMessage("Boom! "+result+" is deded!");
	}


});

bot.login('token');
