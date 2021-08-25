const client = require('../index');
const Schema = require('../models/gtn');
const {
    DiscordAPIError
} = require('discord.js')

client.on('messageCreate', async (message) => {
    await Schema.findOne({
        guild: message.guild.id,
    }, async (err, data) => {
        if (!data) return;
        if (err) throw err;

        const environ = {
            channelID: data.channel,
            roleID: "821972674380038164", //put @everyone role id or ur main role id, let me get mine
            number: data.number
        }
        if (Number.isInteger(parseInt(message.content)) && parseInt(message.content) == environ.number && message.member?.roles.cache.has(environ.roleID) && message.channel.id == environ.channelID) {
            message.pin().catch(error => {
                if (error instanceof DiscordAPIError) return message.reply('This is the correct number, but i am not able to pin it');

            })
            message.channel.permissionOverwrites.create(environ.roleID, {
                SEND_MESSAGES: false
            });
            message.react("✅").catch(_ => { });
            message.reply('This is the correct number! Congrats!')
            data.delete()
        } //lets try it
    })
})