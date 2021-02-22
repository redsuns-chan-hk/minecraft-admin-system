
const rcon = require('rcon-client')
const config = require('../config.json')
const fs = require('fs')
const rcon_password = fs.readFileSync('./secure/rcon-password.txt', { encoding: 'utf-8' })

module.exports = new rcon.Rcon({
    host: config.minecraft.host,
    port: config.minecraft.port,
    password: rcon_password
});
