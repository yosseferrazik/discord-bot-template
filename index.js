const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const config = require('./settings/config');
const generic = require('generic-logs')

const client = new Client({
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    shards: "auto",
    failIfNotExists: false,
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        users: [],
        roles: [],
        repliedUser: false,
    },
});




client.commands = new Collection();
client.interactions = new Collection();
client.aliases = new Collection()
client.buttons = new Collection();
client.prefix = config.prefix;

module.exports = client;
let handlerstring = "";
fs.readdirSync('./handlers').forEach((handler) => {
    handlerstring += handler + " ";
    require('./handlers/' + handler)(client, config);
});

generic.separator('-', 60)
console.log(generic.magenta(generic.bold('> HANDLERS \n')))
console.log("ㅤㅤㅤ" + handlerstring + "ㅤ\n");



require('./settings/error')();
require('./settings/database')();

client.login(process.env.TOKEN);