
const mongoose = require('mongoose')
const config = require('../config.json')

class Database {

    static connect() {
        let url = `mongodb://`
        if (config.mongodb.username.length > 0 && config.mongodb.password.length > 0) {
            url += `${config.mongodb.username}:${config.mongodb.password}@`
        }
        url += `${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(value => {
            console.log(`Database (${config.mongodb.host}) connected`)
        }).catch(err => {
            console.log(`Failed to connect database ${config.mongodb.host}`)
        })
    }

    static disconnect() {
        return mongoose.disconnect()
    }

}

module.exports = Database;
