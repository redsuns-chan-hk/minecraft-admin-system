
const mongoose = require('mongoose')

const MemberApplicationSchema = new mongoose.Schema({
    discordId: String,
    discordName: String,
    minecraftName: String,
    enterReason: String,
    favouriteVtubers: String,
    source: String,
    referer: String,

    status: String, // Value = PENDING, APPROVE, REJECT
    applyDate: Date,
    approveDate: Date,
    approvedBy: String
})

const MemberApplication = mongoose.model('MemberApplication', MemberApplicationSchema)

module.exports = MemberApplication
