const memberCounter = require('../../counters/member-counter.js');

module.exports = (Discord, client) => {
  memberCounter(client);

  console.log(`Logged in as ${client.user.tag}!`);
  // var textChannel = client.channels.cache.get("797969685747335198");
  // const embedOnline = new Discord.MessageEmbed()
  //   .setTitle(`<:online:798167234840231936> Я онлайн!`)
  //   .setColor("#00BFFF")
  //   .setTimestamp()
  //  textChannel.send(embedOnline);

  // client.user.setActivity(config.activity, { type: 'PLAYING' });
  //  client.user.setPresence({ activity: { type: 'WATCHING', name: '@everyone' }, status: 'dnd' })

  const activities_list = [
    "радио",
    "[̲̅Y̲̅σ̲̅υ̲̅т̲̅υ̲̅b̲̅є̲̅r]",
    ".help",
    "ничего",
    "что-то",
    "Tanki Online"
  ];

  setInterval(() => {
      const index = Math.floor(Math.random() * activities_list.length);
      client.user.setActivity(activities_list[index], {
      type: "STREAMING",
      url: "https://www.twitch.tv/y0utuber"
      });
    }, 10000);

  const ytdl = require('ytdl-core');
  const channel = client.channels.cache.get("643456185256640528");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    console.log("Successfully connected to voice channel.");
    connection.play('https://cast.fex.net/bfm_l');
    // connection.play(ytdl('https://youtu.be/36YnV9STBqc', { filter: 'audioonly' }));
  })

  // http://198.15.94.34:8006/stream - american radio :P
  // https://cast.fex.net/bfm_l - еще какое-то радио :Р
  // https://online.hitfm.ua/HitFM_HD - hit fm ua
  // https://online.radiorelax.ua/RadioRelax - radio relax



}