const Canvas = require('canvas');
const { registerFont, createCanvas } = require('canvas')
registerFont('./fonts/comic-sans.ttf', { family: 'Comic Sans' })

module.exports = async (Discord, client, member) => {

const channel = member.guild.channels.cache.find(ch => ch.name === '│основной');
	if (!channel) return;

  const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;
    do {
      context.font = `${fontSize -= 10}px sans-serif`;
    } while (context.measureText(text).width > canvas.width - 300);
    return context.font;
  };


	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/835619205909839884/845721299870941184/939716.png?width=1920&height=1080');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// ctx.strokeStyle = '#ff954a'; // делает обводку... ненужная хрень крч или нужная
	// ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#252525';
	ctx.fillText('Добро пожаловать на сервер,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#252525';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(attachment);

}