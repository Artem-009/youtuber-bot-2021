require('events').EventEmitter.defaultMaxListeners = 0;


const express = require('express');
const app = express();
app.get('/', (req, res) => {
res.json('running ...');
});
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
const fs = require('fs');
const fetch = require("node-fetch");

const config = require("./config.json");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}



const activities_list = [
    "префикс /", 
    "Node.js",
    "JavaScript", 
    "Discord",
    "COVID-19",
    "смотрит видео ютубера",
    "не играет"
    ]; // creates an arraylist containing phrases you want your bot to switch through.


client.on('ready', () => {
  
  var textChannel = client.channels.cache.get("797969685747335198");
  
      const embedOnline = new Discord.MessageEmbed()
     .setTitle(`<:online:798167234840231936> Я онлайн! Меня кто-то включил или сам youtuber включил.`)
     .setColor("#00BFFF")
     .setTimestamp()      
    // textChannel.send(embedOnline);
  
  
  console.log(`Logged in as ${client.user.tag}!`);
  
  
  setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000);
  
  client.user.setActivity(config.activity, { type: 'PLAYING' });
  // client.user.setStatus('dnd'); // idle, dnd, online ...
  
});


client.on('ready', () => {
  const ytdl = require('ytdl-core');
      
   const channel = client.channels.cache.get("643218217891790861");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    console.log("Successfully connected to voice channel.");
    connection.play(ytdl('https://youtu.be/EQj9s9VAV64', { filter: 'audioonly' })); 
  })
  
  
});


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '│основной');
  if (!channel) return;
      const welcomeEmbedMsg = new MessageEmbed()
      .setTitle(`Добро пожаловать!`)
      .setColor('#D0FF00')
      .setDescription(`${member}, Привет!\nРасполагайся ;)\nЕсли будет время, прочти правила тут: <#796400081783619665>, чтобы не нарушать ничего..\nУдачи тебе!`);
  channel.send(welcomeEmbedMsg);
});
  

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		client.commands.get('ping').execute(client, message, args);
	} else if (command === 'say') {  
      if(message.author.id !== config.ownerID) return message.channel.send(config.NO_ENTRY_message);
      client.commands.get('say').execute(client, message, args);
  } else if (command === 'uptime') {
    client.commands.get('uptime').execute(client, message, args);
  } else if (command === 'slowmode') {
    if(message.author.id !== config.ownerID) return message.channel.send(config.NO_ENTRY_message);
    client.commands.get('slowmode').execute(client, message, args);
  } else if (command === 'lock') {
    if(message.author.id !== config.ownerID) return message.channel.send(config.NO_ENTRY_message);
    client.commands.get('lock').execute(client, message, args);
  } else if (command === 'unlock') {
    if(message.author.id !== config.ownerID) return message.channel.send(config.NO_ENTRY_message);
    client.commands.get('unlock').execute(client, message, args);
  } else if (command === 'nitro') {
    client.commands.get('nitro').execute(client, message, args);
  } else if (command === 'help') {
    client.commands.get('help').execute(client, message, args);
  }
  
  
  
  
});






client.on('message', message => { // <a:IMXO:797221960508768267>
  console.log(`${message.author.tag} в канале ${message.channel.name} сказал: ${message.content}`);
    
    if (message.content.toLowerCase() === 'имхо') {
    message.channel.send('<a:IMXO:797221960508768267>');
    message.react('<a:IMXO:797221960508768267>');
  }
  if (message.content.toLowerCase() === 'керби') {
    message.channel.send('<a:defaultKirby:797221758976655370>');
    message.react('<a:defaultKirby:797221758976655370>');
  }
  if (message.content.toLowerCase() === 'partyblob1') {
    message.channel.send('<a:partyblob1:797159937846673448>');
    message.react('<a:partyblob1:797159937846673448>');
  }
  
  
});


// Posting gifs ...
client.on("message", gotMessage);
async function gotMessage(msg) {
  // use cleanContent instead of content to remove tagging
    let tokens = msg.cleanContent.split(" ");

    if (tokens[0] == config.prefix + "gif") {
      let keywords = "youtube";
      if (tokens.length > 1) {
        keywords = tokens.slice(1, tokens.length).join(" ");
      }
      let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=high`;
      let response = await fetch(url);
      let json = await response.json();
      const index = Math.floor(Math.random() * json.results.length);
      msg.channel.send(json.results[index].url);
      msg.channel.send("GIF from Tenor: " + keywords);
    }
}



//  детектор плохих слов ...
const swearWords = ["fuck", "suck", "сука", "блять"];
client.on('message', message => {
if( swearWords.some(word => message.content.includes(word)) ) {
  message.reply("Ты сказал очень нехорошее слово! Не делай этого.");
  message.delete(); // удаляем сообщение, чтобы никто это не видел.
}
});



// Манипуляции с Canvas ...
const Canvas = require('canvas');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === '│основной');
	if (!channel) return;

	const canvas = Canvas.createCanvas(800, 250); // 700, 250
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://cdn.glitch.com/88e46f1f-5b30-452a-835e-c4535f187a7d%2Fwallpaper.jpeg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(attachment);
	// channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on('message', message => {
	if (message.content.toLowerCase() === config.prefix + 'j') {
		client.emit('guildMemberAdd', message.member);
	}
});





client.on('message', message => {
  if (message.channel.id === '805469540594745375') {
  if (message.content.toLowerCase() === process.env.number) {
       
    message.channel.overwritePermissions([
      {
         id: '643218217350856724', // @everyone
         deny: ['SEND_MESSAGES'],
      },
    ]).catch(console.error);
      
    const embedLock = new Discord.MessageEmbed()
     // .setTitle(`<a:check:797107045488001025> Розыгрыш чего-то там окончен.`)
     .setTitle(`<a:check:797107045488001025> Тестовый розыгрыш завершен.`)
     .setColor("GREEN")
    
    message.channel.send(embedLock);
    message.channel.send(`Победитель - <@${message.author.id}>! :tada:`);
    message.channel.send(`Скоро будет выдан приз ...`);
    message.react('<a:partyblob1:797159937846673448>');
    
  }
    }
});

// Сделать "угадайку"... пользователь должен угадать число и канал блокируется от сообщений.
// И потом давать приз .....какой-то
// для этого сделать отдельный канал.






client.login(process.env.TOKEN);
