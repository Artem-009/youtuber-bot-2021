module.exports = () => {
    console.log(`Logged in as ${client.user.tag}!`);
    var textChannel = client.channels.cache.get("797969685747335198");
    const embedOnline = new Discord.MessageEmbed()
      .setTitle(`<:online:798167234840231936> Я онлайн!`)
      .setColor("#00BFFF")
      .setTimestamp()
     textChannel.send(embedOnline);

     const activities_list = [
        "префикс /",
        "Node.js",
        "JavaScript",
        "Discord",
        "смотрит видео ютубера",
        "не играет",
        "GG"
      ];

      setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
      }, 10000);
      client.user.setActivity(config.activity, { type: 'PLAYING' });



      const ytdl = require('ytdl-core');
      const channel = client.channels.cache.get("643218217891790861");
      if (!channel) return console.error("The channel does not exist!");
      channel.join().then(connection => {
        console.log("Successfully connected to voice channel.");
        connection.play(ytdl('https://youtu.be/EQj9s9VAV64', { filter: 'audioonly' }));
      })



}