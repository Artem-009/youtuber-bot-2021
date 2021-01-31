module.exports = {
	name: 'nitro',
	description: 'Генерирует Discord Nitro. Но это может не работать :( \nЕсли бы это работало то так бы все делали...\nХотя может какой-то шанс есть...',
	execute(client, message, args) {
        function gen_str(len) {
            var chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
            var str = '';
            for (var i = 0; i < len; i++) {
                var pos = Math.floor(Math.random() * chrs.length);
                str += chrs.substring(pos,pos+1);
            }
            return str;
        }
    message.channel.send('https://discord.gift/' + gen_str(16));
	},
};