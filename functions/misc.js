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
];

module.exports.getCompliment = function(message) {
    message.reply(array[Math.floor(Math.random() * array.length)  + 1]);
};
module.exports.kachiga = function(message) {
	message.reply('http://www2.arnes.si/~djese1/kachiga.png');
};

module.exports.hi = function(message) {
	message.reply('Hello World!');
};

module.exports.waifu = function(message, result) {
	if(result=='')message.reply('no waifu :(');
	else if(result=='Rem'||result=='rem') message.reply('Your waifu __**'+result+'**__ is rated at ```11/10```');
	else message.reply('Your waifu __**'+result+'**__ is rated at ```'+(Math.floor(Math.random() * 7) + 3) + '/10```');
};

module.exports.lmgtfy = function(message, result) {
	var querry = result.split(' ').join('+');
	message.channel.send('http://lmgtfy.com/?q='+querry);
};

module.exports.say = function(message, result) {
	var temp = result;
	if (!temp) {
		message.channel.send('what?');
	}
	else{
		message.channel.send(temp);
	}
};

module.exports.ping = function(message) {
	message.channel.send(`\`${Date.now() - message.createdTimestamp} ms\``);
};

module.exports.shoot = function(message, result) {
	if(result=='')message.channel.send(":boom: :gun: \nYou are now deded!");
	else  message.channel.send(":boom: :gun: \n"+result+" is deded!");
}
