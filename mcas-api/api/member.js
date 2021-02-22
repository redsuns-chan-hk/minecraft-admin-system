
const express = require('express')
const router = express.Router()

/* On Click Connect Discord Button */
router.get('auth', (req, res) => {
    console.log(req.body)
})

router.get('apply', (req, res) => {
    
})

module.exports = router
