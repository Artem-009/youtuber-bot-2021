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
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord)
})




client.on('message', message => { // <a:IMXO:797221960508768267>
  console.log(`${message.author.tag} в канале ${message.channel.name} сказал: ${message.content}`);

    const webhookClient = new Discord.WebhookClient('809945336940462090', 'jonXYbmC1ABxAL8AulPtS5P_aW5ZcSVSstdodYcHjx7Dx_8xPeE9D61CrUuXDXnQve9W');

  if (message.content.toLowerCase() === 'имхо') {
          webhookClient.send('<a:IMXO:797221960508768267>', {
	      username: message.author.username,
	      avatarURL: message.author.displayAvatarURL()
        });
  message.delete();
  }
  if (message.content.toLowerCase() === 'керби') {
    webhookClient.send('<a:defaultKirby:797221758976655370>', {
	      username: message.author.username,
	      avatarURL: message.author.displayAvatarURL()
        });
    message.delete();
  }
  if (message.content.toLowerCase() === 'partyblob1') {
    webhookClient.send('<a:partyblob1:797159937846673448>', {
	      username: message.author.username,
	      avatarURL: message.author.displayAvatarURL()
        });
    message.delete();
  }
  if (message.content.toLowerCase() === 'nitro') {
    webhookClient.send('<a:nitro:797159937469186060>', {
	      username: message.author.username,
	      avatarURL: message.author.displayAvatarURL()
        });
    message.delete();
  }
  if (message.content.toLowerCase() === 'DiscordLoading') {
    webhookClient.send('<a:DiscordLoading:677859494499450880>', {
	      username: message.author.username,
	      avatarURL: message.author.displayAvatarURL()
        });
    message.delete();
  }
  if (message.content.toLowerCase() === 'amongusrunning') {
    webhookClient.send('<a:amongusrunning:797159938430468107>', {
	      username: message.author.username,
	      avatarURL: message.author.displayAvatarURL()
        });
    message.delete();
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
  if (swearWords.some(word => message.content.includes(word))) {
    message.reply("Ты сказал очень нехорошее слово! Не делай этого.");
    message.delete(); // удаляем сообщение, чтобы никто это не видел.
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
        .setTimestamp()

      message.channel.send(embedLock);
      message.channel.send(`Победитель - <@${message.author.id}>! :tada:`);
      message.channel.send(`Скоро будет выдан приз ...`);
      message.react('<a:partyblob1:797159937846673448>');

    }
  }
});







// counting game ...
  client.on('message', async message =>{
    if (message.channel.id === '811316292211572796') {    
     let webhookClient = new Discord.WebhookClient('811316534499868723', 'qhzffRsaQiOo6RnaX5UTbMh_SgFwAbRqH0iBnxNYQyyY2-mNv1PxYqc0nFxZoE6vlJjF');
     let count = JSON.parse(fs.readFileSync("./count.json", "utf8"));
    if (message.author.bot) return;
    if (Number(message.content) === count + 1) {
      message.delete();
      count++
      webhookClient.send(count, {
          username: message.author.username,
          avatarURL: message.author.displayAvatarURL()
        });
    fs.writeFile("./count.json", JSON.stringify(count), (err) => {
      if (err) console.error(err)
    });
    } else {
      message.delete();
    }
      
   }
});





// Ставит реакции в канале #мемы | перенесено с старого бота ...
client.on('message', message => {
  if (message.channel.id === "646120581779161090") {
      message.react('😂')
          .then(() => { 
              message.react('👀')
          });
  }
});

// ------------------------------------------------------


client.on('message', message => {
  if (message.content === 'Слава Украине') {
    message.channel.send('Героям Слава!');
  }
  if (message.content.toLowerCase() === config.prefix + 'healme') {
    message.reply('Вы вылечены от вируса!');
  }
});










// client.login(process.env.TOKEN);
