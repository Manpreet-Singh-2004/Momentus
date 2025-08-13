const express = require('express')

const router = express.Router()

// Home Screen message
router.get('/', (req, res) => {
    res.json({msg: 'Welcome to the Images screen, here you will see all the images'})
})

module.exports = router