
const config = require('../config.json')
const rcon = require('./rcon')

class Player {
    
    static loginListeners = []
    
    static onLogin(discord, msg) {
    	if (msg.content.includes(' joined ')) {
            let contents = msg.content.split('\n')
            if (contents == undefined || contents == null) {
                return
            }
            for (let i = 0; i < contents.length; i++) {
                let line = contents[i]
                if (line == undefined || line == null || line.trim().length == 0) {
                    continue
                }

                if (line.includes('UUID')) {
                    let lineContents = line.split(']')
                    // [Wed, 17. Feb 2021 16:09:06 HKT INFO] UUID XXXXXXXX...
                    let logTime = lineContents[0] + ']'
                    let logTimeParts = logTime.split(' ')
                    
                    let loginDateStr = logTimeParts[1].trim().replace('.', '') + '-' + logTimeParts[2].trim() + '-' + logTimeParts[3].trim()
                    let loginTimeStr = logTimeParts[4].trim()
                    let loginTime = new Date(Date.parse(loginDateStr + ' ' + loginTimeStr));

                    let logBody = lineContents[1].trim()

                    let playerName = logBody.split(' ')[3]
                    console.log('Player [' + playerName + '] logged in. Time: [' + loginTime.toString() + ']')

                    if (this.loginListeners.length > 0) {
                        for (let loginListener of loginListeners) {
                            loginListener(playerName, loginTime)
                        }
                    }

                    this.updateApprovedPlayerParentGroup(discord, playerName, loginTime)
                }

                /*
                let content = msg.content.split(']')[1]
                console.log(content)
                let player = content.trim().split(' ')[0]

                if (player != undefined && player != null) {
                    console.log(player)
    
                    // mc-console channel
                    client.channels.fetch('777613214288314408').then(channel => {
                        channel.send(player)
                    })
                }
                */
            }

	    }
    }

    static updateApprovedPlayerParentGroup(discord, player, time) {
        /*
        rcon.connect().then(connectResult => {
            let command = 'w RedSunsss [RCON] lp user ' + player + ' parent info'
            console.log('[RCON]' + command)
            rcon.send(command).then(value => {
                console.log(value)
            }, reason => {
                console.error(reason)
            }).finally(() => {
                rcon.end().then(() => {})
            })
        })
        */
        // This not working...
        // discord.channels.cache.get(config.channels.console).send('lp user ' + player + ' parent info')
    }

}

module.exports = Player
