module.exports = {
	name: 'activity',
	description: 'Изменяет активность бота (играет,слушает,смотрит)',
	execute(client, message, args, config) {
     if (!message.author.id == config.ownerID) return message.channel.send('<a:alert:803281138599985192> Не разрешено!');
      const moment = require("moment");
      require("moment-duration-format");

      //here you tell the bot to choose the kind of activity
          if (args[0] === "listening"){
              types = 2
          } else if (args[0] === "streaming"){
              types = 1
          } else if (args[0] === "watching"){
              types = 3
          } else {
              return message.channel.send("Неверный вариант")
          }
      //here you tell the bot what the activity is
          args.shift()
          content = args.join(' ')
          client.user.setPresence({
              activity: {
                  name: content,
                  type: types
              }
          })
          message.channel.send(`**${message.author.username}** Готово :D`) 
	},
};