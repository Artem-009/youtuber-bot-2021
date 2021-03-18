module.exports = {
	name: 'lock',
	description: 'Блокирует канал от сообщений',
	execute(client, message, args, config) {
     if (!message.author.id == config.ownerID) return message.channel.send('<a:alert:803281138599985192> Не разрешено!');
    message.channel.overwritePermissions([
      {
         id: '643218217350856724', // @everyone
         deny: ['SEND_MESSAGES'],
      },
    ]);
    message.delete().catch(console.err);
      const Discord = require('discord.js');
      const embedLock = new Discord.MessageEmbed()
     .setTitle('<a:check:797107045488001025> Канал заблокирован.')
     .setColor("GREEN")
     .setTimestamp()
    message.channel.send(embedLock);
	},
};