const fs = require('fs');
const generic = require('generic-logs')

module.exports = (client) => {
    let commandstring = "";
    fs.readdirSync('./commands/').forEach(dir => {
        const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        if (!files || files.length <= 0) console.log("Commands - 0")
        files.forEach((file) => {
            let command = require(`../commands/${dir}/${file}`)
            if (command) {
                client.commands.set(command.name, command)
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => {
                        client.aliases.set(alias, command.name)
                    })
                }
                commandstring += command.name + " ";
                generic.separator('-', 60)
                console.log(generic.green(generic.bold('> COMANDOS \n')))
                console.log("ㅤㅤㅤ" + commandstring + "\n");

            } else {
                generic.custom({ title: command.name, message: "No ha cargado ", color: "red" })
            }
        });
    });

};
