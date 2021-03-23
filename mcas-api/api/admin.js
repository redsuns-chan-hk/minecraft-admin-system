
const express = require('express')
const router = express.Router()

const security = require('../src/security')

router.post('/register', (req, res) => {

})

router.post('/login', security.isAdmin, (req, res) => {
    
})

module.exports = router
