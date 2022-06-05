const Discord = require('discord.js');
const database = require('../database/mongoDB');
const { emoji } = require('../../config');

module.exports = async (client, interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
        if (!interaction.guild) return;
        if (!client.slash.has(interaction.commandName)) return;

        const command = client.slash.get(interaction.commandName)

        try {
            if (command.permissions) {
                if (!interaction.member.permissions.has(command.permissions)) {
                    return interaction.reply({ content: `:x: | You're missing permissions : ${command.permissions.map(p => `\`${p}\``).join(', ')}`, ephemeral: true })
                }
            }

            command.run(client, interaction);

        } catch (e) {
            console.log(e);
            await interaction.reply({ content: client.language.ERROR, ephemeral: true });
        }
    }
};
