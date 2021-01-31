module.exports = {
  name: "help",
  description: "Справка по всем командам ...",
  execute(client, message, args) {
    const Discord = require("discord.js");
    const embedHelp = new Discord.MessageEmbed()
      .setTitle("<:info:797231305808936960>  Справка по всем командам (help)")
      .setColor("BLUE")
      .setDescription(
        "`help` - показывает справку по всем командам (это сообщение)\n\n`lock` - блокирует канал от сообщений\n\n`unlock` - разблокирует канал\n\n`uptime` - показывает сколько запущен бот без перезагрузки ...\n\n`slowmode` - устанавливает медленный режим в канале\n\n`say` - сказать от имени бота\n\n`ping` - проверяет пинг бота\n\n`nitro` - генерирует Discord Nitro (но это почти нереально сгенерировать...)\n\n"
      )
      .setFooter("Команду запросил - " + message.author.tag, `${message.author.displayAvatarURL()}`)
      .setTimestamp();
    message.channel.send(embedHelp);
  }
};
