/**
 * Minecraft Admin System
 */

const express = require('express')
const database = require('./src/database')
const fs = require('fs')

/* Remeber to create your own 'token.txt' when deploy on your server. */
const token = fs.readFileSync('./token.txt', 'UTF8')

/* The deployment configuration file of the system. */
const config = require("./config.json")

/* Include some bot actions for the user to interact with. */
const discord = require('./src/discord')

const server = express()

server.use('/member', require('./api/member'))

server.use('/test', (req, res) => {
	discord.users.fetch('338706296436162561', false).then(user => {
		user.send('SURPRISE MADAFAKA')
	}).catch(reason => {
		console.error(reason)
	})
})

server.listen(config.server.port, () => {
	console.log(`Minecraft Admin System Started At: http://localhost:${config.server.port}`)
	console.log('Start Login to Discord')
	discord.login(token)
	database.connect()
})
