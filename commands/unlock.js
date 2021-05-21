module.exports = {
	name: 'unlock',
	description: 'Разблокирует канал',
	execute(client, message, args, config) {
     if (!message.author.id == config.ownerID) return message.channel.send('<a:alert:803281138599985192> Не разрешено!');
    message.channel.overwritePermissions([
      {
         id: '657655133307535360', // @User
         allow: ['SEND_MESSAGES'],
      },
    ]);
    message.delete().catch(console.err);
      const Discord = require('discord.js');
      const embedUnlock = new Discord.MessageEmbed()
     .setTitle('<a:check:797107045488001025> Канал разблокирован.')
     .setColor("GREEN")
     .setTimestamp()
    message.channel.send(embedUnlock);
	},
};