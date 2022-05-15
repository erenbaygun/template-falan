const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    guildID: String,
    prefix: String
});

const prefix = mongoose.model('prefix', prefixSchema, 'prefixes');

module.exports = prefix;