const express = require('express')

const router = express.Router()

// Home Screen message
router.get('/', (req, res) => {
    res.json({msg: 'Welcome to the About Us Page'})
})

module.exports = router