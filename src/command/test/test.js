const database = require('../../database/mongoDB');

module.exports = {
    name: 'test',
    description: 'Very simple test of a command to understand how to use this template',
    usage: '<prefix>test',
    examples: ['test'],
    aliases: ['tst'],
    dir: "test",
    permissions: [],

    run: async (client, message, args) => {
        message.reply('You runned the test command')
    }
}