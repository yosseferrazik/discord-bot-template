const fs = require('fs');
const generic = require('generic-logs')


module.exports = async (client) => {

    let eventstring = "";

    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
        require(`../events/${event}`);

        eventstring += event + " ";
    })

    generic.separator('-', 60)
    console.log(generic.yellow(generic.bold('> EVENTOS \n')))
    console.log("ㅤㅤㅤ" + eventstring + "\n");

};