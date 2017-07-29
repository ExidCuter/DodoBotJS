var tableOfCommands = [
    {name: 'Available normal commands', description: ''},
    {name: 'hi', description: '```hi``` - "Hello World!"'},
    {name: 'help', description: '```help``` - Displays help'},
    {name: 'cat', description: '```cat```- Img of a cat'},
    {name: 'r8waifu', description: '```r8waifu + who``` - Rates your waifu'},
    {name: 'compliment', description: '```compliment``` - Compliments you'},
    {name: 'meme', description: '```meme``` - Displays a meme'},
    {name: 'say', description: '```say + line``` - Echos your line'},
    {name: 'ping', description: '```ping``` - Ping'},
    {name: 'join', description: '```join``` - Joins a voice chanell'},
    {name: 'leave', description: '```leave``` - Leaves the voice channel'},
    {name: 'sound', description: '```sound + soundName``` - plays a sound (how, x, bird, some, laugh, yaaa, nigga, norm)'},
    {name: 'play', description: '```play + num[1-30]``` - plays a song from a playlist'},
    {name: 'shoot', description: '```shoot OR shoot + @person``` - Shoots you OR shoots @person'},
    {name: 'kachiga', description: '```kachiga``` - kachiga meme'},
    {name: 'quoted', description: '```quoted + @person "what"``` - Quotes a preson'},
    {name: 'quote', description: '```quote + person``` - Posts a random quote from that person'},
    {name: 'Admin commands ', description: ''},
    {name: 'setgame', description: '```setgame``` - Sets the "playing game" '},
    {name: 'del', description: '```del + howMany``` - Deletes howMany messages'}
];

module.exports.getHelp = function (message){
    var ret = "\n";
    tableOfCommands.forEach(function(elem){
        ret = ret + elem.name  + ': ' + elem.description + '\n\n';
    });
    message.reply(ret);
};
