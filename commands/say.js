module.exports = {
	name: 'say',
	description: 'Можно что-то сказать от имени бота',
	execute(client, message, args, config) {
     if (!message.author.id == config.ownerID) return message.channel.send('<a:alert:803281138599985192> Не разрешено!');
      let text = args.join(" ");
      message.delete();
      message.channel.send(text);  
	},
};