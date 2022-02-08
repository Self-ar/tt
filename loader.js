const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
client.SlashCommands = new Collection();

///////////////////////// Events /////////////////////////

console.log(`\nLoading Events...\n`);

readdirSync('events/').forEach(dirs => {
  console.log(`-> Loading ${dirs}`);
  const events = readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

  for (const file of events) {
    const event = require(`./events/${dirs}/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${dirs}/${file}`)];
  };
});

///////////////////////// Slash Commands /////////////////////////

console.log(`\nLoading Slash Commands...\n`);

readdirSync('./commands/').forEach(dirs => {
  console.log(`-> Loading ${dirs}`);
  const commandFiles = readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${dirs}/${file}`);
    client.SlashCommands.set(command.data.name, command);
    delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
  };
});