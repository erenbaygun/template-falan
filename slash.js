const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const path = require('path');
const config = require("./config");

const commands = []
readdirSync("./src/slashCommands/").forEach((dir) => {
	let slashCommandFile = readdirSync(`./src/slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));

	for (const file of slashCommandFile) {
		const slashCommand = require(`./src/slashCommands/${dir}/${file}`);
		commands.push(slashCommand.data)
	}
})

const rest = new REST({ version: "9" }).setToken(config.token);

(async () => {
	try {
		console.log('[Discord API] Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationCommands(config.botID),
			{ body: commands },
		);
		console.log('[Discord API] Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();