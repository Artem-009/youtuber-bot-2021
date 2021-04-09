module.exports = {
	name: 'scr',
	description: 'Делает скриншот сайта ...',
	execute(client, message, args) {
    if (!args[0]) return message.reply('Введи адрес сайта!').then(message.react('<:check_false:681062175502106628>'));
    
        const Discord = require("discord.js");
        const embedScreenshot = new Discord.MessageEmbed()
      .setTitle(`Скриншот сайта ${args[0]}`)
      .setColor("GREEN")
      .setImage(`https://shot.screenshotapi.net/screenshot?&url=${args[0]}&width=1280&height=720&output=image&file_type=png`)
      .setFooter("Команду запросил - " + message.author.tag, `${message.author.displayAvatarURL()}`)
      .setTimestamp();
      message.channel.send(embedScreenshot).then(message.react('<a:check:797107045488001025>'));

      // .setImage(`http://mini.s-shot.ru/1280x720/JPEG/1280/Z100/https://?${args[0]}`)
      // .setImage(`https://shot.screenshotapi.net/screenshot?&url=${args[0]}&full_page=false&output=image&file_type=png`)
	},
};