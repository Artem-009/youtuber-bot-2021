const fs = require('fs');

module.exports = {
  name: "help",
  aliases: ['хелп', 'справка', 'помощь'],
  description: "Справка по всем командам ...",
  execute(client, message, args) {
    let helpFile = fs.readFileSync("commands/help.txt", "utf8");
    const Discord = require("discord.js");
    const embedHelp = new Discord.MessageEmbed()
      .setTitle("<:info:797231305808936960>  Справка по всем командам (help)")
      .setColor("BLUE")
      .setDescription(helpFile)
      .setFooter("Команду запросил - " + message.author.tag, `${message.author.displayAvatarURL()}`)
      .setTimestamp();
    message.channel.send(embedHelp);
  }
};
