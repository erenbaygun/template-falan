const minerDB = require("./schemas/miner")
const prefixDB = require("./schemas/prefix")

module.exports.updatePrefix = async function (serverID, newPrefix) {
    return await prefixDB.findOneAndUpdate(
        {
            guildID: serverID
        },
        {
            prefix: newPrefix
        }
    )
}