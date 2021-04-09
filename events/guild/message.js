module.exports = (Discord, client, message) => {
    const prefix = '.';
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if(message.author.bot || message.channel.type === "dm") return message.channel.send('Эта команда не работает в личных сообщениях');

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) command.execute(client, message, args, Discord);
}