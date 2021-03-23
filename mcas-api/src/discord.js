
const discord = require("discord.js")
const client = new discord.Client()

const player = require('./player')

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
	
	player.onLogin(client, msg)
})

module.exports = client
