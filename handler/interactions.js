const fs = require('fs');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
const generic = require('generic-logs')


const TOKEN = process.env.TOKEN;
const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client, config) => {
    const slashCommands = [];
    let slashstring = "";
    fs.readdirSync('./interactions/').forEach(async dir => {
        const files = fs.readdirSync(`./interactions/${dir}/`).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const slashCommand = require(`../interactions/${dir}/${file}`);
            slashCommands.push({
                name: slashCommand.name,
                description: slashCommand.description,
                type: slashCommand.type,
                options: slashCommand.options ? slashCommand.options : null,
                default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
                default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
            });

            if (slashCommand.name) {

                client.interactions.set(slashCommand.name, slashCommand)
                slashstring += slashCommand.name + " ";
                generic.separator('-', 60)
                console.log(generic.blue(generic.bold('> INTERACCIONES (/) \n')))
                console.log("ㅤㅤㅤ" + slashstring + "\n");

            } else {
                generic.custom({ title: file.split('.js')[0], message: "No ha cargado correctamente", color: "red" })
            }
        }

    });

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(config.id),
                { body: slashCommands },
            );
        } catch (error) {
            console.log(error);
        }
    })();
};
