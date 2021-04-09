module.exports = {
    name: 'clear',
    description: "Clear messages!",
   async  execute(client, message, args, config) {
        if (!message.author.id == config.ownerID) return message.channel.send('<a:alert:803281138599985192> Не разрешено!');

        if (!args[0]) return message.reply("Введите количество сообщений, которые нужно удалить!");

        if(isNaN(args[0])) return message.reply("Пожалуйста, введите реальную цифру!");

        if(args[0] > 100) return message.reply("Вы не можете удалить более 100 сообщений!\nP.S. Привет, ограничения дискорда");
        
        if(args[0] < 1) return message.reply("Вы должны удалить хотя бы одно сообщение!");

        await message.channel.messages.fetch({ limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)
            const Discord = require('discord.js');
            const embedClear = new Discord.MessageEmbed()
              .setTitle(`<a:check:797107045488001025> Удалено ${args[0]} сообщений`)
              .setColor("GREEN")
              .setFooter("Команду запросил - " + message.author.tag, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              message.channel.send(embedClear);
    });

 }
}   