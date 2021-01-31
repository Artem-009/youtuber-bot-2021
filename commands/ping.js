module.exports = {
	name: 'ping',
	description: 'Проверяет пинг бота ...',
	execute(client, message, args) {
    async function ping() {
        let msg = await message.channel.send('<a:DiscordLoading:677859494499450880>');
        await msg.edit(`Pong! \`${Date.now() - msg.createdTimestamp}` + 'ms`')
    }
    ping()   
	},
};