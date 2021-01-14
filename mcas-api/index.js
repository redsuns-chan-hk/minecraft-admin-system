/**
 * Minecraft Admin System
 */

const express = require('express')
const server = express()
const port = 3000

const discord = require("discord.js");
const client = new discord.Client();
const { prefix, token } = require("./discord-config.json");

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('Pong!');
	}
});

client.login(token);

server.get('/', (req, res) => {
	res.send('Hello World!')
})

server.listen(port, () => {
	console.log(`Minecraft Admin System Started At: http://localhost:${port}`)
})
