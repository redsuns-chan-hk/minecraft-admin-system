
const express = require('express')
const router = express.Router()

const MemberApplication = require('../model/member-application.model')

router.post('/register', (req, res) => {
    console.log(req.body)
    return res.status(200).json({
        ok: true,
        message: 'success',
        details: req.body
    })
})

module.exports = router
