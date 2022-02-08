const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const config = require('./config.json')
const clientId = config.clientId;
const commands = [];

readdirSync('./commands/').forEach(dirs => {
    const commandFiles = readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dirs}/${file}`);
        commands.push(command.data.toJSON());
    }
});

const rest = new REST({ version: '9' }).setToken(config.token);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();