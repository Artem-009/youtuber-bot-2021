module.exports = async (client) =>{
    const guild = client.guilds.cache.get('643218217350856724');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('822155385226002503');
        channel.setName(`Всего участников: ${memberCount.toLocaleString()}`);
        // console.log('Обновление количества участников');
    }, 60000); // 60.000 миллисекунд = 1 минута
}