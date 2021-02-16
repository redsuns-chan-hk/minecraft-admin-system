
const mongoose = require('mongoose')
const config = require('../config.json')

class Database {

    static connect() {
        let url = `mongodb://`
        /* Some local environment may not required to login with user name and password. */
        if (config.mongodb.username.length > 0 && config.mongodb.password.length > 0) {
            url += `${config.mongodb.username}:${config.mongodb.password}@`
        }
        url += `${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`

        /* Connect to database with Mongoose */
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(value => {
            console.log(`Database (${config.mongodb.host}) connected`)
        }).catch(err => {
            console.error(`Failed to connect database ${config.mongodb.host}`)
            console.error(err)
        })
    }

    static disconnect() {
        return mongoose.disconnect()
    }
}

module.exports = Database;
