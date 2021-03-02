
const mongoose = require('mongoose')

const MemberApplicationSchema = new mongoose.Schema({
    discordId: String,
    minecraftId: String,
    reason: String,
    favouriteVtuber: String,
    source: String,
    referer: String
})

const MemberApplication = mongoose.model('MemberApplication', MemberApplicationSchema)

module.exports = MemberApplication
