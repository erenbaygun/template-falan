const { Client, Collection } = require("discord.js");
const client = new Client({
    allowedMentions: { parse: ['users', 'roles'] },
    fetchAllMembers: false,
    intents: 32767,
});

//SET COLLECTION
client.commandes = new Collection();
client.slash = new Collection();
client.aliases = new Collection();

//SET UTILS
client.logger = require('./src/utils/logger');
client.color = require('./src/utils/color.js');

//SET CONFIG
client.config = require('./config');

// LOAD THE 4 HANDLERS
["error", "command", "slashCommands", "event"].forEach(file => { require(`./src/utils/handlers/${file}`)(client) })

client.login(client.config.token); 