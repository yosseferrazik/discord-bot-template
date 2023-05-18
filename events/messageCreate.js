const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const client = require('./../index.js');
const config = require('./../settings/config.js');

const prefix = client.prefix;
const cooldown = new Collection();

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 0) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        if (command.cooldown) {
            if (cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: config.messages.cooldown.replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })) });




            if (command.userPerms || command.botPerms) {
                if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                    return message.channel.send({ content: config.messages.userperms.replace('<perms>', `\`${command.userPerms}\``) });
                }
                if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                    return message.channel.send({ content: config.messages.botperms.replace('<perms>', `\`${command.botPerms}\``) });

                }
            }

            command.run(client, message, args)
            cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                cooldown.delete(`${command.name}${message.author.id}`)
            }, command.cooldown);
        } else {
            if (command.userPerms || command.botPerms) {
                if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                    return message.channel.send({ content: config.messages.userperms.replace('<perms>', `\`${command.userPerms}\``) });

                }

                if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                    return message.channel.send({ content: config.messages.botperms.replace('<perms>', `\`${command.botPerms}\``) });
                }
            }
            command.run(client, message, args)
        }
    }

});