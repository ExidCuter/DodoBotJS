var ffmpeg = require('ffmpeg');
var ajax = require('ajax-request');
const ytdl = require('ytdl-core');

var connectionTo = null;
var inChannel = false;

module.exports.join = function(message) {
     let voiceChan = message.member.voiceChannel;
     if (!voiceChan || voiceChan.type !== 'voice') {
         message.channel.send('No').catch(error => message.channel.send(error));
     } else if (message.guild.voiceConnection) {
         message.channel.send('I\'m already in a voice channel');
     } else {
         message.channel.send('Joining...').then(() => {
             voiceChan.join().then(connection => {
                 message.channel.send('Joined successfully. Play music using !play').catch(error => message.channel.send(error));
                 inChannel=true;
                 console.log(inChannel);
                 connectionTo = connection;
             }).catch(error => message.channel.send(error));
         }).catch(error => message.channel.send(error));
     }
 };

module.exports.leave = function(message) {
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
 };

module.exports.sound = function(message, result) {
     if(inChannel){
         if(result=='')dispatcher = connectionTo.playFile('./Music/lel.mp3');
         else {

             dispatcher = connectionTo.playFile('./Sound/'+result+'.mp3');
         }
     }
     else {
         message.channel.send("I'm not in a voice chanell");
     }
 };
module.exports.play = function(message, result) {
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
 };

module.exports.song = function(message, result) {
     if(inChannel){
         if(result=='') message.channel.send("No file you dumbo");
         else {
             var song2 = result;
             console.log("guten Tag");
             console.log(song2);
             dispatcher = connectionTo.playFile(song2);
         }
     }
     else {
         message.channel.send("I'm not in a voice chanell");
     }
 };

module.exports.yt = function(message, result) {
     if(inChannel){
         if(result=='') message.channel.send("No link you dumbo");
         else {
             try {
                 var stream = ytdl(result, { filter: 'audioonly' });
                 dispatcher = connectionTo.playStream(stream);
                 ytdl.getInfo(result, function(err, info) {
                     /*music.send({embeds: [{
                         color: 3447003,
                         title: "Now playing",
                         url: result,
                         fields: [{
                             name: info.title,
                             value: "From YouTube"
                         }],
                         footer: {
                             icon_url: "https://pbs.twimg.com/media/C21m_KAVIAAvuH6.jpg",
                             text: "© DodoBot"
                         }
                     }]});*/
                 });
             } catch (e) {
                 console.log(e);
                 message.channel.send("Wrong link you dumbo");
             }
         }
     }
     else {
         message.channel.send("I'm not in a voice chanell");
     }
 };

module.exports.stop = function(message) {
     if(inChannel){
         dispatcher = connectionTo.playFile('./stop.mp3');
     }
     else {
         message.channel.send("I'm not in a voice chanell");
     }
 };

module.exports.sp = function(message, result) {
     if(inChannel){
         ajax({  // Your standard AJAX shizzle
               url: 'http://192.168.1.150:3000/api/dodobot/songs',
               method: 'GET',
               json: true
             }, function(err, res, body) {
                 if(err){
                     console.log(err);
                 }
                 else{
                     let max = -1; // Best mach yet (-1 if not yet found any)
                     let e; // Song to be played
                     let quer = result.toUpperCase(); // Our search string
                     body.forEach(function(element) {
                         let curr = Math.max(element.name.length - LevenshteinDistance(quer, element.name.toUpperCase()), element.artist.length - LevenshteinDistance(quer, element.artist.toUpperCase())); // Calculate match
                         if(curr > max) { // Remember match if it's the best one so far
                             max = curr;
                             e = element;
                         }
                     });
                     message.channel.send("Playing " + e.name + " by " + e.artist + "!"); // Say you're playing it (but you're actually not)
                     dispatcher = connectionTo.playFile(e.path); // Play it

                }
         });
     }
     else {
         message.channel.send("I'm not in a voice chanell");
     }
 };

 function LevenshteinDistance(s, t) {
     let d = [];
     let m = s.length;
     let n = t.length;
     for(let i = 0; i <= m; i++) {
         d[i] = [];
         for(let j = 0; j <= n; j++)
             d[i][j] = 0;
     }
     for(let i = 1; i <= m; i++) d[i][0] = i;
     for(let j = 1; j <= n; j++) d[0][j] = j;
     let substitutionCost;
     for(let j = 1; j <= n; j++) {
         for(let i = 1; i <= m; i++) {
             if(s.charAt(i) == t.charAt(j)) substitutionCost = 0;
             else substitutionCost = 1;
             d[i][j] = Math.min(d[i-1][j] + 1,                   // deletion
                                d[i][j-1] + 1,                   // insertion
                                d[i-1][j-1] + substitutionCost)  // substitution
         }
     }
     return d[m][n];
 }
