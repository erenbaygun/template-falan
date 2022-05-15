const config = require("../../config");
const mongoose = require("mongoose");
const prefixDB = require('../database/schemas/prefix')

module.exports = async (client) => {
    client.logger.info(`[!] ${client.user.username} is now started...`)
    client.logger.info(`[!] The bot have ${client.commandes.size} commands and ${client.slash.size} (/) commands`)
    client.user.setActivity(`${config.prefix}help | github.com/ErenBaygun`, { type: 'PLAYING' })

    mongoose.connect(config.mongoose, {
        keepAlive: true
    }).then(() => {
        client.logger.database(`Connected to mongoose database.`)
    })


    client.guilds.cache.forEach(async guild => {
        let prefix = await prefixDB.findOne(
            {
                guildID: guild.id
            }
        )
        let prefixData = {
            guildID: guild.id,
            prefix: client.config.prefix
        }
        if (!prefix) await new prefixDB(prefixData).save()
    });
};
