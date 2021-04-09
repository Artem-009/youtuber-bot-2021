module.exports = {
	name: 'scr',
	description: 'Делает скриншот сайта ...',
	execute(client, message, args) {
        const Discord = require("discord.js");
        const embedScreenshot = new Discord.MessageEmbed()
      .setTitle(`Скриншот сайта ${args[0]}`)
      .setColor("GREEN")
      .setImage(`http://mini.s-shot.ru/1280x720/JPEG/1280/Z100/https://?${args[0]}`)
      .setFooter("Команду запросил - " + message.author.tag, `${message.author.displayAvatarURL()}`)
      .setTimestamp();
      message.channel.send(embedScreenshot);  
      message.react('<a:check:797107045488001025>');
	},
};