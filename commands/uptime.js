module.exports = {
	name: 'uptime',
	description: 'Показывает сколько запущен бот',
	execute(client, message, args) {
      let totalSeconds = (client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      let uptime = `${days} дней(я), ${hours} часов(а), ${minutes} минут(ы) и ${seconds} секунд(ы)`;
    
      const Discord = require('discord.js');
      const embedUptime = new Discord.MessageEmbed()
     .setTitle(`<a:DiscordLoading:677859494499450880> Время безотказной работы бота`)
     .setDescription(uptime)
     .setColor("#FF8C00")
     .setTimestamp()
    message.channel.send(embedUptime);
	},
};