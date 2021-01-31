module.exports = {
	name: 'slowmode',
	description: 'Устанавливает медленный режим ...',
	execute(client, message, args) {
  var args = message.content.substr(1).split(/ +/);
   if(args[1] != null){
     message.channel.setRateLimitPerUser(args[1] , "была использована команда /slowmode");
     message.delete();
      const Discord = require('discord.js');
      const embedSlowmode = new Discord.MessageEmbed()
     .setTitle('<a:check:797107045488001025> Медленный режим применен на ' + args[1] + ' сек.')
     .setColor("GREEN")
     .setTimestamp()
    message.channel.send(embedSlowmode);
   }
	},
};