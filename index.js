const Discord = require('discord.js');
const bot = new Discord.Client();
var fs = require("fs");

var misc = require('./functions/misc.js');
var help = require('./functions/help.js');
var quotes = require('./functions/quotes.js');
var voice = require('./functions/voice.js');
var bank = require('./functions/bank.js');
var meme = require('./functions/meme.js')

var tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));

console.log('loging in to:'+tokens.BotToken);

var music = new Discord.WebhookClient(tokens.WebHookID, tokens.WebHookToken);

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
    let line = message.content.split(' ');
    let args = line.slice(1);
	var result = args.join(' ');
    var command = line[0];
	memePost++;

	if(memePost>100){
		memePost=0;
        meme.meme(message);
	}
	if (message.author.id == "277458741052571648") return;

    switch(command) {
        case prefix+'help':
            help.getHelp(message);
            break;
        case prefix+'hi':
            misc.hi(message);
            break;
        case prefix+'kachiga':
            misc.kachiga(message);
            break;
        case prefix+'compliment':
            misc.getCompliment(message);
            break;
        case prefix+'r8waifu':
            misc.waifu(message, result);
            break;
        case prefix+'quoted':
            quotes.quoted(message, result);
            break;
        case prefix+'quote':
            quotes.quote(message, result);
            break;
        case prefix+'cat':
            message.channel.send('https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg');
            break;
        case prefix+'setgame':
            if(message.author.id != '161795217803051008') break;
            if (!result) result = null;
            bot.user.setGame(result);
            break;
        case prefix+'say':
            misc.say(message, result);
            break;
        case prefix+'lmgtfy':
            misc.lmgtfy(message, result);
            break;
        case prefix+'ping':
            misc.ping(message);
            break;
        case prefix+'del':
            if(message.author.id != '161795217803051008') break;
            let messagecount = parseInt(result) + 1;
            message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
            break;
        case prefix+'meme':
            meme.meme(message);
            break;
        case prefix+'join':
            voice.join(message, result);
            break;
        case prefix+'leave':
            voice.leave(message, result);
            break;
        case prefix+'sound':
            voice.sound(message, result);
            break;
        case prefix+'play':
            voice.play(message, result);
            break;
        case prefix+'song':
            voice.song(message, result);
            break;
        case prefix+'yt':
            voice.yt(message, result);
            break;
        case prefix+'stop':
            voice.stop(message);
            break;
        case prefix+'sp':
            voice.sp(message, result);
            break;
        case prefix+'shoot':
            misc.shoot(message, result);
            break;
        case prefix+'bank':
            bank.bank(message, result);
            break;
        case prefix+'payday':
            bank.payday(message, result);
            break;
        case prefix+'slot':
            bank.slot(message, result);
            break;
        case prefix+'google':
            misc.google(message, result);
            break;
    }
});

bot.login(tokens.BotToken);
