module.exports = (Discord, client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    // var textChannel = client.channels.cache.get("797969685747335198");
    // const embedOnline = new Discord.MessageEmbed()
    //   .setTitle(`<:online:798167234840231936> Я онлайн!`)
    //   .setColor("#00BFFF")
    //   .setTimestamp()
    //  textChannel.send(embedOnline);

      // client.user.setActivity(config.activity, { type: 'PLAYING' });
      client.user.setPresence({ activity: { type: 'WATCHING', name: '@everyone' }, status: 'dnd' })

      const ytdl = require('ytdl-core');
      const channel = client.channels.cache.get("643218217891790861");
      if (!channel) return console.error("The channel does not exist!");
      channel.join().then(connection => {
        console.log("Successfully connected to voice channel.");
        connection.play(ytdl('https://youtu.be/EQj9s9VAV64', { filter: 'audioonly' }));
      })



}