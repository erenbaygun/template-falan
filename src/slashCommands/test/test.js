const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command').toJSON(),
    name: "test",
    permissions: [],

    run: async (client, interaction) => {
        interaction.reply({ content: "you runned the test command" })
    }
}