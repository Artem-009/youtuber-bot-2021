const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    aliases: ['wthr'],
    async execute(client, message, args) {
    
        weather.find({search: args.join(" "), degreeType: 'C', lang: 'ru'}, function (error, result){
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Пожалуйста, укажите местонахождение')

        if(result === undefined || result.length === 0) return message.channel.send('**Недействительное** местоположение');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Прогноз погоды в ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor('#FFDB00')
        .addField('Часовой пояс', `UTC${location.timezone}`, true)
        .addField('Тип градусов', 'Celsius', true)
        .addField('Температура', `${current.temperature}°`, true)
        .addField('Ветер', current.winddisplay, true)
        .addField('Чувствуется как', `${current.feelslike}°`, true)
        .addField('Влажность', `${current.humidity}%`, true)
        .setFooter(`Команду запросил - ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()


        message.channel.send(weatherinfo)
        })        
    }
}