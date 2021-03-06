/**
 * Minecraft Admin System
 */

const express = require('express')
const bodyParser = require('body-parser')
const database = require('./src/database')
const cors = require('cors')
const fs = require('fs')


/* Remeber to create your own 'token.txt' when deploy on your server. */
const token = fs.readFileSync('./secure/token.txt', 'UTF8')

/* The deployment configuration file of the system. */
const config = require("./config.json")

/* Include some bot actions for the user to interact with. */
const discord = require('./src/discord')

const server = express()

server.use(cors())
server.use(bodyParser.json())

server.use('/admin', require('./api/admin'))
server.use('/discord', require('./api/discord'))
server.use('/member', require('./api/member'))

server.listen(config.server.port, () => {
	console.log(`Minecraft Admin System Started At: http://localhost:${config.server.port}`)
	console.log('Start Login to Discord')
	discord.login(token)
	database.connect()
})
