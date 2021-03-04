
const mongoose = require('mongoose')

const MemberApplicationSchema = new mongoose.Schema({
    discordId: String,
    discordName: String,
    minecraftName: String,
    enterReason: String,
    favouriteVtubers: String,
    source: String,
    referer: String
})

const MemberApplication = mongoose.model('MemberApplication', MemberApplicationSchema)

module.exports = MemberApplication
