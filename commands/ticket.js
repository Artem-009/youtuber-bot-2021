module.exports = {
  name: "ticket",
  description: "open a ticket!",
  async execute(client, Discord, message) {
    const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);
    
    channel.setParent("822189388292685905");

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
    });
    channel.updateOverwrite(message.author, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
    });

    const reactionMessage = await channel.send("Спасибо, что обратились в службу поддержки!");

    try {
      await reactionMessage.react("🔒");
      await reactionMessage.react("⛔");
    } catch (err) {
      channel.send("Ошибка при отправке эмодзи!");
      throw err;
    }

    const collector = reactionMessage.createReactionCollector(
      (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
      { dispose: true }
    );

    collector.on("collect", (reaction, user) => {
      switch (reaction.emoji.name) {
        case "🔒":
          channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
          break;
        case "⛔":
          channel.send("Удаление этого канала через 5 секунд!");
          setTimeout(() => channel.delete(), 5000);
          break;
      }
    });

    message.channel
      .send(`Канал создан, вот он -> ${channel}`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 7000);
        setTimeout(() => message.delete(), 3000);
      })
      .catch((err) => {
        throw err;
      });
  },
};
