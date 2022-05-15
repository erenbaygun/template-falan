const Discord = require('discord.js');
const database = require('../database/mongoDB');
const minerDB = require('../database/schemas/miner');
const prefixDB = require('../database/schemas/prefix');

module.exports = async (client, message) => {
    if (message.author.bot) { return }
    if (message.channel.type == 'dm') { return }
    let prefix
    let data = await prefixDB.findOne({ guildID: message.guild.id })
    if (!data) prefix = client.config.prefix
    else prefix = data.prefix

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) { return message.channel.send(`Selam, Ben ${client.user.username}! Bu sunucudaki ön ekim \`${prefix}\`\n\`${prefix}help\` yazarak tüm komutlarıma ulaşabilirsin.`) }
    if (!message.content.startsWith(prefix)) { return }

    const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    const args = message.content.split(' ').slice(1);
    let cmd;

    if (client.commandes.has(command)) { cmd = client.commandes.get(command) }
    else if (client.aliases.has(command)) { cmd = client.commandes.get(client.aliases.get(command)) }
    if (!cmd) return;

    const props = require(`../command/${cmd.dir}/${cmd.name}`);

    // PERMISSION CHECKER
    if (props.permissions) {
        if (!message.member.permissions.has(props.permissions)) {
            return message.reply(`:x: | You're missing permissions : ${props.permissions.map(p => `\`${p}\``).join(', ')}`)
        }
    }

    //LOADING COMMANDS
    try {
        cmd.run(client, message, args);
    } catch (e) {
        client.emit("error", e, message);
    }
};
