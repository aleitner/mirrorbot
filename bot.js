var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var sh = require("shorthash");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

const users = ['Alex', 'Jon', 'Delgado', 'Ada', 'Jose', 'Isaac', "Alfredo", 'Yancey', 'Dai', 'Jorge', 'Kargo', 'Rincon', 'Joe', 'Luis', 'Garçon', 'Mike']

var whoRegEx = /^(m|M)irror (m|M)irror on the wall,? who(.+) of (them |us |\w?)?all/;

bot.on('message', function (user, userID, channelID, message, evt) {
    var found = message.match(whoRegEx);
    if (found !== null && found.length >= 4) {
        var description = found[3]
        let id = String2Hex(sh.unique(description.toLowerCase())).replace(/\D/g, '');
        console.log(id)
        console.log(id % users.length);
        bot.sendMessage({
            to: channelID,
            message: `${users[id % users.length]}${description} of them all`
        });
    }
});

function String2Hex(tmp) {
    var str = '';
    for (var i = 0; i < tmp.length; i++) {
        str += tmp[i].charCodeAt(0).toString(16);
    }
    return str;
}