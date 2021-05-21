const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "создать",
    description: "Создает ticket. Билетик для вопросов ...",
    async execute(client, message, args) {

        if (message.channel.id === "839185104516808714") {

            const channel = await message.guild.channels.create(`ticket-${message.author.username}`)
        
            await channel.setParent('822189388292685905');
        
            channel.updateOverwrite(message.guild.id, {
                'SEND_MESSAGES': false,
                'VIEW_CHANNEL': false
            });
            channel.updateOverwrite(message.author, {
                'SEND_MESSAGES': true,
                'VIEW_CHANNEL': true
            })
        
            const reactionMessage = await channel.send(new Discord.MessageEmbed()
                .setColor('#FFDB00')
                .setAuthor('Привет')
                .setDescription(`Тут ты можешь задать вопрос и я не гарантирую тебе что на него скоро ответят, хотя может и ответят быстро, ты это попробуй : )`)
            )
            try {
                await reactionMessage.react("🔒");
                await reactionMessage.react("⛔");
            } catch (err) {
                channel.send("Ошибка при отправке эмодзи!");
                throw err;
            }
            const collector = reactionMessage.createReactionCollector(
                (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"), {
                    dispose: true
                }
            );
        
            collector.on("collect", (reaction, user) => {
                switch (reaction.emoji.name) {
                    case "🔒":
                        channel.send('Админ нажал на реакцию "🔒" и поэтому я заблокировал этот канал.');
                        channel.updateOverwrite(message.author, {
                            SEND_MESSAGES: false
                        });
                        break;
                    case "⛔":
                        channel.send('Админ нажал на реакцию "⛔" и поэтому я удалю этот канал через 5 секунд.');
                        setTimeout(() => channel.delete(), 5000);
                        break;
                }
            });
        
        
        
            message.channel.send(`<@${message.author.id}>`, new Discord.MessageEmbed()
                .setColor('#FFDB00')
                .setAuthor('Канал чтобы задать вопрос администрации создан')
                .setDescription(`Вот этот канал -> \n <#${channel.id}>, сразу говорю что тебе могут не сразу ответить, но думаю тебе ответят быстро ;)`)
            ).then((msg) => {
                setTimeout(() => msg.delete(), 7000);
                setTimeout(() => message.delete(), 3000);
            }).catch((err) => {
                throw err;
            });
        
        
        }

    }
}
