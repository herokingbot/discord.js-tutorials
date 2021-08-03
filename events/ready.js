const client = require('../index')
const arrayOfStatus = [
    'Sub to FiredragonPlayz',
    'Join Fire Developement',
    'I like pizza',
    'Anime',
    'Movies'
]

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`)
    setInterval(() => {
        client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)] }], status: 'idle', type: "WATCHING" })
    }, 5000)
}) // code is in my github..