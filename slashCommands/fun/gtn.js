const {
    MessageEmbed
} = require('discord.js');
const client = require('../../index');
const Schema = require('../../models/gtn');

module.exports = {
    name: 'gtn',
    description: 'Guess the number',
    options: [{
        name: 'channel',
        type: 'CHANNEL',
        description: 'The channel to play the game',
        required: true,
    }, {
        name: 'number',
        type: 'STRING',
        description: 'The number to be guessed',
        required: true,
    }],
    run: async (client, interaction, options) => {

        if (isNaN(options[1].value)) return interaction.followUp('Give me a number');
        if (0 >= options[1].value) return interaction.followUp('Number must be more than 0')

        Schema.findOne({
            guild: interaction.guild.id
        }, async (err, data) => {
            if (data) data.delete();
            new Schema({
                guild: interaction.guild.id,
                channel: options[0].value,
                number: options[1].value
            }).save()
        })

        const channel = client.channels.cache.get(options[0].value)
        channel.permissionOverwrites.create('821972674380038164', {
            SEND_MESSAGES: true
        });
        channel.send('Event Started!')
        interaction.followUp('ok');
    }
} // lets test it