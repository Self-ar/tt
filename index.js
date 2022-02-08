const { Client, Collection } = require('discord.js');
const config = require('./config.json')
global.client = new Client({ intents: [32767] });

client.SlashCommands = new Collection();
require('./loader');

client.login(config.token)