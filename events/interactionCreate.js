const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const client = require('..');
const config = require('../settings/config');

const cooldown = new Collection();

client.on('interactionCreate', async interaction => {
    const slashCommand = client.interaction.get(interaction.commandName);
    if (interaction.type == 4) {
        if (slashCommand.autocomplete) {
            const choices = [];
            await slashCommand.autocomplete(interaction, choices)
        }
    }
    if (!interaction.type == 2) return;

    if (!slashCommand) return client.slashCommands.delete(interaction.commandName);
    try {
        if (slashCommand.cooldown) {
            if (cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ content: config.messages.cooldown.replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), { long: true })) })
            if (slashCommand.userPerms || slashCommand.botPerms) {
                if (!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                    return interaction.reply({ content: config.messages.userperms.replace('<perms>', `\`${slashCommand.userPerms}\``) })
                }
                if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
                    return interaction.reply({ content: config.messages.botperms.replace('<perms>', `\`${slashCommand.botPerms}\``) })
                }

            }

            await slashCommand.run(client, interaction);
            cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
            setTimeout(() => {
                cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
            }, slashCommand.cooldown)
        } else {
            if (slashCommand.userPerms || slashCommand.botPerms) {
                if (!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                    return interaction.reply({ content: config.messages.userperms.replace('<perms>', `\`${slashCommand.userPerms}\``) })
                }
                if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
                    return interaction.reply({ content: config.messages.botperms.replace('<perms>', `\`${slashCommand.botPerms}\``) })
                }
            }
            await slashCommand.run(client, interaction);
        }
    } catch (error) {
        console.log(error);
    }
});