const Discord = require('discord.js');
const bot = new Discord.Client();

var misc = require('./functions/misc.js');
var help = require('./functions/help.js');
var quotes = require('./functions/quotes.js');
var voice = require('./functions/voice.js');
var bank = require('./functions/bank.js');
var meme = require('./functions/meme.js');

var music = new Discord.WebhookClient('338368072765145090', 'HOfnb7bLXkAL4EfdwAPLx-6unefGg-pngjnSGUUJXGZOCYKP8VBcYx0GdP_UchTEcS4F');

var prefix ='!';
var memePost = 0;
var connectionTo = null;
var inChannel = false;
var pays = [];
var slots = [':tangerine:', ':cookie:', ':heart:', ':floppy_disk:', ':minidisc:', ':cd:', ':film_frames:'];


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
	if(memePost>100){
		memePost=0;
        meme.meme(message);
	}
	if (message.author.id == "277458741052571648") return;

	if(message.content.startsWith(prefix+'help')) {
        help.getHelp(message);
    }

    if(message.content.startsWith(prefix+'hi')) {
        misc.hi(message);
    }

    if(message.content.startsWith(prefix+'kachiga')) {
        misc.kachiga(message);
    }

	if(message.content.startsWith(prefix+'compliment')) {
        misc.getCompliment(message);
    }

	if(message.content.startsWith(prefix+'r8waifu')) {
		misc.waifu(message, result);
    }

	if(message.content.startsWith(prefix+'quoted')) {
		quotes.quoted(message, result);
	}
    else if(message.content.startsWith(prefix+'quote')) {
        quotes.quote(message, result);
    }

    if(message.content== prefix+'cat'){
        message.channel.send('https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg');
    }

    if (message.content.startsWith(prefix + 'setgame') && message.author.id=='161795217803051008') {
		if (!result) {
			result = null;
		}
		bot.user.setGame(result);
    }

	if (message.content.startsWith(prefix + 'say')) {
		misc.say(message, result);
    }

    if (message.content.startsWith(prefix + 'lmgtfy')) {
        misc.lmgtfy(message, result);
  	}

    if (message.content.startsWith(prefix + 'ping')) {
    	misc.ping(message);
  	}

  	if (message.content.startsWith(prefix + "del") && message.author.id=='161795217803051008') { // admin user
		var messagecount = parseInt(result) + 1;
		message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
  	}

    if (message.content.startsWith(prefix + 'meme')) {
        meme.meme(message);
  	}

   if (message.content.startsWith(prefix + 'join')) {
       voice.join(message, result);
	}

	else if (message.content.startsWith(prefix + 'leave')) {
		voice.leave(message, result);
	}

	if(message.content.startsWith(prefix + 'sound')){
		voice.sound(message, result);
	}
	if(message.content.startsWith(prefix + 'play')){
		voice.play(message, result);
	}
    if(message.content.startsWith(prefix + 'song')){
        voice.song(message, result);
    }

    if(message.content.startsWith(prefix + 'yt')){
        voice.yt(message, result);
    }

	if(message.content.startsWith(prefix + 'stop')){
		voice.stop(message);
	}

    if(message.content.startsWith(prefix + 'sp')) {
        voice.sp(message, result);
    }

	if(message.content.startsWith(prefix + 'shoot')){
		misc.shoot(message, result);
	}

    if (message.content.startsWith(prefix + 'bank')) {
        bank.bank(message, result);
  	}
    if (message.content.startsWith(prefix + 'payday')){
        bank.payday(message, result);
    }
    if (message.content.startsWith(prefix + 'slot')) {
        bank.slot(message, result);
  	}
});

bot.login('YourBotTokken');
