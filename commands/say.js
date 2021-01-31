module.exports = {
	name: 'say',
	description: 'Можно что-то сказать от имени бота',
	execute(client, message, args) {
      let text = args.join(" ");
      message.delete();
      message.channel.send(text);  
	},
};